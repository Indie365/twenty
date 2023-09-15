import { atomFamily } from 'recoil';

import type {
  ViewFieldDefinition,
  ViewFieldMetadata,
} from '@/ui/editable-field/types/ViewField';

export const savedBoardCardFieldsFamilyState = atomFamily<
  ViewFieldDefinition<ViewFieldMetadata>[],
  string | undefined
>({
  key: 'savedBoardCardFieldsFamilyState',
  default: [],
});
