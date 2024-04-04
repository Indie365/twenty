import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('TimelineCalendarEventAttendee')
export class TimelineCalendarEventAttendee {
  @Field(() => ID, { nullable: true })
  personId: string;

  @Field(() => ID, { nullable: true })
  workspaceMemberId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  displayName: string;

  @Field()
  avatarUrl: string;

  @Field()
  handle: string;
}
