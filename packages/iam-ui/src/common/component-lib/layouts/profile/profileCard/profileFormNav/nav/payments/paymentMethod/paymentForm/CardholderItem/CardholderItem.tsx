import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardInputProps } from '../interfaces';
import { BaseButtonsForm } from '../../../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { BaseInput } from '../../../../../../../../../inputs/BaseInput/BaseInput';

export const CardholderItem: React.FC<CardInputProps> = ({ disabled, handleInputFocus }) => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item
      name="name"
      label={t('profile.nav.payments.cardholderName')}
      rules={[
        {
          required: true,
          message: t('common.requiredField'),
        },
      ]}
    >
      <BaseInput
        name="name"
        placeholder={t('profile.nav.payments.yourName')}
        onFocus={handleInputFocus}
        disabled={disabled}
      />
    </BaseButtonsForm.Item>
  );
};
