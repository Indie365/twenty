import { FallbackProps } from 'react-error-boundary';
import {
  AnimatedPlaceholder,
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptySubTitle,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
  Button,
  IconRefresh,
} from 'twenty-ui';

type GenericErrorFallbackProps = FallbackProps;

export const GenericErrorFallback = ({
  error,
  resetErrorBoundary,
}: GenericErrorFallbackProps) => {
  return (
    <AnimatedPlaceholderEmptyContainer>
      <AnimatedPlaceholder type="errorIndex" />
      <AnimatedPlaceholderEmptyTextContainer>
        <AnimatedPlaceholderEmptyTitle>
          Server’s on a coffee break
        </AnimatedPlaceholderEmptyTitle>
        <AnimatedPlaceholderEmptySubTitle>
          {error.message}
        </AnimatedPlaceholderEmptySubTitle>
      </AnimatedPlaceholderEmptyTextContainer>
      <Button
        Icon={IconRefresh}
        title="Reload"
        variant={'secondary'}
        onClick={() => resetErrorBoundary()}
      />
    </AnimatedPlaceholderEmptyContainer>
  );
};
