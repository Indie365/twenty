import { useRef } from 'react';
import styled from '@emotion/styled';

import { RecordTableInternalEffect } from '@/ui/object/record-table/components/RecordTableInternalEffect';
import { useRecordTable } from '@/ui/object/record-table/hooks/useRecordTable';
import { DragSelect } from '@/ui/utilities/drag-select/components/DragSelect';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';

import { EntityUpdateMutationContext } from '../contexts/EntityUpdateMutationHookContext';

import { RecordTableBody } from './RecordTableBody';
import { RecordTableHeader } from './RecordTableHeader';

const StyledTable = styled.table`
  border-collapse: collapse;

  border-radius: ${({ theme }) => theme.border.radius.sm};
  border-spacing: 0;
  margin-left: ${({ theme }) => theme.table.horizontalCellMargin};
  margin-right: ${({ theme }) => theme.table.horizontalCellMargin};
  table-layout: fixed;

  width: calc(100% - ${({ theme }) => theme.table.horizontalCellMargin} * 2);

  th {
    border: 1px solid ${({ theme }) => theme.border.color.light};
    border-collapse: collapse;
    color: ${({ theme }) => theme.font.color.tertiary};
    padding: 0;
    text-align: left;

    :last-child {
      border-right-color: transparent;
    }
    :first-of-type {
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }

  td {
    border: 1px solid ${({ theme }) => theme.border.color.light};
    border-collapse: collapse;
    color: ${({ theme }) => theme.font.color.primary};
    padding: 0;

    text-align: left;

    :last-child {
      border-right-color: transparent;
    }
    :first-of-type {
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }
`;

const StyledTableWithHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

type RecordTableProps = {
  updateEntityMutation: (params: any) => void;
};

export const RecordTable = ({ updateEntityMutation }: RecordTableProps) => {
  const tableBodyRef = useRef<HTMLDivElement>(null);

  const { resetTableRowSelection, setRowSelectedState } = useRecordTable();

  return (
    <ScrollWrapper>
      <EntityUpdateMutationContext.Provider value={updateEntityMutation}>
        <StyledTableWithHeader>
          <StyledTableContainer>
            <div ref={tableBodyRef}>
              <StyledTable className="entity-table-cell">
                <RecordTableHeader tableBodyRef={tableBodyRef} />
                <RecordTableBody />
              </StyledTable>
              <DragSelect
                dragSelectable={tableBodyRef}
                onDragSelectionStart={resetTableRowSelection}
                onDragSelectionChange={setRowSelectedState}
              />
            </div>
            <RecordTableInternalEffect tableBodyRef={tableBodyRef} />
          </StyledTableContainer>
        </StyledTableWithHeader>
      </EntityUpdateMutationContext.Provider>
    </ScrollWrapper>
  );
};
