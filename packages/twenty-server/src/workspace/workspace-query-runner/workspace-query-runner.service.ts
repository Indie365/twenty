import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import axios from 'axios';
import { uuid4 } from '@sentry/utils';

import { IConnection } from 'src/utils/pagination/interfaces/connection.interface';
import {
  Record as IRecord,
  RecordFilter,
  RecordOrderBy,
} from 'src/workspace/workspace-query-builder/interfaces/record.interface';
import {
  CreateManyResolverArgs,
  CreateOneResolverArgs,
  DeleteManyResolverArgs,
  DeleteOneResolverArgs,
  FindManyResolverArgs,
  FindOneResolverArgs,
  UpdateManyResolverArgs,
  UpdateOneResolverArgs,
} from 'src/workspace/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';

import { WorkspaceQueryBuilderFactory } from 'src/workspace/workspace-query-builder/workspace-query-builder.factory';
import { parseResult } from 'src/workspace/workspace-query-runner/utils/parse-result.util';
import { WorkspaceDataSourceService } from 'src/workspace/workspace-datasource/workspace-datasource.service';
import { stringifyWithoutKeyQuote } from 'src/workspace/workspace-query-builder/utils/stringify-without-key-quote.util';
import { FieldsStringFactory } from 'src/workspace/workspace-query-builder/factories/fields-string.factory';
import { isWorkEmail } from 'src/utils/is-work-email';

import { WorkspaceQueryRunnerOptions } from './interfaces/query-runner-optionts.interface';
import {
  PGGraphQLMutation,
  PGGraphQLResult,
} from './interfaces/pg-graphql.interface';

@Injectable()
export class WorkspaceQueryRunnerService {
  private readonly logger = new Logger(WorkspaceQueryRunnerService.name);

  constructor(
    private readonly workspaceQueryBuilderFactory: WorkspaceQueryBuilderFactory,
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
    private readonly fieldsStringFactory: FieldsStringFactory,
  ) {}

  async findMany<
    Record extends IRecord = IRecord,
    Filter extends RecordFilter = RecordFilter,
    OrderBy extends RecordOrderBy = RecordOrderBy,
  >(
    args: FindManyResolverArgs<Filter, OrderBy>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<IConnection<Record> | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.findMany(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);

    return this.parseResult<IConnection<Record>>(result, targetTableName, '');
  }

  async findOne<
    Record extends IRecord = IRecord,
    Filter extends RecordFilter = RecordFilter,
  >(
    args: FindOneResolverArgs<Filter>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    if (!args.filter || Object.keys(args.filter).length === 0) {
      throw new BadRequestException('Missing filter argument');
    }
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.findOne(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);
    const parsedResult = this.parseResult<IConnection<Record>>(
      result,
      targetTableName,
      '',
    );

    return parsedResult?.edges?.[0]?.node;
  }

  async createMany<Record extends IRecord = IRecord>(
    args: CreateManyResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record[] | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.createMany(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'insertInto',
    )?.records;
  }

  async createOne<Record extends IRecord = IRecord>(
    args: CreateOneResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const records = await this.createMany({ data: [args.data] }, options);

    return records?.[0];
  }

  async updateOne<Record extends IRecord = IRecord>(
    args: UpdateOneResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.updateOne(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'update',
    )?.records?.[0];
  }

  async deleteOne<Record extends IRecord = IRecord>(
    args: DeleteOneResolverArgs,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.deleteOne(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'deleteFrom',
    )?.records?.[0];
  }

  async updateMany<Record extends IRecord = IRecord>(
    args: UpdateManyResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record[] | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.updateMany(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'update',
    )?.records;
  }

