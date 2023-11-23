import { Module } from '@nestjs/common';

import { ConfirmationQuestion } from 'src/database/commands/questions/confirmation.question';
import { WorkspaceManagerModule } from 'src/workspace/workspace-manager/workspace-manager.module';
import { DataSourceModule } from 'src/metadata/data-source/data-source.module';
import { WorkspaceMigrationModule } from 'src/metadata/workspace-migration/workspace-migration.module';
import { WorkspaceMigrationRunnerModule } from 'src/workspace/workspace-migration-runner/workspace-migration-runner.module';
import { TypeORMModule } from 'src/database/typeorm/typeorm.module';
import { WorkspaceModule } from 'src/core/workspace/workspace.module';
import { DataSeedWorkspaceCommand } from 'src/database/commands/data-seed-workspace.command';

@Module({
  imports: [
    WorkspaceManagerModule,
    DataSourceModule,
    TypeORMModule,
    WorkspaceMigrationModule,
    WorkspaceMigrationRunnerModule,
    WorkspaceModule,
  ],
  providers: [DataSeedWorkspaceCommand, ConfirmationQuestion],
})
export class DatabaseCommandModule {}
