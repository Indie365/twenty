import PgBoss from 'pg-boss';

import {
  QueueCronJobOptions,
  QueueJobOptions,
} from 'src/engine/integrations/message-queue/drivers/interfaces/job-options.interface';

import { MessageQueue } from 'src/engine/integrations/message-queue/message-queue.constants';

import { MessageQueueDriver } from './interfaces/message-queue-driver.interface';

export type PgBossDriverOptions = PgBoss.ConstructorOptions;

export class PgBossDriver implements MessageQueueDriver {
  private pgBoss: PgBoss;

  constructor(options: PgBossDriverOptions) {
    this.pgBoss = new PgBoss(options);
  }

  async stop() {
    await this.pgBoss.stop();
  }

  async init(): Promise<void> {
    await this.pgBoss.start();
  }

  async work<T>(
    queueName: string,
    handler: ({ data, id }: { data: T; id: string }) => Promise<void>,
  ) {
    return this.pgBoss.work(`${queueName}.*`, handler);
  }

  async addCron<T>(
    queueName: MessageQueue,
    jobName: string,
    data: T,
    options?: QueueCronJobOptions,
  ): Promise<void> {
    await this.pgBoss.schedule(
      `${queueName}.${jobName}`,
      options?.repeat?.pattern ?? '*/10 * * * *',
      data as object,
      options
        ? {
            singletonKey: options?.id,
          }
        : {},
    );
  }

  async removeCron(queueName: MessageQueue, jobName: string): Promise<void> {
    await this.pgBoss.unschedule(`${queueName}.${jobName}`);
  }

  async add<T>(
    queueName: MessageQueue,
    jobName: string,
    data: T,
    options?: QueueJobOptions,
  ): Promise<void> {
    await this.pgBoss.send(
      `${queueName}.${jobName}`,
      data as object,
      options
        ? {
            ...options,
            singletonKey: options?.id,
          }
        : {},
    );
  }
}
