import { Injectable, Logger } from '@nestjs/common';

import isEmpty from 'lodash.isempty';

import { WorkspaceQueryBuilderOptions } from 'src/workspace/workspace-query-builder/interfaces/workspace-query-builder-options.interface';
import { RecordFilter } from 'src/workspace/workspace-query-builder/interfaces/record.interface';
import { FindDuplicatesResolverArgs } from 'src/workspace/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';
import { ObjectMetadataInterface } from 'src/metadata/field-metadata/interfaces/object-metadata.interface';
import { PGGraphQLResult } from 'src/workspace/workspace-query-runner/interfaces/pg-graphql.interface';

import { computeObjectTargetTable } from 'src/workspace/utils/compute-object-target-table.util';
import { stringifyWithoutKeyQuote } from 'src/workspace/workspace-query-builder/utils/stringify-without-key-quote.util';
import { ArgsAliasFactory } from 'src/workspace/workspace-query-builder/factories/args-alias.factory';

import { FieldsStringFactory } from './fields-string.factory';

@Injectable()
export class FindDuplicatesQueryFactory {
  private readonly logger = new Logger(FindDuplicatesQueryFactory.name);

  constructor(
    private readonly fieldsStringFactory: FieldsStringFactory,
    private readonly argsAliasFactory: ArgsAliasFactory,
  ) {}

  async create<Filter extends RecordFilter = RecordFilter>(
    args: FindDuplicatesResolverArgs<Filter>,
    options: WorkspaceQueryBuilderOptions,
    currentRecord?: PGGraphQLResult,
  ) {
    const fieldsString = await this.fieldsStringFactory.create(
      options.info,
      options.fieldMetadataCollection,
      options.objectMetadataCollection,
    );

    const argsData = this.getFindDuplicateBy<Filter>(
      args,
      options,
      currentRecord,
    );

    const duplicateCondition = this.buildDuplicateCondition(
      options.objectMetadataItem,
      argsData,
    );

    const filters = stringifyWithoutKeyQuote(duplicateCondition);

    return `
      query {
        ${computeObjectTargetTable(options.objectMetadataItem)}Collection${
          filters ? `(filter: ${filters})` : ''
        } {
          ${fieldsString}
        }
      }
    `;
  }

  getFindDuplicateBy<Filter extends RecordFilter = RecordFilter>(
    args: FindDuplicatesResolverArgs<Filter>,
    options: WorkspaceQueryBuilderOptions,
    currentRecord?: PGGraphQLResult,
  ) {
    const entityKey = `${computeObjectTargetTable(
      options.objectMetadataItem,
    )}Collection`;

    const currentRecordResult =
      currentRecord?.[0]?.resolve?.data?.[entityKey].edges?.[0]?.node;

    if (currentRecordResult) {
      return currentRecordResult;
    }

    return this.argsAliasFactory.create(
      args.data ?? {},
      options.fieldMetadataCollection,
    );
  }

  buildQueryForExistingRecord(
    id: string,
    options: WorkspaceQueryBuilderOptions,
  ) {
    return `
      query {
        ${computeObjectTargetTable(
          options.objectMetadataItem,
        )}Collection(filter: { id: { eq: "${id}" }}){
          edges {
            node {
              ${this.getApplicableDuplicateCriterias(options.objectMetadataItem)
                .flatMap((dc) => dc.fields)
                .join('\n')}
            }
          }
        }
      }
    `;
  }

  private buildDuplicateCondition(
    objectMetadataItem: ObjectMetadataInterface,
    currentRecord?: PGGraphQLResult,
  ) {
    if (!currentRecord) {
      return;
    }

    const criterias = this.getApplicableDuplicateCriterias(objectMetadataItem);

    return {
      or: criterias
        .map((dc) =>
          dc.fields.reduce((acc, curr) => {
            if (!currentRecord[curr]) {
              return acc;
            }

            return {
              ...acc,
              [curr]: { ilike: `%${currentRecord[curr]}%` },
            };
          }, {}),
        )
        .filter((dc) => !isEmpty(dc)),
    };
  }

  private getApplicableDuplicateCriterias(
    objectMetadataItem: ObjectMetadataInterface,
  ) {
    return this.duplicateCriterias.filter(
      (dc) => dc.object === objectMetadataItem.nameSingular,
    );
  }
}
