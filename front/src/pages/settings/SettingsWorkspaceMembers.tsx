import { useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { currentUserState } from '@/auth/states/currentUserState';
import { Button } from '@/ui/button/components/Button';
import { IconSettings, IconTrash } from '@/ui/icon';
import { SubMenuTopBarContainer } from '@/ui/layout/components/SubMenuTopBarContainer';
import { ConfirmationModal } from '@/ui/modal/components/ConfirmationModal';
import { Section } from '@/ui/section/components/Section';
import { H1Title } from '@/ui/typography/components/H1Title';
import { H2Title } from '@/ui/typography/components/H2Title';
import { WorkspaceInviteLink } from '@/workspace/components/WorkspaceInviteLink';
import { WorkspaceMemberCard } from '@/workspace/components/WorkspaceMemberCard';
import {
  useGetWorkspaceMembersQuery,
  useRemoveWorkspaceMemberMutation,
} from '~/generated/graphql';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(8)};
  width: 350px;
`;

const StyledButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-left: ${({ theme }) => theme.spacing(3)};
`;

export function SettingsWorkspaceMembers() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | undefined>();

  const [currentUser] = useRecoilState(currentUserState);
  const workspace = currentUser?.workspaceMember?.workspace;

  const { data } = useGetWorkspaceMembersQuery();

  const [removeWorkspaceMember] = useRemoveWorkspaceMemberMutation();

  const handleRemoveWorkspaceMember = async (userId: string) => {
    await removeWorkspaceMember({
      variables: {
        where: {
          userId,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteWorkspaceMember: {
          __typename: 'WorkspaceMember',
          id: userId,
        },
      },
      update: (cache, { data: responseData }) => {
        if (!responseData) {
          return;
        }

        cache.evict({
          id: cache.identify({
            id: responseData.deleteWorkspaceMember.id,
            __typename: 'WorkspaceMember',
          }),
        });

        cache.evict({
          id: cache.identify({
            id: userId,
            __typename: 'User',
          }),
        });

        cache.gc();
      },
    });
    setIsConfirmationModalOpen(false);
  };

  return (
    <SubMenuTopBarContainer icon={<IconSettings size={16} />} title="Settings">
      <StyledContainer>
        <H1Title title="Members" />
        {workspace?.inviteHash && (
          <Section>
            <H2Title
              title="Invite"
              description="Send an invitation to use Twenty"
            />
            <WorkspaceInviteLink
              inviteLink={`${window.location.origin}/invite/${workspace?.inviteHash}`}
            />
          </Section>
        )}
        <Section>
          <H2Title
            title="Members"
            description="Manage the members of your space here"
          />
          {data?.workspaceMembers?.map((member) => (
            <WorkspaceMemberCard
              key={member.user.id}
              workspaceMember={{ user: member.user }}
              accessory={
                currentUser?.id !== member.user.id && (
                  <StyledButtonContainer>
                    <Button
                      onClick={() => {
                        setIsConfirmationModalOpen(true);
                        setUserToDelete(member.user.id);
                      }}
                      variant={'tertiary'}
                      size={'small'}
                      Icon={IconTrash}
                      iconSize="md"
                    />
                  </StyledButtonContainer>
                )
              }
            />
          ))}
        </Section>
      </StyledContainer>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        title="Account Deletion"
        subtitle={
          <>
            This action cannot be undone. This will permanently delete this user
            and remove them from all their assignements.
          </>
        }
        onConfirmClick={() =>
          userToDelete && handleRemoveWorkspaceMember(userToDelete)
        }
        deleteButtonText="Delete account"
      />
    </SubMenuTopBarContainer>
  );
}
