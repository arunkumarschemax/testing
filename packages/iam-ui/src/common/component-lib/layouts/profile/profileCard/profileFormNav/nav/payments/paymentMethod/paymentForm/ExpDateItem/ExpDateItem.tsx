import React from 'react';
import { useTranslation } from 'react-i18next';
import MaskedInput from 'antd-mask-input';
import { BaseButtonsForm } from '../../../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { CardInputProps } from '../interfaces';

export const ExpDateItem: React.FC<CardInputProps> = ({ disabled, handleInputFocus }) => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item
      name="expiry"
      label={t('profile.nav.payments.expDate')}
      rules={[
        {
          required: true,
          message: t('common.requiredField'),
        },
      ]}
    >
      <MaskedInput placeholder="MM/YY" mask="00/00" name="expiry" onFocus={handleInputFocus} disabled={disabled} />
    </BaseButtonsForm.Item>
  );
};
