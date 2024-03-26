import { Injectable, Logger } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { gmail_v1 } from 'googleapis';

import { InjectObjectMetadataRepository } from 'src/engine/object-metadata-repository/object-metadata-repository.decorator';
import { ConnectedAccountRepository } from 'src/modules/connected-account/repositories/connected-account.repository';
import { ConnectedAccountObjectMetadata } from 'src/modules/connected-account/standard-objects/connected-account.object-metadata';
import { MessageChannelRepository } from 'src/modules/messaging/repositories/message-channel.repository';
import { FetchMessagesByBatchesService } from 'src/modules/messaging/services/fetch-messages-by-batches/fetch-messages-by-batches.service';
import {
  MessageChannelObjectMetadata,
  MessageChannelSyncStatus,
} from 'src/modules/messaging/standard-objects/message-channel.object-metadata';
import { createQueriesFromMessageIds } from 'src/modules/messaging/utils/create-queries-from-message-ids.util';
import { InjectCacheStorage } from 'src/engine/integrations/cache-storage/decorators/cache-storage.decorator';
import { CacheStorageNamespace } from 'src/engine/integrations/cache-storage/types/cache-storage-namespace.enum';
import { CacheStorageService } from 'src/engine/integrations/cache-storage/cache-storage.service';
import { GMAIL_USERS_MESSAGES_GET_BATCH_SIZE } from 'src/modules/messaging/constants/gmail-users-messages-get-batch-size.constant';
import { MESSAGES_TO_DELETE_FROM_CACHE_BATCH_SIZE } from 'src/modules/messaging/constants/messages-to-delete-from-cache-batch-size.constant';
import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { SaveMessageAndEmitContactCreationEventService } from 'src/modules/messaging/services/save-message-and-emit-contact-creation-event/save-message-and-emit-contact-creation-event.service';
import { GmailClientProvider } from 'src/modules/messaging/services/providers/gmail/gmail-client.provider';

@Injectable()
export class GmailFetchMessageContentFromCacheService {
  private readonly logger = new Logger(
    GmailFetchMessageContentFromCacheService.name,
  );

  constructor(
    private readonly fetchMessagesByBatchesService: FetchMessagesByBatchesService,
    @InjectObjectMetadataRepository(ConnectedAccountObjectMetadata)
    private readonly connectedAccountRepository: ConnectedAccountRepository,
    @InjectObjectMetadataRepository(MessageChannelObjectMetadata)
    private readonly messageChannelRepository: MessageChannelRepository,
    private readonly saveMessageAndEmitContactCreationEventService: SaveMessageAndEmitContactCreationEventService,
    @InjectCacheStorage(CacheStorageNamespace.Messaging)
    private readonly cacheStorage: CacheStorageService,
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
    private readonly gmailClientProvider: GmailClientProvider,
  ) {}

