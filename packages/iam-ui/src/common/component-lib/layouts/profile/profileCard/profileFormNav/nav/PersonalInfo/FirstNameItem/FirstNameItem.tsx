import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseInput } from '../../../../../../../inputs/BaseInput/BaseInput';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';

export const FirstNameItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="firstName" label={t('common.firstName')}>
      <BaseInput />
    </BaseButtonsForm.Item>
  );
};
