import { DropdownButton } from '@/ui/dropdown/components/DropdownButton';
import { HotkeyScope } from '@/ui/utilities/hotkey/types/HotkeyScope';

import { type TableView } from '../../states/tableViewsState';

import { TableOptionsDropdownButton } from './TableOptionsDropdownButton';
import { TableOptionsDropdownContent } from './TableOptionsDropdownContent';

type TableOptionsDropdownProps = {
  onViewsChange?: (views: TableView[]) => void;
  onImport?: () => void;
  onExport?: () => void;
  customHotkeyScope: HotkeyScope;
};

export function TableOptionsDropdown({
  onViewsChange,
  onImport,
  onExport,
  customHotkeyScope,
}: TableOptionsDropdownProps) {
  return (
    <DropdownButton
      buttonComponents={<TableOptionsDropdownButton />}
      dropdownHotkeyScope={customHotkeyScope}
      dropdownKey="options"
      dropdownComponents={
        <TableOptionsDropdownContent
          onImport={onImport}
          onExport={onExport}
          onViewsChange={onViewsChange}
        />
      }
    />
  );
}
