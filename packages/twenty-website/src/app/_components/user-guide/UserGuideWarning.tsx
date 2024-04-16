'use client';
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { IconAlertCircle } from '@tabler/icons-react';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: var(--Palette-Red-10, #feecec);
  gap: 12px;
  border-radius: 8px;
  padding: 16px 24px;
  margin-bottom: 32px;
`;

const StyledIconContainer = styled.div`
  color: var(--Palette-Red-50, #b43232);
  padding-top: 1px;
`;

const StyledText = styled.div`
  p {
    color: var(--Palette-Red-50, #b43232) !important;
    margin: 0px !important;
  }
`;

export default function UserGuideWarning({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StyledContainer>
      <StyledIconContainer>
        <IconAlertCircle />
      </StyledIconContainer>
      <StyledText>{children}</StyledText>
    </StyledContainer>
  );
}