  async deleteMany<
    Record extends IRecord = IRecord,
    Filter extends RecordFilter = RecordFilter,
  >(
    args: DeleteManyResolverArgs<Filter>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record[] | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = await this.workspaceQueryBuilderFactory.deleteMany(
      args,
      options,
    );
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'deleteFrom',
    )?.records;
  }

  // TODO: most of the logic should be move to a separate service
  async enrichOne<Record extends IRecord = IRecord>(
    args: DeleteOneResolverArgs,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const argsFind = {
      filter: { id: { eq: args.id } },
    } as FindOneResolverArgs;

    const { workspaceId, targetTableName } = options;

    const findQuery = await this.workspaceQueryBuilderFactory.findOne(
      argsFind,
      options,
    );

    const findResult = await this.execute(findQuery, workspaceId);

    const parsedfindResult = this.parseResult<IConnection<Record>>(
      findResult,
      targetTableName,
      '',
    );

    const objectToEnrich = parsedfindResult?.edges?.[0]?.node;

    switch (targetTableName) {
      case 'company': {
        return await this.enrichCompany(objectToEnrich, options);
      }
      case 'person': {
        return this.enrichPerson(objectToEnrich, options);
      }
      default: {
        return objectToEnrich;
      }
    }
  }

  async enrichPerson<Record extends IRecord = IRecord>(
    person: Record,
    options: WorkspaceQueryRunnerOptions,
  ) {
    const { workspaceId, targetTableName } = options;

    if (!person.companyId && person.email && isWorkEmail(person.email)) {
      const companyDomainName = person.email.split('@')[1];
      const companyNameSmallCase = companyDomainName.split('.')[0];
      const newCompanyId = uuid4();

      const queryCreateCompany = `
      mutation {
        insertIntocompanyCollection(objects: ${stringifyWithoutKeyQuote([
          {
            id: newCompanyId,
            name:
              companyNameSmallCase.charAt(0).toUpperCase() +
              companyNameSmallCase.slice(1),
            domainName: companyDomainName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ])}) {
          affectedCount
          records {
            id
          }
        }
      }
    `;

      await this.execute(queryCreateCompany, workspaceId);

      const fieldsString = await this.fieldsStringFactory.create(
        options.info,
        options.fieldMetadataCollection,
      );

      const query = `mutation {
        updatepersonCollection(set: ${stringifyWithoutKeyQuote({
          companyId: newCompanyId,
        })}, filter: { id: { eq: "${person.id}" } }) {
          affectedCount
          records {
            ${fieldsString}
          }
        }
      }
    `;

      const personAfterUpdate = await this.execute(query, workspaceId);

      return this.parseResult<PGGraphQLMutation<Record>>(
        personAfterUpdate,
        targetTableName,
        'update',
      )?.records?.[0];
    }

    return person;
  }

  async enrichCompany<Record extends IRecord = IRecord>(
    company: Record,
    options: WorkspaceQueryRunnerOptions,
  ) {
    const { workspaceId, targetTableName } = options;

    const enrichedCompany = await axios.get(
      `https://companies.twenty.com/${company.domainName}`,
    );

    const argsUpdate = {
      id: company.id,
      data: {
        id: company.id,
        createdAt: company.createdAt,
        updatedAt: new Date().toISOString(),
        linkedinLinkUrl: `https://linkedin.com/` + enrichedCompany.data.handle,
      },
    };

    const query = await this.workspaceQueryBuilderFactory.updateOne(
      argsUpdate,
      options,
    );

    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'update',
    )?.records?.[0];
  }

  private async execute(
    query: string,
    workspaceId: string,
  ): Promise<PGGraphQLResult | undefined> {
    const workspaceDataSource =
      await this.workspaceDataSourceService.connectToWorkspaceDataSource(
        workspaceId,
      );

    await workspaceDataSource?.query(`
      SET search_path TO ${this.workspaceDataSourceService.getSchemaName(
        workspaceId,
      )};
    `);

    const results = await workspaceDataSource?.query<PGGraphQLResult>(`
      SELECT graphql.resolve($$
        ${query}
      $$);
    `);

    return results;
  }

  private parseResult<Result>(
    graphqlResult: PGGraphQLResult | undefined,
    targetTableName: string,
    command: string,
  ): Result {
    const entityKey = `${command}${targetTableName}Collection`;
    const result = graphqlResult?.[0]?.resolve?.data?.[entityKey];
    const errors = graphqlResult?.[0]?.resolve?.errors;

    if (Array.isArray(errors) && errors.length > 0) {
      console.error('GraphQL errors', errors);
    }

    if (!result) {
      throw new BadRequestException('Malformed result from GraphQL query');
    }

    return parseResult(result);
  }
}
