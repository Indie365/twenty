import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import debounce from 'lodash.debounce';

import { Button, ButtonVariant } from '@/ui/button/components/Button';
import { TextInput } from '@/ui/input/text/components/TextInput';
import { Modal } from '@/ui/modal/components/Modal';
import { Section, SectionAlignment } from '@/ui/section/components/Section';
import { H1Title, H1TitleFontColor } from '@/ui/typography/components/H1Title';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  subtitle: ReactNode;
  setIsOpen: (val: boolean) => void;
  onConfirmClick: () => void;
  deleteButtonText?: string;
  confirmationPlaceholder?: string;
  confirmationValue?: string;
}

export const StyledCenteredButton = styled(Button)`
  justify-content: center;
`;

export const StyledConfirmationButton = styled(StyledCenteredButton)`
  border-color: ${({ theme }) => theme.color.red20};
  box-shadow: none;
  color: ${({ theme }) => theme.color.red};
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: ${({ theme }) => theme.text.lineHeight.lg};
  :hover {
    background-color: ${({ theme }) => theme.color.red10};
  }
`;

export function ConfirmationModal({
  isOpen = false,
  title,
  subtitle,
  setIsOpen,
  onConfirmClick,
  deleteButtonText = 'Delete',
  confirmationValue,
  confirmationPlaceholder,
}: ConfirmationModalProps) {
  const [inputConfirmationValue, setInputConfirmationValue] =
    useState<string>('');
  const [isValidValue, setIsValidValue] = useState(!confirmationValue);

  const handleInputConfimrationValueChange = (value: string) => {
    setInputConfirmationValue(value);
    isValueMatchingUserEmail(confirmationValue, value);
  };

  const isValueMatchingUserEmail = debounce(
    (value?: string, inputValue?: string) => {
      setIsValidValue(Boolean(value && inputValue && value === inputValue));
    },
    250,
  );

  return (
    <AnimatePresence mode="wait">
      <LayoutGroup>
        <Modal
          isOpen={isOpen}
          onOutsideClick={() => {
            if (isOpen) {
              setIsOpen(false);
            }
          }}
        >
          <H1Title title={title} fontColor={H1TitleFontColor.Primary} />
          <Section alignment={SectionAlignment.Center}>{subtitle}</Section>
          {confirmationValue && (
            <Section>
              <TextInput
                value={inputConfirmationValue}
                onChange={handleInputConfimrationValueChange}
                placeholder={confirmationPlaceholder}
                fullWidth
                key={'email-' + confirmationValue}
              />
            </Section>
          )}
          <StyledConfirmationButton
            onClick={onConfirmClick}
            variant={ButtonVariant.Secondary}
            title={deleteButtonText}
            disabled={!isValidValue}
            fullWidth
          />
          <StyledCenteredButton
            onClick={() => setIsOpen(false)}
            variant={ButtonVariant.Secondary}
            title="Cancel"
            fullWidth
            style={{
              marginTop: 10,
            }}
          />
        </Modal>
      </LayoutGroup>
    </AnimatePresence>
  );
}
