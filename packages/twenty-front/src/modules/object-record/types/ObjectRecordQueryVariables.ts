import { OrderByField } from '@/object-metadata/types/OrderByField';
import { ObjectRecordFilter } from '@/object-record/types/ObjectRecordFilter';

export type ObjectRecordQueryVariables = {
  filter?: ObjectRecordFilter;
  orderBy?: OrderByField;
  limit?: number;
};
