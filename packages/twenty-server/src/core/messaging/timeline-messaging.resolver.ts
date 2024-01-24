import { Args, Query, Field, Resolver, ObjectType } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Column, Entity } from 'typeorm';

import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { Workspace } from 'src/core/workspace/workspace.entity';
import { AuthWorkspace } from 'src/decorators/auth-workspace.decorator';
import { TimelineMessagingService } from 'src/core/messaging/timeline-messaging.service';

@Entity({ name: 'timelineThreadParticipant', schema: 'core' })
@ObjectType('TimelineThreadParticipant')
class TimelineThreadParticipant {
  @Field()
  id: string;

  @Field()
  handle: string;
}

@Entity({ name: 'timelineThread', schema: 'core' })
@ObjectType('TimelineThread')
export class TimelineThread {
  @Field()
  @Column()
  read: boolean;

  @Field()
  firstParticipant: TimelineThreadParticipant;

  @Field(() => [TimelineThreadParticipant])
  lastTwoParticipants: TimelineThreadParticipant[];

  @Field()
  lastMessageReceivedAt: Date;

  @Field()
  lastMessageBody: string;

  @Field()
  lastMessageSubject: string;

  @Field()
  numberOfMessagesInThread: number;

  @Field()
  participantCount: number;
}

@UseGuards(JwtAuthGuard)
@Resolver(() => [TimelineThread])
export class TimelineMessagingResolver {
  constructor(
    private readonly timelineMessagingService: TimelineMessagingService,
  ) {}

  @Query(() => [TimelineThread])
  async getTimelineThreadsFromPersonId(
    @AuthWorkspace() { id: workspaceId }: Workspace,
    @Args('personId') personId: string,
  ) {
    const timelineThreads =
      await this.timelineMessagingService.getMessagesFromPersonIds(
        workspaceId,
        [personId],
      );

    return timelineThreads;
  }

  @Query(() => [TimelineThread])
  async getTimelineThreadsFromCompanyId(
    @AuthWorkspace() { id: workspaceId }: Workspace,
    @Args('companyId') companyId: string,
  ) {
    const timelineThreads =
      await this.timelineMessagingService.getMessagesFromCompanyId(
        workspaceId,
        companyId,
      );

    return timelineThreads;
  }
}
