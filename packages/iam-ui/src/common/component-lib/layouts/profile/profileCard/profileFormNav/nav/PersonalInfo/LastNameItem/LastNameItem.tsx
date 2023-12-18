import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { BaseInput } from '../../../../../../../inputs/BaseInput/BaseInput';

export const LastNameItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="lastName" label={t('common.lastName')}>
      <BaseInput />
    </BaseButtonsForm.Item>
  );
};
