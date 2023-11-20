import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { useSnackBar } from '@/ui/feedback/snack-bar/hooks/useSnackBar';
import {
  FieldFilter,
  ObjectFilter,
  ObjectMetadataItemsQuery,
  ObjectMetadataItemsQueryVariables,
} from '~/generated-metadata/graphql';
import { logError } from '~/utils/logError';

import { FIND_MANY_METADATA_OBJECTS } from '../graphql/queries';
import { mapPaginatedObjectMetadataItemsToObjectMetadataItems } from '../utils/mapPaginatedObjectMetadataItemsToObjectMetadataItems';

import { useApolloMetadataClient } from './useApolloMetadataClient';

// TODO: test fetchMore
export const useFindManyObjectMetadataItems = ({
  skip,
  objectFilter,
  fieldFilter,
}: {
  skip?: boolean;
  objectFilter?: ObjectFilter;
  fieldFilter?: FieldFilter;
} = {}) => {
  const apolloMetadataClient = useApolloMetadataClient();

  const { enqueueSnackBar } = useSnackBar();

  const {
    data,
    fetchMore: fetchMoreInternal,
    loading,
    error,
  } = useQuery<ObjectMetadataItemsQuery, ObjectMetadataItemsQueryVariables>(
    FIND_MANY_METADATA_OBJECTS,
    {
      variables: {
        objectFilter,
        fieldFilter,
      },
      client: apolloMetadataClient ?? undefined,
      skip: skip || !apolloMetadataClient,
      onError: (error) => {
        logError('useFindManyObjectMetadataItems error : ' + error);
        enqueueSnackBar(
          `Error during useFindManyObjectMetadataItems, ${error.message}`,
          {
            variant: 'error',
          },
        );
      },
      onCompleted: () => {},
    },
  );

  const hasMore = useMemo(() => data?.objects?.pageInfo?.hasNextPage, [data]);

  const fetchMore = useCallback(
    () =>
      fetchMoreInternal({
        variables: {
          afterCursor: data?.objects?.pageInfo?.endCursor,
        },
      }),
    [data?.objects?.pageInfo?.endCursor, fetchMoreInternal],
  );

  const objectMetadataItems = useMemo(() => {
    return mapPaginatedObjectMetadataItemsToObjectMetadataItems({
      pagedObjectMetadataItems: data,
    });
  }, [data]);

  return {
    objectMetadataItems,
    hasMore,
    fetchMore,
    loading,
    error,
  };
};
