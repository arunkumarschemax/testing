import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { BaseInput } from '../../../../../../../inputs/BaseInput/BaseInput';

export const NicknameItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="nickname" label={t('profile.nav.personalInfo.nickname')}>
      <BaseInput />
    </BaseButtonsForm.Item>
  );
};
