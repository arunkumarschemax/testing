import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './PasswordForm.styles';
import { BaseCol } from '../../../../../../../../BaseCol/BaseCol';
import { BaseRow } from '../../../../../../../../BaseRow/BaseRow';
import { BaseButtonsForm } from '../../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { notificationController } from '../../../../../../../../../controllers/notificationController';
import { ConfirmItemPassword } from '../ConfirmPasswordItem/ConfirmPasswordItem';
import { CurrentPasswordItem } from '../CurrentPasswordItem/CurrentPasswordItem';
import { NewPasswordItem } from '../NewPasswordItem/NewPasswordItem';

export const PasswordForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = (values: []) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: t('common.success') });
      console.log(values);
    }, 1000);
  };

  return (
    <BaseButtonsForm
      name="newPassword"
      requiredMark="optional"
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      footer={
        <S.Btn loading={isLoading} type="primary" htmlType="submit">
          {t('common.confirm')}
        </S.Btn>
      }
      onFinish={onFinish}
    >
      <BaseRow gutter={{ md: 15, xl: 30 }}>
        <BaseCol span={24}>
          <BaseButtonsForm.Item>
            <BaseButtonsForm.Title>{t('profile.nav.securitySettings.changePassword')}</BaseButtonsForm.Title>
          </BaseButtonsForm.Item>
        </BaseCol>

        <BaseCol xs={24} md={12} xl={24}>
          <CurrentPasswordItem />
        </BaseCol>

        <BaseCol xs={24} md={12} xl={24}>
          <NewPasswordItem />
        </BaseCol>

        <BaseCol xs={24} md={12} xl={24}>
          <ConfirmItemPassword />
        </BaseCol>
      </BaseRow>
    </BaseButtonsForm>
  );
};
