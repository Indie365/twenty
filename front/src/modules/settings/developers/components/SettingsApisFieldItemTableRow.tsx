import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { IconChevronRight } from '@/ui/display/icon';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';

import { ApisFiedlItem } from '../types/ApisFieldItem';

export const StyledObjectFieldTableRow = styled(TableRow)`
  grid-template-columns: 180px 148px 148px 36px;
`;

const StyledNameTableCell = styled(TableCell)`
  color: ${({ theme }) => theme.font.color.primary};
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledIconTableCell = styled(TableCell)`
  justify-content: center;
  padding-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledIconChevronRight = styled(IconChevronRight)`
  color: ${({ theme }) => theme.font.color.tertiary};
`;

export const SettingsApisFieldItemTableRow = ({
  fieldItem,
}: {
  fieldItem: ApisFiedlItem;
}) => {
  const theme = useTheme();

  return (
    <StyledObjectFieldTableRow onClick={() => {}}>
      <StyledNameTableCell>{fieldItem.name}</StyledNameTableCell>
      <TableCell>
        {fieldItem.type === 'internal' ? 'Internal' : 'Published'}
      </TableCell>
      {fieldItem.expiration === 'Expired' ? (
        <TableCell color="red">{fieldItem.expiration}</TableCell>
      ) : (
        <TableCell>{fieldItem.expiration}</TableCell>
      )}
      <StyledIconTableCell>
        <StyledIconChevronRight
          size={theme.icon.size.md}
          stroke={theme.icon.stroke.sm}
        />
      </StyledIconTableCell>
    </StyledObjectFieldTableRow>
  );
};
