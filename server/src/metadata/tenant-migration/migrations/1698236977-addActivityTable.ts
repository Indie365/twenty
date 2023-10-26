import { TenantMigrationTableAction } from 'src/metadata/tenant-migration/tenant-migration.entity';

export const addActivityTable: TenantMigrationTableAction[] = [
  {
    name: 'activity',
    action: 'create',
  },
  {
    name: 'activity',
    action: 'alter',
    columns: [
      {
        name: 'body',
        type: 'text',
        action: 'create',
      },
      {
        name: 'title',
        type: 'text',
        action: 'create',
      },
      {
        name: 'type',
        type: 'text',
        action: 'create',
      },
      {
        name: 'reminderAt',
        action: 'create',
        type: 'timestamp',
      },
      {
        name: 'dueAt',
        action: 'create',
        type: 'timestamp',
      },
      {
        name: 'completedAt',
        action: 'create',
        type: 'timestamp',
      },
    ],
  },
];
