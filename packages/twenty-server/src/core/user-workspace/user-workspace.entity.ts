import { Field, ID, ObjectType } from '@nestjs/graphql';

import { IDField } from '@ptc-org/nestjs-query-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/core/user/user.entity';
import { Workspace } from 'src/core/workspace/workspace.entity';

@Entity({ name: 'userWorkspace', schema: 'core' })
@ObjectType('UserWorkspace')
@Unique('IndexOnUserIdAndWorkspaceIdUnique', ['userId', 'workspaceId'])
export class UserWorkspace {
  @IDField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Field(() => [User])
  // @ManyToMany(() => User, (user) => user.userWorkspaces)
  // users: User[];

  @Field(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field({ nullable: false })
  @Column()
  userId: string;

  // @Field(() => [Workspace])
  // @ManyToMany(() => Workspace, (workspace) => workspace.workspaceUsers)
  // workspaces: Workspace[];

  @Field(() => Workspace)
  @ManyToOne(() => Workspace, (workspace) => workspace.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @Field({ nullable: false })
  @Column()
  workspaceId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field()
  @Column('timestamp with time zone')
  deletedAt: Date;
}
