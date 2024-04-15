import { Meta, StoryObj } from '@storybook/react';
import { ComponentDecorator } from 'twenty-ui';

import { CatalogDecorator } from '~/testing/decorators/CatalogDecorator';
import { CatalogStory } from '~/testing/types';

import {
  AutosizeTextInput,
  AutosizeTextInputVariant,
} from '../AutosizeTextInput';

const meta: Meta<typeof AutosizeTextInput> = {
  title: 'UI/Input/AutosizeTextInput/AutosizeTextInput',
  component: AutosizeTextInput,
  decorators: [ComponentDecorator],
};

export default meta;
type Story = StoryObj<typeof AutosizeTextInput>;

export const Default: Story = {};

export const ButtonVariant: Story = {
  args: { variant: AutosizeTextInputVariant.Button },
};

export const Catalog: CatalogStory<Story, typeof AutosizeTextInput> = {
  parameters: {
    catalog: {
      dimensions: [
        {
          name: 'variants',
          values: Object.values(AutosizeTextInputVariant),
          props: (variant: AutosizeTextInputVariant) => ({ variant }),
          labels: (variant: AutosizeTextInputVariant) =>
            `variant -> ${variant}`,
        },
        {
          name: 'minRows',
          values: [1, 4],
          props: (minRows: number) => ({ minRows }),
          labels: (minRows: number) => `minRows -> ${minRows}`,
        },
      ],
    },
  },
  decorators: [CatalogDecorator],
};
