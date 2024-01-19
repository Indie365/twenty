import { MappedObjectMetadata } from 'src/workspace/workspace-sync-metadata/interfaces/mapped-metadata.interface';

import { FieldMetadataEntity } from 'src/metadata/field-metadata/field-metadata.entity';
import { RelationMetadataEntity } from 'src/metadata/relation-metadata/relation-metadata.entity';

import { PartialFieldMetadata } from './partial-field-metadata.interface';
import { PartialObjectMetadata } from './partial-object-metadata.interface';

export const enum ComparatorAction {
  EQUAL = 'EQUAL',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface ComparatorEqualResult {
  action: ComparatorAction.EQUAL;
}

export interface ComparatorCreateResult<T> {
  action: ComparatorAction.CREATE;
  object: T;
}

export interface ComparatorUpdateResult<T> {
  action: ComparatorAction.UPDATE;
  object: T;
}

export interface ComparatorDeleteResult<T> {
  action: ComparatorAction.DELETE;
  object: T;
}

export type ObjectComparatorResult =
  | ComparatorEqualResult
  | ComparatorCreateResult<MappedObjectMetadata>
  | ComparatorUpdateResult<Partial<PartialObjectMetadata>>;

export type FieldComparatorResult =
  | ComparatorEqualResult
  | ComparatorCreateResult<PartialFieldMetadata>
  | ComparatorUpdateResult<Partial<PartialFieldMetadata> & { id: string }>
  | ComparatorDeleteResult<FieldMetadataEntity>;

export type RelationComparatorResult =
  | ComparatorCreateResult<Partial<RelationMetadataEntity>>
  | ComparatorDeleteResult<RelationMetadataEntity>;
