import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseInput } from '../../../../../../../inputs/BaseInput/BaseInput';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';

export const CitiesItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="city" label={t('common.city')}>
      <BaseInput />
    </BaseButtonsForm.Item>
  );
};
