import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconCheckbox } from '@tabler/icons-react';

import { Button, ButtonVariant } from '@/ui/button/components/Button';
import { ActivityType } from '~/generated/graphql';

import { useOpenCreateActivityDrawer } from '../hooks/useOpenCreateActivityDrawer';
import { useTasks } from '../hooks/useTasks';

import { TaskList } from './TaskList';

const StyledTaskGroupEmptyContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding: 12px 16px 64px 16px;
`;

const StyledEmptyTaskGroupTitle = styled.div`
  color: ${({ theme }) => theme.font.color.secondary};
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  line-height: ${({ theme }) => theme.text.lineHeight.md};
`;

const StyledEmptyTaskGroupSubTitle = styled.div`
  color: ${({ theme }) => theme.font.color.extraLight};
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  line-height: ${({ theme }) => theme.text.lineHeight.md};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export function TaskGroups() {
  const { todayOrPreviousTasks, upcomingTasks } = useTasks();
  const theme = useTheme();

  const openCreateActivity = useOpenCreateActivityDrawer();

  if (todayOrPreviousTasks?.length === 0 && upcomingTasks?.length === 0) {
    return (
      <StyledTaskGroupEmptyContainer>
        <StyledEmptyTaskGroupTitle>No task yet</StyledEmptyTaskGroupTitle>
        <StyledEmptyTaskGroupSubTitle>Create one:</StyledEmptyTaskGroupSubTitle>
        <Button
          icon={<IconCheckbox size={theme.icon.size.sm} />}
          title="New task"
          variant={ButtonVariant.Secondary}
          onClick={() => openCreateActivity(ActivityType.Task)}
        />
      </StyledTaskGroupEmptyContainer>
    );
  }

  return (
    <>
      <TaskList title="Today" tasks={todayOrPreviousTasks ?? []} />
      <TaskList title="Upcoming" tasks={upcomingTasks ?? []} />
    </>
  );
}
