import type { Meta, StoryObj } from '@storybook/react';

import { mockedPeopleData } from '~/testing/mock-data/people';
import { getRenderWrapperForComponent } from '~/testing/renderWrappers';

import { PeopleFullNameEditableField } from '../PeopleFullNameEditableField';

const meta: Meta<typeof PeopleFullNameEditableField> = {
  title: 'Modules/People/EditableFields/PeopleFullNameEditableField',
  component: PeopleFullNameEditableField,
};

export default meta;
type Story = StoryObj<typeof PeopleFullNameEditableField>;

export const Default: Story = {
  render: getRenderWrapperForComponent(
    <PeopleFullNameEditableField people={mockedPeopleData[0]} />,
  ),
};
