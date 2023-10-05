import styled from '@emotion/styled';

import { useOpenCreateActivityDrawer } from '@/activities/hooks/useOpenCreateActivityDrawer';
import { ActivityTargetableEntity } from '@/activities/types/ActivityTargetableEntity';
import { PageHotkeyScope } from '@/types/PageHotkeyScope';
import { IconButton } from '@/ui/button/components/IconButton';
import { StyledDropdownMenu } from '@/ui/dropdown/components/StyledDropdownMenu';
import { StyledDropdownMenuItemsContainer } from '@/ui/dropdown/components/StyledDropdownMenuItemsContainer';
import { useDropdown } from '@/ui/dropdown/hooks/useDropdown';
import { IconCheckbox, IconNotes, IconPlus } from '@/ui/icon/index';
import { MenuItem } from '@/ui/menu-item/components/MenuItem';
import { ViewBarDropdownButton } from '@/ui/view-bar/components/ViewBarDropdownButton';
import { ActivityType } from '~/generated/graphql';

const StyledContainer = styled.div`
  z-index: 1;
`;

export const ShowPageAddButton = ({
  entity,
}: {
  entity: ActivityTargetableEntity;
}) => {
  const { closeDropdown, toggleDropdown } = useDropdown({
    dropdownId: 'add-show-page',
  });
  const openCreateActivity = useOpenCreateActivityDrawer();

  const handleSelect = (type: ActivityType) => {
    openCreateActivity({ type, targetableEntities: [entity] });
    closeDropdown();
  };

  return (
    <StyledContainer>
      <ViewBarDropdownButton
        dropdownId="add-show-page"
        buttonComponents={
          <IconButton
            Icon={IconPlus}
            size="medium"
            dataTestId="add-showpage-button"
            accent="default"
            variant="secondary"
            onClick={toggleDropdown}
          />
        }
        dropdownComponents={
          <StyledDropdownMenu>
            <StyledDropdownMenuItemsContainer
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem
                onClick={() => handleSelect(ActivityType.Note)}
                accent="default"
                LeftIcon={IconNotes}
                text="Note"
              />
              <MenuItem
                onClick={() => handleSelect(ActivityType.Task)}
                accent="default"
                LeftIcon={IconCheckbox}
                text="Task"
              />
            </StyledDropdownMenuItemsContainer>
          </StyledDropdownMenu>
        }
        dropdownHotkeyScope={{
          scope: PageHotkeyScope.ShowPage,
        }}
      />
    </StyledContainer>
  );
};
