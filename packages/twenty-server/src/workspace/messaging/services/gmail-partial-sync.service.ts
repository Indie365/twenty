import { Injectable } from '@nestjs/common';

import { gmail_v1 } from 'googleapis';

import { FetchBatchMessagesService } from 'src/workspace/messaging/services/fetch-batch-messages.service';
import { GmailClientProvider } from 'src/workspace/messaging/providers/gmail/gmail-client.provider';
import { Utils } from 'src/workspace/messaging/services/utils.service';
import { MessagingProducer } from 'src/workspace/messaging/producers/messaging-producer';

@Injectable()
export class GmailPartialSyncService {
  constructor(
    private readonly gmailClientProvider: GmailClientProvider,
    private readonly fetchBatchMessagesService: FetchBatchMessagesService,
    private readonly utils: Utils,
    private readonly messagingProducer: MessagingProducer,
  ) {}

  private async getLastSyncHistoryId(
    workspaceId: string,
    connectedAccountId: string,
  ): Promise<string> {
    const { connectedAccount } =
      await this.utils.getDataSourceMetadataWorkspaceMetadataAndConnectedAccount(
        workspaceId,
        connectedAccountId,
      );

    if (!connectedAccount) {
      throw new Error('No connected account found');
    }

    const lastSyncHistoryId = connectedAccount.lastSyncHistoryId;

    if (!lastSyncHistoryId) {
      // Fall back to full sync
      await this.messagingProducer.enqueueFetchAllMessagesFromConnectedAccount(
        { workspaceId, connectedAccountId: connectedAccountId },
        `${workspaceId}-${connectedAccount.id}`,
      );
    }

    return lastSyncHistoryId;
  }

  private async getHistory(
    workspaceId: string,
    connectedAccountId: string,
    lastSyncHistoryId: string,
    maxResults: number,
  ) {
    const { connectedAccount } =
      await this.utils.getDataSourceMetadataWorkspaceMetadataAndConnectedAccount(
        workspaceId,
        connectedAccountId,
      );

    if (!connectedAccount) {
      throw new Error('No connected account found');
    }

    const gmailClient = await this.gmailClientProvider.getGmailClient(
      connectedAccount.refreshToken,
    );

    const history = await gmailClient.users.history.list({
      userId: 'me',
      startHistoryId: lastSyncHistoryId,
      historyTypes: ['messageAdded', 'messageDeleted'],
      maxResults,
    });

    return history.data;
  }

  public async fetchConnectedAccountThreads(
    workspaceId: string,
    connectedAccountId: string,
    maxResults = 500,
  ): Promise<void> {
    const { workspaceDataSource, dataSourceMetadata, connectedAccount } =
      await this.utils.getDataSourceMetadataWorkspaceMetadataAndConnectedAccount(
        workspaceId,
        connectedAccountId,
      );

    const accessToken = connectedAccount.accessToken;
    const refreshToken = connectedAccount.refreshToken;

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const history = await this.getHistory(
      workspaceId,
      connectedAccountId,
      connectedAccount.lastSyncHistoryId,
      maxResults,
    );

    // TODO: delete messages from messagesDeleted
    const { messagesAdded } =
      await this.getMessageIdsAndThreadIdsFromHistory(history);

    const { savedMessageIds, savedThreadIds } =
      await this.utils.getSavedMessageIdsAndThreadIds(
        messagesAdded,
        dataSourceMetadata,
        workspaceDataSource,
        connectedAccount.id,
      );

    const messageIdsToSave = messagesAdded.filter(
      (messageId) => !savedMessageIds.includes(messageId),
    );

    const messageQueries =
      this.utils.createQueriesFromMessageIds(messageIdsToSave);

    const { messages: messagesToSave } =
      await this.fetchBatchMessagesService.fetchAllMessages(
        messageQueries,
        accessToken,
      );

    const threads = this.utils.getThreadsFromMessages(messagesToSave);

    const threadsToSave = threads.filter(
      (thread) => !savedThreadIds.includes(thread.id),
    );

    await this.utils.saveMessageThreads(
      threadsToSave,
      dataSourceMetadata,
      workspaceDataSource,
      connectedAccount.id,
    );

    await this.utils.saveMessages(
      messagesToSave,
      dataSourceMetadata,
      workspaceDataSource,
      connectedAccount,
    );
  }

  private async getMessageIdsAndThreadIdsFromHistory(
    history: gmail_v1.Schema$ListHistoryResponse,
  ): Promise<{
    messagesAdded: string[];
    messagesDeleted: string[];
  }> {
    if (!history.history) throw new Error('No history found');

    const { messagesAdded, messagesDeleted } = history.history.reduce(
      (
        acc: {
          messagesAdded: string[];
          messagesDeleted: string[];
        },
        history,
      ) => {
        const messagesAdded = history.messagesAdded?.map(
          (messageAdded) => messageAdded.message?.id || '',
        );

        const messagesDeleted = history.messagesDeleted?.map(
          (messageDeleted) => messageDeleted.message?.id || '',
        );

        if (messagesAdded) acc.messagesAdded.push(...messagesAdded);
        if (messagesDeleted) acc.messagesDeleted.push(...messagesDeleted);

        return acc;
      },
      { messagesAdded: [], messagesDeleted: [] },
    );

    return {
      messagesAdded,
      messagesDeleted,
    };
  }
}
