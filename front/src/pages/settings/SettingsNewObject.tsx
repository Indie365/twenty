import React, { useState } from 'react';
import styled from '@emotion/styled';

import { NewObjectType } from '@/settings/workspace/components/NewObjectType';
import { Breadcrumb } from '@/ui/breadcrumb/components/Breadcrumb';
import { IconSettings } from '@/ui/icon';
import { SubMenuTopBarContainer } from '@/ui/layout/components/SubMenuTopBarContainer';
import { Section } from '@/ui/section/components/Section';
import { H2Title } from '@/ui/typography/components/H2Title';

import { objectSettingsWidth } from './constants/objectSettings';
import { title } from 'process';

const StyledContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  height: fit-content;
  padding: ${({ theme }) => theme.spacing(8)};
  width: ${objectSettingsWidth};
`;

export const SettingsNewObject = () => {
  const [objectType, changeObjectType] = useState<string | null>(null);
  const handleObjectType = (type: string) => {
    changeObjectType(type);
  };
  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <>
        <StyledContainer>
          <Breadcrumb
            links={[
              { children: 'Objects', href: '/settings/objects' },
              { children: 'New' },
            ]}
          />
          <Section>
            <H2Title
              title="Object Type"
              description="The type of object you want to add"
            />
          </Section>
          <NewObjectType
            objectType={objectType}
            changeType={handleObjectType}
          ></NewObjectType>
        </StyledContainer>
      </>
    </SubMenuTopBarContainer>
  );
};
