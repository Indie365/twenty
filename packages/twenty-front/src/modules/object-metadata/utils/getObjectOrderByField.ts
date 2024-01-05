import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { OrderBy } from '@/object-metadata/types/OrderBy';
import { OrderByField } from '@/object-metadata/types/OrderByField';
import { FieldMetadataType } from '~/generated-metadata/graphql';

export const getObjectOrderByField = (
  objectMetadataItem: ObjectMetadataItem,
  orderBy?: OrderBy | null,
): OrderByField => {
  const labelIdentifierFieldMetadata = objectMetadataItem.fields.find(
    (field) =>
      field.id === objectMetadataItem.labelIdentifierFieldMetadataId ||
      field.name === 'name',
  );

  if (labelIdentifierFieldMetadata) {
    switch (labelIdentifierFieldMetadata.type) {
      case FieldMetadataType.FullName:
        return {
          [labelIdentifierFieldMetadata.name]: {
            firstName: orderBy ?? 'AscNullsLast',
            lastName: orderBy ?? 'AscNullsLast',
          },
        };
      default:
        return {
          [labelIdentifierFieldMetadata.name]: orderBy ?? 'AscNullsLast',
        };
    }
  } else {
    return {
      createdAt: orderBy ?? 'DescNullsLast',
    };
  }
};
