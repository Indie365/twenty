import { Loader } from 'twenty-ui';

import AnimatedPlaceholder from '@/ui/layout/animated-placeholder/components/AnimatedPlaceholder';
import {
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
} from '@/ui/layout/animated-placeholder/components/EmptyPlaceholderStyled';

export const SettingsAccountLoader = () => (
  <AnimatedPlaceholderEmptyContainer>
    <AnimatedPlaceholder type="loadingAccounts" />
    <AnimatedPlaceholderEmptyTextContainer>
      <AnimatedPlaceholderEmptyTitle>
        Loading account(s)
      </AnimatedPlaceholderEmptyTitle>
      <Loader />
    </AnimatedPlaceholderEmptyTextContainer>
  </AnimatedPlaceholderEmptyContainer>
);
