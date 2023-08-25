import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { IconCheckbox } from '@tabler/icons-react';

import { ComponentDecorator } from '~/testing/decorators/ComponentDecorator';

import { TabList } from '../TabList';
import { RecoilScope } from '@/ui/utilities/recoil-scope/components/RecoilScope';
import { within } from '@storybook/testing-library';

const tabs = [
  {
    id: '1',
    title: 'Tab1',
    icon: <IconCheckbox size={16} />,
    hide: true,
  },
  {
    id: '2',
    title: 'Tab2',
    icon: <IconCheckbox size={16} />,
    hide: false,
  },
  {
    id: '3',
    title: 'Tab3',
    icon: <IconCheckbox size={16} />,
    hide: false,
    disabled: true,
  },
  {
    id: '4',
    title: 'Tab4',
    icon: <IconCheckbox size={16} />,
    hide: false,
    disabled: false,
  },
];

const meta: Meta<typeof TabList> = {
  title: 'UI/Tab/TabList',
  component: TabList,
  args: {
    tabs: tabs,
  },
  decorators: [
    (Story) => (
      <RecoilScope>
        <Story />
      </RecoilScope>
    ),
    ComponentDecorator,
  ],
};

export default meta;

type Story = StoryObj<typeof TabList>;

export const TabListDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.queryByText('Tab1');
    expect(submitButton).toBeNull();
    expect(await canvas.findByText('Tab2')).toBeInTheDocument();
    expect(await canvas.findByText('Tab3')).toBeInTheDocument();
    expect(await canvas.findByText('Tab4')).toBeInTheDocument();
  },
};
