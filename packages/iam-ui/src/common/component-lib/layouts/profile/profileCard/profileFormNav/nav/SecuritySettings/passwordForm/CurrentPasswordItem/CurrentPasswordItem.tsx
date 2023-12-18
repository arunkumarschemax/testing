import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '../../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { InputPassword } from '../../../../../../../../inputs/InputPassword/InputPassword';

export const CurrentPasswordItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item
      name="password"
      label={t('profile.nav.securitySettings.currentPassword')}
      rules={[
        {
          required: true,
          message: t('profile.nav.securitySettings.requiredPassword'),
        },
      ]}
    >
      <InputPassword />
    </BaseButtonsForm.Item>
  );
};
