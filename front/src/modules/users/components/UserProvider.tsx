import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { currentUserState } from '@/auth/states/currentUserState';
import { useGetCurrentUserQuery } from '~/generated/graphql';

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [isLoading, setIsLoading] = useState(true);

  const { data, loading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
    if (data?.currentUser) {
      setCurrentUser(data.currentUser);
    }
  }, [setCurrentUser, data, isLoading, loading]);

  return isLoading ? <></> : <>{children}</>;
};
