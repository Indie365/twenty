import { useRecoilCallback } from 'recoil';

import { useRecordTableScopedStates } from '@/object-record/record-table/hooks/internal/useRecordTableScopedStates';
import { getRecordTableScopeInjector } from '@/object-record/record-table/utils/getRecordTableScopeInjector';

export const useCloseCurrentTableCellInEditMode = (
  recordTableScopeId: string,
) => {
  const {
    currentTableCellInEditModePositionScopeInjector,
    isTableCellInEditModeScopeinjector,
  } = getRecordTableScopeInjector();

  const {
    injectSnapshotValueWithRecordTableScopeId,
    injectFamilyStateWithRecordTableScopeId,
  } = useRecordTableScopedStates(recordTableScopeId);

  return useRecoilCallback(
    ({ set, snapshot }) => {
      return async () => {
        const currentTableCellInEditModePosition =
          injectSnapshotValueWithRecordTableScopeId(
            snapshot,
            currentTableCellInEditModePositionScopeInjector,
          );

        const isTableCellInEditMode = injectFamilyStateWithRecordTableScopeId(
          isTableCellInEditModeScopeinjector,
        );

        set(isTableCellInEditMode(currentTableCellInEditModePosition), false);
      };
    },
    [
      currentTableCellInEditModePositionScopeInjector,
      injectFamilyStateWithRecordTableScopeId,
      injectSnapshotValueWithRecordTableScopeId,
      isTableCellInEditModeScopeinjector,
    ],
  );
};