  async fetchMessageContentFromCache(
    workspaceId: string,
    connectedAccountId: string,
  ) {
    const connectedAccount = await this.connectedAccountRepository.getById(
      connectedAccountId,
      workspaceId,
    );

    if (!connectedAccount) {
      this.logger.error(
        `Connected account ${connectedAccountId} not found in workspace ${workspaceId}`,
      );

      return;
    }

    const accessToken = connectedAccount.accessToken;
    const refreshToken = connectedAccount.refreshToken;

    if (!refreshToken) {
      throw new Error(
        `No refresh token found for connected account ${connectedAccountId} in workspace ${workspaceId}`,
      );
    }

    const gmailMessageChannel =
      await this.messageChannelRepository.getFirstByConnectedAccountId(
        connectedAccountId,
        workspaceId,
      );

    if (!gmailMessageChannel) {
      this.logger.error(
        `No message channel found for connected account ${connectedAccountId} in workspace ${workspaceId}`,
      );

      return;
    }

    if (gmailMessageChannel.syncStatus !== MessageChannelSyncStatus.PENDING) {
      this.logger.log(
        `Messaging import for workspace ${workspaceId} and account ${connectedAccountId} is not pending.`,
      );

      return;
    }

    const gmailMessageChannelId = gmailMessageChannel.id;

    const messageIdsToFetch =
      (await this.cacheStorage.setPop(
        `messages-to-import:${workspaceId}:gmail:${gmailMessageChannelId}`,
        GMAIL_USERS_MESSAGES_GET_BATCH_SIZE,
      )) ?? [];

    const messageIdsToDelete =
      (await this.cacheStorage.setPop(
        `messages-to-delete:${workspaceId}:gmail:${gmailMessageChannelId}`,
        MESSAGES_TO_DELETE_FROM_CACHE_BATCH_SIZE,
      )) ?? [];

    if (!messageIdsToFetch?.length && !messageIdsToDelete?.length) {
      await this.messageChannelRepository.updateSyncStatus(
        gmailMessageChannelId,
        MessageChannelSyncStatus.SUCCEEDED,
        workspaceId,
      );

      this.logger.log(
        `Messaging import for workspace ${workspaceId} and account ${connectedAccountId} done with nothing to import or delete.`,
      );

      return;
    }

    await this.messageChannelRepository.updateSyncStatus(
      gmailMessageChannelId,
      MessageChannelSyncStatus.ONGOING,
      workspaceId,
    );

    this.logger.log(
      `Messaging import for workspace ${workspaceId} and account ${connectedAccountId} starting...`,
    );

    const workspaceDataSource =
      await this.workspaceDataSourceService.connectToWorkspaceDataSource(
        workspaceId,
      );

    await workspaceDataSource
      ?.transaction(async (transactionManager: EntityManager) => {
        const messageQueries = createQueriesFromMessageIds(messageIdsToFetch);

        const { messages: messagesToSave, errors } =
          await this.fetchMessagesByBatchesService.fetchAllMessages(
            messageQueries,
            accessToken,
            workspaceId,
            connectedAccountId,
          );

        if (!messagesToSave.length) {
          await this.messageChannelRepository.updateSyncStatus(
            gmailMessageChannelId,
            MessageChannelSyncStatus.PENDING,
            workspaceId,
          );

          return;
        }

        if (errors.length) {
          const errorsCanBeIgnored = errors.every(
            (error) => error.code === 404,
          );

          if (!errorsCanBeIgnored) {
            throw new Error(
              `Error fetching messages for ${connectedAccountId} in workspace ${workspaceId}: ${JSON.stringify(
                errors,
                null,
                2,
              )}`,
            );
          }
        }

        await this.saveMessageAndEmitContactCreationEventService.saveMessagesAndEmitContactCreationEventWithinTransaction(
          messagesToSave,
          connectedAccount,
          workspaceId,
          gmailMessageChannel,
          transactionManager,
        );

        if (messageIdsToFetch.length < GMAIL_USERS_MESSAGES_GET_BATCH_SIZE) {
          await this.updateLastSyncExternalId(
            gmailMessageChannelId,
            refreshToken,
            workspaceId,
            transactionManager,
          );

          await this.messageChannelRepository.updateSyncStatus(
            gmailMessageChannelId,
            MessageChannelSyncStatus.SUCCEEDED,
            workspaceId,
            transactionManager,
          );

          this.logger.log(
            `Messaging import for workspace ${workspaceId} and account ${connectedAccountId} done with no more messages to import.`,
          );
        } else {
          await this.messageChannelRepository.updateSyncStatus(
            gmailMessageChannelId,
            MessageChannelSyncStatus.PENDING,
            workspaceId,
            transactionManager,
          );

          this.logger.log(
            `Messaging import for workspace ${workspaceId} and account ${connectedAccountId} done with more messages to import.`,
          );
        }
      })
      .catch(async (error) => {
        await this.cacheStorage.setAdd(
          `messages-to-import:${workspaceId}:gmail:${gmailMessageChannelId}`,
          messageIdsToFetch,
        );

        await this.cacheStorage.setAdd(
          `messages-to-delete:${workspaceId}:gmail:${gmailMessageChannelId}`,
          messageIdsToDelete,
        );

        await this.messageChannelRepository.updateSyncStatus(
          gmailMessageChannelId,
          MessageChannelSyncStatus.FAILED,
          workspaceId,
        );

        this.logger.error(
          `Error fetching messages for ${connectedAccountId} in workspace ${workspaceId}: ${error.message}`,
        );
      });
  }

  private async updateLastSyncExternalId(
    messageChannelId: string,
    refreshToken: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ) {
    const gmailClient: gmail_v1.Gmail =
      await this.gmailClientProvider.getGmailClient(refreshToken);

    const response = await gmailClient.users.messages.list({
      userId: 'me',
      maxResults: 1,
    });

    if (response.data?.messages) {
      const lastMessage = response.data.messages[0];

      if (!lastMessage || !lastMessage.id) {
        throw new Error(
          `No last message found for workspace ${workspaceId} and account ${messageChannelId}`,
        );
      }

      const lastMessageContent = await gmailClient.users.messages.get({
        userId: 'me',
        id: lastMessage.id,
      });

      if (!lastMessageContent?.data) {
        throw new Error(
          `No last message content found for message ${lastMessage.id} in workspace ${workspaceId}`,
        );
      }

      const historyId = lastMessageContent?.data?.historyId;

      if (!historyId) {
        throw new Error(
          `No historyId found for message ${lastMessage.id} in workspace ${workspaceId}`,
        );
      }

      this.logger.log(
        `Messaging import for workspace ${workspaceId} and account ${messageChannelId} succeeded, updating last external id: ${historyId}.`,
      );

      await this.messageChannelRepository.updateLastSyncExternalIdIfHigher(
        messageChannelId,
        historyId,
        workspaceId,
        transactionManager,
      );
    }
  }
}
