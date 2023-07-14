import { Meta, StoryObj } from '@storybook/react';

import { companyBoardOptions } from '@/companies/components/companyBoardOptions';
import { EntityBoard } from '@/pipeline-progress/components/EntityBoard';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { getRenderWrapperForComponent } from '~/testing/renderWrappers';

const meta: Meta<typeof EntityBoard> = {
  title: 'UI/Board/Board',
  component: EntityBoard,
};

export default meta;
type Story = StoryObj<typeof EntityBoard>;

export const OneColumnBoard: Story = {
  render: getRenderWrapperForComponent(
    <EntityBoard boardOptions={companyBoardOptions} />,
  ),
  parameters: {
    msw: graphqlMocks,
  },
};
