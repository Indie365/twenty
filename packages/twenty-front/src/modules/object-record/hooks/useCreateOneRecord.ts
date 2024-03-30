import { useApolloClient } from '@apollo/client';
import { v4 } from 'uuid';

import { triggerCreateRecordsOptimisticEffect } from '@/apollo/optimistic-effect/utils/triggerCreateRecordsOptimisticEffect';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { useGenerateObjectRecordOptimisticResponse } from '@/object-record/cache/hooks/useGenerateObjectRecordOptimisticResponse';
import { getRecordNodeFromRecord } from '@/object-record/cache/utils/getRecordNodeFromRecord';
import {
  getCreateOneRecordMutationResponseField,
  useGenerateCreateOneRecordMutation,
} from '@/object-record/hooks/useGenerateCreateOneRecordMutation';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { sanitizeRecordInput } from '@/object-record/utils/sanitizeRecordInput';

type useCreateOneRecordProps = {
  objectNameSingular: string;
  queryFields?: Record<string, any>;
};

type CreateOneRecordOptions = {
  skipOptimisticEffect?: boolean;
};

export const useCreateOneRecord = <
  CreatedObjectRecord extends ObjectRecord = ObjectRecord,
>({
  objectNameSingular,
  queryFields,
}: useCreateOneRecordProps) => {
  const apolloClient = useApolloClient();

  const { objectMetadataItem } = useObjectMetadataItem({ objectNameSingular });

  const createOneRecordMutation = useGenerateCreateOneRecordMutation({
    objectMetadataItem,
    queryFields,
  });

  const { generateObjectRecordOptimisticResponse } =
    useGenerateObjectRecordOptimisticResponse({
      objectMetadataItem,
    });

  const { objectMetadataItems } = useObjectMetadataItems();

  const createOneRecord = async (
    input: Partial<CreatedObjectRecord>,
    options?: CreateOneRecordOptions,
  ) => {
    const idForCreation = input.id ?? v4();

    const inputWithNestedConnections = getRecordNodeFromRecord({
      record: { ...input, id: idForCreation },
      objectMetadataItem,
      objectMetadataItems,
      depth: 1,
      computeReferences: false,
    });

    const sanitizedCreateOneRecordInput = sanitizeRecordInput({
      objectMetadataItem,
      recordInput: { ...inputWithNestedConnections, id: idForCreation },
    });

    const optimisticallyCreatedRecord =
      generateObjectRecordOptimisticResponse<CreatedObjectRecord>({
        ...inputWithNestedConnections,
      });

    const mutationResponseField =
      getCreateOneRecordMutationResponseField(objectNameSingular);

    const createdObject = await apolloClient.mutate({
      mutation: createOneRecordMutation,
      variables: {
        input: sanitizedCreateOneRecordInput,
      },
      optimisticResponse: options?.skipOptimisticEffect
        ? undefined
        : {
            [mutationResponseField]: optimisticallyCreatedRecord,
          },
      update: options?.skipOptimisticEffect
        ? undefined
        : (cache, { data }) => {
            const record = data?.[mutationResponseField];

            if (!record) return;

            triggerCreateRecordsOptimisticEffect({
              cache,
              objectMetadataItem,
              recordsToCreate: [record],
              objectMetadataItems,
            });
          },
    });

    return createdObject.data?.[mutationResponseField] ?? null;
  };

  return {
    createOneRecord,
  };
};
