import { Injectable } from '@nestjs/common';

import { GraphQLSchema, printSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';

import { DataSourceService } from 'src/metadata/data-source/data-source.service';
import { WorkspaceSchemaStorageService } from 'src/workspace/workspace-schema-storage/workspace-schema-storage.service';
import { ObjectMetadataService } from 'src/metadata/object-metadata/object-metadata.service';
import { ScalarsExplorerService } from 'src/workspace/services/scalars-explorer.service';

import { WorkspaceGraphQLSchemaFactory } from './workspace-schema-builder/workspace-graphql-schema.factory';
import { workspaceResolverBuilderMethodNames } from './workspace-resolver-builder/factories/factories';
import { WorkspaceResolverFactory } from './workspace-resolver-builder/workspace-resolver.factory';

@Injectable()
export class WorkspaceFactory {
  constructor(
    private readonly dataSourceService: DataSourceService,
    private readonly objectMetadataService: ObjectMetadataService,
    private readonly scalarsExplorerService: ScalarsExplorerService,
    private readonly workspaceGraphQLSchemaFactory: WorkspaceGraphQLSchemaFactory,
    private readonly workspaceResolverFactory: WorkspaceResolverFactory,
    private readonly workspaceSchemaStorageService: WorkspaceSchemaStorageService,
  ) {}

  async createGraphQLSchema(
    workspaceId: string | undefined,
  ): Promise<GraphQLSchema> {
    if (!workspaceId) {
      return new GraphQLSchema({});
    }

    const dataSourcesMetadata =
      await this.dataSourceService.getDataSourcesMetadataFromWorkspaceId(
        workspaceId,
      );

    // Can'f find any data sources for this workspace
    if (!dataSourcesMetadata || dataSourcesMetadata.length === 0) {
      return new GraphQLSchema({});
    }

    // Validate cache version
    await this.workspaceSchemaStorageService.validateCacheVersion(workspaceId);

    // Get object metadata from cache
    let objectMetadataCollection =
      await this.workspaceSchemaStorageService.getObjectMetadata(workspaceId);

    // If object metadata is not cached, get it from the database
    if (!objectMetadataCollection) {
      objectMetadataCollection =
        await this.objectMetadataService.findManyWithinWorkspace(workspaceId);

      await this.workspaceSchemaStorageService.setObjectMetadata(
        workspaceId,
        objectMetadataCollection,
      );
    }

    // Get typeDefs from cache
    let typeDefs = await this.workspaceSchemaStorageService.getTypeDefs(
      workspaceId,
    );
    let usedScalarNames =
      await this.workspaceSchemaStorageService.getUsedScalarNames(workspaceId);

    // If typeDefs are not cached, generate them
    if (!typeDefs || !usedScalarNames) {
      const autoGeneratedSchema =
        await this.workspaceGraphQLSchemaFactory.create(
          objectMetadataCollection,
          workspaceResolverBuilderMethodNames,
        );
      usedScalarNames =
        this.scalarsExplorerService.getUsedScalarNames(autoGeneratedSchema);
      typeDefs = printSchema(autoGeneratedSchema);

      await this.workspaceSchemaStorageService.setTypeDefs(
        workspaceId,
        typeDefs,
      );
      await this.workspaceSchemaStorageService.setUsedScalarNames(
        workspaceId,
        usedScalarNames,
      );
    }

    const autoGeneratedResolvers = await this.workspaceResolverFactory.create(
      workspaceId,
      objectMetadataCollection,
      workspaceResolverBuilderMethodNames,
    );
    const scalarsResolvers =
      this.scalarsExplorerService.getScalarResolvers(usedScalarNames);

    const executableSchema = makeExecutableSchema({
      typeDefs: gql`
        ${typeDefs}
      `,
      resolvers: {
        ...scalarsResolvers,
        ...autoGeneratedResolvers,
      },
    });

    return executableSchema;
  }
}
