import { useState } from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const StyledProgressBarItemContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.spacing(4)};
  padding-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledProgressBarItem = styled.div<{
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
}>`
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme.font.color.secondary
      : theme.background.transparent.medium};
  border-bottom-left-radius: ${({ theme, isFirst }) =>
    isFirst ? theme.border.radius.sm : theme.border.radius.xs};
  border-bottom-right-radius: ${({ theme, isLast }) =>
    isLast ? theme.border.radius.sm : theme.border.radius.xs};
  border-top-left-radius: ${({ theme, isFirst }) =>
    isFirst ? theme.border.radius.sm : theme.border.radius.xs};
  border-top-right-radius: ${({ theme, isLast }) =>
    isLast ? theme.border.radius.sm : theme.border.radius.xs};
  height: ${({ theme }) => theme.spacing(2)};
  width: ${({ theme }) => theme.spacing(3)};
`;

const StyledProgressBarContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const StyledLabel = styled.div`
  width: ${({ theme }) => theme.spacing(12)};
`;

const PROBABILITY_VALUES = [
  { label: '0%', value: 0 },
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: '100%', value: 100 },
];

type OwnProps = {
  probabilityIndex: number;
  onChange: (newValue: number) => void;
};

export const ProbabilityInput = ({ onChange, probabilityIndex }: OwnProps) => {
  const [nextProbabilityIndex, setNextProbabilityIndex] = useState<
    number | null
  >(null);

  return (
    <StyledContainer>
      <StyledLabel>
        {
          PROBABILITY_VALUES[
            nextProbabilityIndex || nextProbabilityIndex === 0
              ? nextProbabilityIndex
              : probabilityIndex
          ].label
        }
      </StyledLabel>
      <StyledProgressBarContainer>
        {PROBABILITY_VALUES.map((probability, i) => (
          <StyledProgressBarItemContainer
            key={i}
            onClick={() => onChange(probability.value)}
            onMouseEnter={() => setNextProbabilityIndex(i)}
            onMouseLeave={() => setNextProbabilityIndex(null)}
          >
            <StyledProgressBarItem
              isActive={
                nextProbabilityIndex || nextProbabilityIndex === 0
                  ? i <= nextProbabilityIndex
                  : i <= probabilityIndex
              }
              key={probability.label}
              isFirst={i === 0}
              isLast={i === PROBABILITY_VALUES.length - 1}
            />
          </StyledProgressBarItemContainer>
        ))}
      </StyledProgressBarContainer>
    </StyledContainer>
  );
};
