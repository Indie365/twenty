import { DataSource } from 'typeorm';

import { SeedDataSourceId, SeedWorkspaceId } from 'src/database/seeds/metadata';

const tableName = 'objectMetadata';

export enum SeedObjectMetadataIds {
  Company = '20202020-480c-434e-b4c7-e22408b97047',
  Person = '20202020-c64b-44bc-bd2c-502c99f49dca',
  Opportunity = '20202020-cae9-4ff4-9579-f7d9fe44c937',
  PipelineStep = '20202020-1029-4661-9e91-83bad932bdcd',
  WorkspaceMember = '20202020-b550-40bb-a96b-9ab54b664753',
  WorkspaceMemberSettings = '20202020-166d-445c-970f-da1ea43f1dc7',
  Webhook = '20202020-ddee-40de-9c9b-5f82a3503360',
  ApiKey = '20202020-d8d0-4c2d-a370-5499b2181d02',
  Activity = '20202020-8ee3-4f67-84ab-1b7a6eb5a448',
  ActivityTarget = '20202020-439a-4a41-83a3-3cda03d01d38',
  Comment = '20202020-4de3-4e65-ac60-b40b8e08d7d6',
  Attachment = '20202020-5f98-4317-915d-3779bb821be2',
  Favorite = '20202020-90e4-4701-a350-8ab75e23e3b8',
  View = '20202020-767f-473f-8fd0-6cdbefbf8dbe',
  ViewField = '20202020-485c-4c48-a22e-0d9a164f9647',
  ViewFilter = '20202020-4461-4e2d-bf9e-9b47e68846d3',
  ViewSort = '20202020-cf28-41dd-b98b-d6e1f5b3a251',
}

export const seedObjectMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${tableName}`, [
      'id',
      'nameSingular',
      'namePlural',
      'labelSingular',
      'labelPlural',
      'targetTableName',
      'description',
      'icon',
      'dataSourceId',
      'workspaceId',
      'isActive',
      'isSystem',
    ])
    .orIgnore()
    .values([
      {
        id: SeedObjectMetadataIds.Company,
        nameSingular: 'companyV2',
        namePlural: 'companiesV2',
        labelSingular: 'Company',
        labelPlural: 'Companies',
        targetTableName: 'company',
        description: 'A company',
        icon: 'IconBuildingSkyscraper',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: false,
      },
      {
        id: SeedObjectMetadataIds.Person,
        nameSingular: 'personV2',
        namePlural: 'peopleV2',
        labelSingular: 'Person',
        labelPlural: 'People',
        targetTableName: 'person',
        description: 'A person',
        icon: 'IconUser',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: false,
      },
      {
        id: SeedObjectMetadataIds.Opportunity,
        nameSingular: 'opportunityV2',
        namePlural: 'opportunitiesV2',
        labelSingular: 'Opportunity',
        labelPlural: 'Opportunities',
        targetTableName: 'opportunity',
        description: 'An opportunity',
        icon: 'IconTargetArrow',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.PipelineStep,
        nameSingular: 'pipelineStepV2',
        namePlural: 'pipelineStepsV2',
        labelSingular: 'Pipeline Step',
        labelPlural: 'Pipeline Steps',
        targetTableName: 'pipelineStep',
        description: 'A pipeline step',
        icon: 'IconLayoutKanban',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.WorkspaceMember,
        nameSingular: 'workspaceMemberV2',
        namePlural: 'workspaceMembersV2',
        labelSingular: 'Workspace Member',
        labelPlural: 'Workspace Members',
        targetTableName: 'workspaceMember',
        description: 'A workspace member',
        icon: 'IconUserCircle',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.WorkspaceMemberSettings,
        nameSingular: 'workspaceMemberSettingV2',
        namePlural: 'workspaceMemberSettingsV2',
        labelSingular: 'WorkspaceMemberSetting',
        labelPlural: 'Workspace Member Settings',
        targetTableName: 'workspaceMemberSetting',
        description: 'A workspace member setting',
        icon: 'IconSettings',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.Webhook,
        nameSingular: 'webhookV2',
        namePlural: 'webhooksV2',
        labelSingular: 'Webhook',
        labelPlural: 'Webhooks',
        targetTableName: 'webhook',
        description: 'A webhook',
        icon: 'IconRobot',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.ApiKey,
        nameSingular: 'apiKeyV2',
        namePlural: 'apiKeysV2',
        labelSingular: 'Api Key',
        labelPlural: 'Api Keys',
        targetTableName: 'apiKey',
        description: 'An api key',
        icon: 'IconRobot',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.Activity,
        nameSingular: 'activityV2',
        namePlural: 'activitiesV2',
        labelSingular: 'Activity',
        labelPlural: 'Activities',
        targetTableName: 'activity',
        description: 'An activity',
        icon: 'IconCheckbox',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.ActivityTarget,
        nameSingular: 'activityTargetV2',
        namePlural: 'activityTargetsV2',
        labelSingular: 'Activity Target',
        labelPlural: 'Activity Targets',
        targetTableName: 'activityTarget',
        description: 'An activity target',
        icon: 'IconCheckbox',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.Comment,
        nameSingular: 'commentV2',
        namePlural: 'commentsV2',
        labelSingular: 'Comment',
        labelPlural: 'Comments',
        targetTableName: 'comment',
        description: 'A comment',
        icon: 'IconMessageCircle',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.Attachment,
        nameSingular: 'attachmentV2',
        namePlural: 'attachmentsV2',
        labelSingular: 'Attachment',
        labelPlural: 'Attachments',
        targetTableName: 'attachment',
        description: 'An attachment',
        icon: 'IconFileImport',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.Favorite,
        nameSingular: 'favoriteV2',
        namePlural: 'favoritesV2',
        labelSingular: 'Favorite',
        labelPlural: 'Favorites',
        targetTableName: 'favorite',
        description: 'A favorite',
        icon: 'IconHeart',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.View,
        nameSingular: 'viewV2',
        namePlural: 'viewsV2',
        labelSingular: 'View',
        labelPlural: 'Views',
        targetTableName: 'view',
        description: '(System) Views',
        icon: 'IconLayoutCollage',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.ViewField,
        nameSingular: 'viewFieldV2',
        namePlural: 'viewFieldsV2',
        labelSingular: 'View Field',
        labelPlural: 'View Fields',
        targetTableName: 'viewField',
        description: '(System) View Fields',
        icon: 'IconTag',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.ViewFilter,
        nameSingular: 'viewFilterV2',
        namePlural: 'viewFiltersV2',
        labelSingular: 'View Filter',
        labelPlural: 'View Filters',
        targetTableName: 'viewFilter',
        description: '(System) View Filters',
        icon: 'IconFilterBolt',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
      {
        id: SeedObjectMetadataIds.ViewSort,
        nameSingular: 'viewSortV2',
        namePlural: 'viewSortsV2',
        labelSingular: 'View Sort',
        labelPlural: 'View Sorts',
        targetTableName: 'viewSort',
        description: '(System) View Sorts',
        icon: 'IconArrowsSort',
        dataSourceId: SeedDataSourceId,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        isSystem: true,
      },
    ])
    .execute();
};
