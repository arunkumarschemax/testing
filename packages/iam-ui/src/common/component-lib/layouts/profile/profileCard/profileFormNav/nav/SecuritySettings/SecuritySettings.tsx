import React from 'react';
import { PasswordForm } from './passwordForm/PasswordForm/PasswordForm';
import { TwoFactorAuth } from './twoFactorAuth/TwoFactorAuth';
import { BaseCard } from '../../../../../../BaseCard/BaseCard';
import { BaseCol } from '../../../../../../BaseCol/BaseCol';
import { BaseRow } from '../../../../../../BaseRow/BaseRow';

export const SecuritySettings: React.FC = () => (
  <BaseCard>
    <BaseRow gutter={[30, 0]}>
      <BaseCol xs={24} xl={10}>
        <PasswordForm />
      </BaseCol>

      <BaseCol xs={24} xl={14}>
        <TwoFactorAuth />
      </BaseCol>
    </BaseRow>
  </BaseCard>
);
