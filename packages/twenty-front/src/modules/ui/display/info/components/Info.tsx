import React from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { IconInfoCircle } from '@/ui/display/icon';
import { Button } from '@/ui/input/button/components/Button.tsx';

export type InfoAccent = 'blue' | 'danger';
export type InfoProps = {
  accent?: InfoAccent;
  text: string;
  buttonTitle: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledTextContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledInfo = styled.div<Pick<InfoProps, 'accent'>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  width: 100%;
  ${({ theme, accent }) => {
    switch (accent) {
      case 'blue':
        return css`
          background: ${theme.color.blueAccent20};
          color: ${theme.color.blue50};
        `;
      case 'danger':
        return css`
          background: ${theme.color.red10};
          color: ${theme.color.red};
        `;
    }
  }}
`;
export const Info = ({
  accent = 'blue',
  text,
  buttonTitle,
  onClick,
}: InfoProps) => {
  const theme = useTheme();
  return (
    <StyledInfo accent={accent}>
      <StyledTextContainer>
        <IconInfoCircle size={theme.icon.size.md} />
        {text}
      </StyledTextContainer>
      <Button
        title={buttonTitle}
        onClick={onClick}
        size={'small'}
        variant={'secondary'}
      />
    </StyledInfo>
  );
};
