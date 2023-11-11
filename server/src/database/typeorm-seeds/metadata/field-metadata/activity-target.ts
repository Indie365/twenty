import { DataSource } from 'typeorm';

import { SeedObjectMetadata } from 'src/database/typeorm-seeds/metadata/object-metadata';
import { SeedWorkspaceId } from 'src/database/seeds/metadata';

const fieldMetadataTableName = 'fieldMetadata';

export enum SeedActivityTargetFieldMetadata {
  ActivityMetadataId = '20202020-cb21-42c9-bba8-347f7cb02b84',
  PersonMetadataId = '20202020-e56c-43e6-8fce-5619d8c2293a',
  CompanyMetadataId = '20202020-9408-4cc0-9fe1-51467edb530b',
}

export const seedOpportunityFieldMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${fieldMetadataTableName}`, [
      'objectMetadataId',
      'isCustom',
      'workspaceId',
      'isActive',
      'type',
      'name',
      'label',
      'targetColumnMap',
      'description',
      'icon',
      'isNullable',
    ])
    .orIgnore()
    .values([
      // Relationships
      {
        id: SeedActivityTargetFieldMetadata.ActivityMetadataId,
        objectMetadataId: SeedObjectMetadata.ActivityTargetMetadataId,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'activity',
        label: 'Activity',
        targetColumnMap: {
          value: 'activityId',
        },
        description: 'ActivityTarget activity',
        icon: 'IconNotes',
        isNullable: false,
      },
      {
        id: SeedActivityTargetFieldMetadata.PersonMetadataId,
        objectMetadataId: SeedObjectMetadata.ActivityTargetMetadataId,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'person',
        label: 'Person',
        targetColumnMap: {
          value: 'personId',
        },
        description: 'ActivityTarget person',
        icon: 'IconUser',
        isNullable: true,
      },
      {
        id: SeedActivityTargetFieldMetadata.CompanyMetadataId,
        objectMetadataId: SeedObjectMetadata.ActivityTargetMetadataId,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'company',
        label: 'Company',
        targetColumnMap: {
          value: 'companyId',
        },
        description: 'ActivityTarget company',
        icon: 'IconBuildingSkyscraper',
        isNullable: true,
      },
    ])
    .execute();
};
