import { gql } from '@apollo/client';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { EMPTY_MUTATION } from '~/constants/EmptyMutation';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';
import { capitalize } from '~/utils/string/capitalize';

export const getDeleteManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `delete${capitalize(objectNamePlural)}`;

export const useGenerateDeleteManyRecordMutation = ({
  objectMetadataItem,
}: {
  objectMetadataItem: ObjectMetadataItem;
}) => {
  if (isUndefinedOrNull(objectMetadataItem)) {
    return EMPTY_MUTATION;
  }

  const capitalizedObjectName = capitalize(objectMetadataItem.namePlural);

  const mutationResponseField = getDeleteManyRecordsMutationResponseField(
    objectMetadataItem.namePlural,
  );

  return gql`
    mutation DeleteMany${capitalizedObjectName}($filter: ${capitalize(
      objectMetadataItem.nameSingular,
    )}FilterInput!)  {
      ${mutationResponseField}(filter: $filter) {
        id
      }
    }
  `;
};
