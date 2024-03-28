import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { OverflowingTextWithTooltip } from 'src/display';
import { Checkbox } from 'src/input/components/Checkbox';
import {
  StyledMenuItemBase,
  StyledMenuItemLabel,
  StyledMenuItemLeftContent,
} from 'src/navigation/menu-item/components/StyledMenuItemBase';

const StyledLeftContentWithCheckboxContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

type MenuItemMultiSelectAvatarProps = {
  avatar?: ReactNode;
  selected: boolean;
  isKeySelected?: boolean;
  text: string;
  className?: string;
  onSelectChange?: (selected: boolean) => void;
};

export const MenuItemMultiSelectAvatar = ({
  avatar,
  text,
  selected,
  className,
  isKeySelected,
  onSelectChange,
}: MenuItemMultiSelectAvatarProps) => {
  const handleOnClick = () => {
    onSelectChange?.(!selected);
  };

  return (
    <StyledMenuItemBase
      className={className}
      onClick={handleOnClick}
      isKeySelected={isKeySelected}
    >
      <StyledLeftContentWithCheckboxContainer>
        <Checkbox checked={selected} />
        <StyledMenuItemLeftContent>
          {avatar}
          <StyledMenuItemLabel hasLeftIcon={!!avatar}>
            <OverflowingTextWithTooltip text={text} />
          </StyledMenuItemLabel>
        </StyledMenuItemLeftContent>
      </StyledLeftContentWithCheckboxContainer>
    </StyledMenuItemBase>
  );
};
