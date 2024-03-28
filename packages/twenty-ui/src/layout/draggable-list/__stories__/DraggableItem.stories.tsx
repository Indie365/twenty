import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { IconBell } from 'src/display';
import { MenuItemDraggable } from 'src/navigation/menu-item/components/MenuItemDraggable';
import { ComponentDecorator } from 'src/testing/decorators/ComponentDecorator';

import { DraggableItem } from '../components/DraggableItem';

const meta: Meta<typeof DraggableItem> = {
  title: 'UI/Layout/DraggableList/DraggableItem',
  component: DraggableItem,
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={() => fn()}>
        <Droppable droppableId="droppable-id">
          {(_provided) => <Story />}
        </Droppable>
      </DragDropContext>
    ),
    ComponentDecorator,
  ],
  parameters: {
    container: { width: 100 },
  },
  argTypes: {
    itemComponent: { control: { disable: true } },
  },
  args: {
    draggableId: 'draggable-1',
    index: 0,
    isDragDisabled: false,
    itemComponent: (
      <MenuItemDraggable LeftIcon={IconBell} text="Draggable item 1" />
    ),
  },
};

export default meta;

type Story = StoryObj<typeof DraggableItem>;

export const Default: Story = {};
