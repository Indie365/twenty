import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { ComponentDecorator } from 'src/testing/decorators/ComponentDecorator';
import { IconsProviderDecorator } from 'src/testing/decorators/IconsProviderDecorator';
import { sleep } from 'src/testing/sleep';

import { IconPicker } from '../IconPicker';

const meta: Meta<typeof IconPicker> = {
  title: 'UI/Input/IconPicker/IconPicker',
  component: IconPicker,
  decorators: [IconsProviderDecorator, ComponentDecorator],
};

export default meta;
type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {};

export const WithSelectedIcon: Story = {
  args: { selectedIconKey: 'IconCalendarEvent' },
};

export const WithOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const iconPickerButton = await canvas.findByRole('button');

    userEvent.click(iconPickerButton);
  },
};

export const WithOpenAndSelectedIcon: Story = {
  args: { selectedIconKey: 'IconCalendarEvent' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const iconPickerButton = await canvas.findByRole('button');

    userEvent.click(iconPickerButton);
  },
};

export const WithSearch: Story = {
  args: { selectedIconKey: 'IconBuildingSkyscraper' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const iconPickerButton = await canvas.findByRole('button');

    userEvent.click(iconPickerButton);

    const searchInput = await canvas.findByRole('textbox');

    await userEvent.type(searchInput, 'Building skyscraper');

    await sleep(100);

    const searchedIcon = canvas.getByRole('button', {
      name: 'Icon Building Skyscraper',
    });

    expect(searchedIcon).toBeInTheDocument();
  },
};

export const WithSearchAndClose: Story = {
  args: { selectedIconKey: 'IconBuildingSkyscraper' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const iconPickerButton = await canvas.findByRole('button');

    userEvent.click(iconPickerButton);

    const searchInput = await canvas.findByRole('textbox');

    await userEvent.type(searchInput, 'Building skyscraper');

    await sleep(100);

    const searchedIcon = canvas.getByRole('button', {
      name: 'Icon Building Skyscraper',
    });

    expect(searchedIcon).toBeInTheDocument();

    userEvent.click(searchedIcon);

    await sleep(100);

    userEvent.click(iconPickerButton);

    await sleep(100);

    expect(canvas.queryByRole('textbox')).toBeNull();
  },
};
