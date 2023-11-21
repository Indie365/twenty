import { SeedWorkspaceId } from 'src/database/typeorm-seeds/core/workspaces';
import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';

const activityMetadata = {
  nameSingular: 'activity',
  namePlural: 'activities',
  labelSingular: 'Activity',
  labelPlural: 'Activities',
  targetTableName: 'activity',
  description: 'An activity',
  icon: 'IconCheckbox',
  isActive: true,
  isSystem: true,
  fields: [
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'title',
      label: 'Title',
      targetColumnMap: {
        value: 'title',
      },
      description: 'Activity title',
      icon: 'IconNotes',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'body',
      label: 'Body',
      targetColumnMap: {
        value: 'body',
      },
      description: 'Activity body',
      icon: 'IconList',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'type',
      label: 'Type',
      targetColumnMap: {
        value: 'type',
      },
      description: 'Activity type',
      icon: 'IconCheckbox',
      isNullable: false,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.DATE_TIME,
      name: 'reminderAt',
      label: 'Reminder Date',
      targetColumnMap: {
        value: 'reminderAt',
      },
      description: 'Activity reminder date',
      icon: 'IconCalendarEvent',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.DATE_TIME,
      name: 'dueAt',
      label: 'Due Date',
      targetColumnMap: {
        value: 'dueAt',
      },
      description: 'Activity due date',
      icon: 'IconCalendarEvent',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.DATE_TIME,
      name: 'completedAt',
      label: 'Completion Date',
      targetColumnMap: {
        value: 'completedAt',
      },
      description: 'Activity completion date',
      icon: 'IconCheck',
      isNullable: true,
    },
    // Relations
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'activityTargets',
      label: 'Targets',
      targetColumnMap: {},
      description: 'Activity targets',
      icon: 'IconCheckbox',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'attachments',
      label: 'Attachments',
      targetColumnMap: {},
      description: 'Activity attachments',
      icon: 'IconFileImport',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'comments',
      label: 'Comments',
      targetColumnMap: {},
      description: 'Activity comments',
      icon: 'IconComment',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'author',
      label: 'Author',
      targetColumnMap: {},
      description:
        'Activity author. This is the person who created the activity',
      icon: 'IconUserCircle',
      isNullable: false,
    },
    {
      isCustom: false,
      workspaceId: SeedWorkspaceId,
      isActive: true,
      type: FieldMetadataType.UUID,
      name: 'authorId',
      label: 'Author id (foreign key)',
      targetColumnMap: {},
      description: 'Activity author id foreign key',
      icon: undefined,
      isNullable: false,
      isSystem: true,
      defaultValue: undefined,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'assignee',
      label: 'Assignee',
      targetColumnMap: {},
      description:
        'Acitivity assignee. This is the workspace member assigned to the activity ',
      icon: 'IconUserCircle',
      isNullable: true,
    },
    {
      isCustom: false,
      workspaceId: SeedWorkspaceId,
      isActive: true,
      type: FieldMetadataType.UUID,
      name: 'assigneeId',
      label: 'Assignee id (foreign key)',
      targetColumnMap: {},
      description: 'Acitivity assignee id foreign key',
      icon: undefined,
      isNullable: true,
      isSystem: true,
      defaultValue: undefined,
    },
  ],
};

export default activityMetadata;
