import { Meta, StoryObj } from '@storybook/react';

import { SettingsApiDetail } from '~/pages/settings/api/SettingsApiDetail';
import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedApiKeyToken } from '~/testing/mock-data/api-keys';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Settings/Api/SettingsApiDetail',
  component: SettingsApiDetail,
  decorators: [PageDecorator],
  args: {
    routePath: '/settings/apis/f7c6d736-8fcd-4e9c-ab99-28f6a9031570',
    state: mockedApiKeyToken,
  },
  parameters: {
    msw: graphqlMocks,
  },
};
export default meta;

export type Story = StoryObj<typeof SettingsApiDetail>;

export const Default: Story = {};
