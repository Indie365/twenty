import { getOperationName } from '@apollo/client/utilities';
import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 } from 'uuid';

import { currentUserState } from '@/auth/states/currentUserState';
import { commentableEntityArrayState } from '@/comments/states/commentableEntityArrayState';
import { createdCommentThreadIdState } from '@/comments/states/createdCommentThreadIdState';
import CompanyChip from '@/companies/components/CompanyChip';
import { GET_COMPANIES } from '@/companies/services';
import { GET_PEOPLE } from '@/people/services';
import { DropdownButton } from '@/ui/components/buttons/DropdownButton';
import { AutosizeTextInput } from '@/ui/components/inputs/AutosizeTextInput';
import { PropertyBox } from '@/ui/components/property-box/PropertyBox';
import { PropertyBoxItem } from '@/ui/components/property-box/PropertyBoxItem';
import { IconArrowUpRight } from '@/ui/icons/index';
import { useOpenRightDrawer } from '@/ui/layout/right-drawer/hooks/useOpenRightDrawer';
import { logError } from '@/utils/logs/logError';
import { isDefined } from '@/utils/type-guards/isDefined';
import { isNonEmptyString } from '@/utils/type-guards/isNonEmptyString';
import {
  useCreateCommentMutation,
  useCreateCommentThreadWithCommentMutation,
  useGetCommentThreadQuery,
} from '~/generated/graphql';

import { GET_COMMENT_THREAD } from '../services';
import { CommentableEntity } from '../types/CommentableEntity';

import { CommentThreadItem } from './CommentThreadItem';
import { CommentThreadRelationPicker } from './CommentThreadRelationPicker';
import { CommentThreadTypeDropdown } from './CommentThreadTypeDropdown';

import '@blocknote/core/style.css';

const StyledContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};

  justify-content: flex-start;

  padding: ${({ theme }) => theme.spacing(2)};
`;

const BlockNoteStyledContainer = styled.div`
  width: 100%;
`;

const StyledTopContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  background: ${({ theme }) => theme.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const StyledEditableTitleInput = styled.input`
  background: transparent;

  border: none;
  color: ${({ theme }) => theme.font.color.primary};
  display: flex;
  flex: 1 0 0;

  flex-direction: column;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  justify-content: center;

  line-height: 120%;
  outline: none;
  width: 318px;

  :placeholder {
    color: ${({ theme }) => theme.font.color.light};
  }
`;

export function CommentThreadCreateMode({
  commentableEntityArray,
}: {
  commentableEntityArray: CommentableEntity[];
}) {
  const editor: BlockNoteEditor | null = useBlockNote({
    theme: 'light',
  });

  return (
    <StyledContainer>
      <StyledTopContainer>
        <CommentThreadTypeDropdown />
        <StyledEditableTitleInput placeholder="Note title (optional)" />
        <PropertyBox>
          <PropertyBoxItem
            icon={<IconArrowUpRight />}
            value={
              <CommentThreadRelationPicker
                preselected={commentableEntityArray}
              />
            }
            label="Relations"
          />
        </PropertyBox>
      </StyledTopContainer>
      <BlockNoteStyledContainer>
        <BlockNoteView editor={editor} />
      </BlockNoteStyledContainer>
    </StyledContainer>
  );
}
