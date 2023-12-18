import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '../../../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import MaskedInput from 'antd-mask-input';
import { CardInputProps } from '../interfaces';

export const CardNumberItem: React.FC<CardInputProps> = ({ disabled, handleInputFocus }) => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item
      name="number"
      label={t('profile.nav.payments.cardNumber')}
      rules={[
        {
          required: true,
          message: t('common.requiredField'),
        },
      ]}
    >
      <MaskedInput
        placeholder={t('profile.nav.payments.yourCardNumber')}
        name="number"
        mask="0000 0000 0000 0000"
        onFocus={handleInputFocus}
        disabled={disabled}
      />
    </BaseButtonsForm.Item>
  );
};
