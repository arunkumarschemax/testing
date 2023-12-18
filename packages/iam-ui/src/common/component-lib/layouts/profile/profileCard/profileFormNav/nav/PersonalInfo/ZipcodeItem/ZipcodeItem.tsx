import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseInput } from '../../../../../../../inputs/BaseInput/BaseInput';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';

export const ZipcodeItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="zipcode" label={t('common.zipcode')}>
      <BaseInput />
    </BaseButtonsForm.Item>
  );
};
