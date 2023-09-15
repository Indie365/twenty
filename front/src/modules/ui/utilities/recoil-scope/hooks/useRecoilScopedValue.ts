import { Context, useContext } from 'react';
import { RecoilState, RecoilValueReadOnly, useRecoilValue } from 'recoil';

import { RecoilScopeContext } from '../states/RecoilScopeContext';

export const useRecoilScopedValue = <T>(
  recoilState: (param: string) => RecoilState<T> | RecoilValueReadOnly<T>,
  SpecificContext?: Context<string | null>,
) => {
  const recoilScopeId = useContext(SpecificContext ?? RecoilScopeContext);

  if (!recoilScopeId)
    throw new Error(
      `Using a scoped atom without a RecoilScope : ${
        recoilState('').key
      }, verify that you are using a RecoilScope with a specific context if you intended to do so.`,
    );

  return useRecoilValue<T>(recoilState(recoilScopeId));
};
