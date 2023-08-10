import { getOperationName } from '@apollo/client/utilities';

import { GET_COMPANY } from '@/companies/queries';
import { GET_PERSON } from '@/people/queries/show';
import {
  useDeleteFavoriteMutation,
  useInsertCompanyFavoriteMutation,
  useInsertPersonFavoriteMutation,
} from '~/generated/graphql';

import { GET_FAVORITES } from '../queries/show';

export function useFavorites() {
  const [insertCompanyFavoriteMutation] = useInsertCompanyFavoriteMutation();
  const [insertPersonFavoriteMutation] = useInsertPersonFavoriteMutation();
  const [deleteFavoriteMutation] = useDeleteFavoriteMutation();

  function insertCompanyFavorite(companyId: string) {
    insertCompanyFavoriteMutation({
      variables: {
        data: {
          companyId,
        },
      },
      refetchQueries: [
        getOperationName(GET_FAVORITES) ?? '',
        getOperationName(GET_COMPANY) ?? '',
      ],
    });
  }

  function insertPersonFavorite(personId: string) {
    insertPersonFavoriteMutation({
      variables: {
        data: {
          personId,
        },
      },
      refetchQueries: [
        getOperationName(GET_FAVORITES) ?? '',
        getOperationName(GET_PERSON) ?? '',
      ],
    });
  }

  function deleteCompanyFavorite(companyId: string) {
    deleteFavoriteMutation({
      variables: {
        where: {
          companyId: {
            equals: companyId,
          },
        },
      },
      refetchQueries: [
        getOperationName(GET_FAVORITES) ?? '',
        getOperationName(GET_COMPANY) ?? '',
      ],
    });
  }

  function deletePersonFavorite(personId: string) {
    deleteFavoriteMutation({
      variables: {
        where: {
          personId: {
            equals: personId,
          },
        },
      },
      refetchQueries: [
        getOperationName(GET_FAVORITES) ?? '',
        getOperationName(GET_PERSON) ?? '',
      ],
    });
  }

  return {
    insertCompanyFavorite,
    insertPersonFavorite,
    deleteCompanyFavorite,
    deletePersonFavorite,
  };
}
