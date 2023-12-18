import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { SecurityCodeForm } from '../component-lib/layouts/auth/SecurityCodeForm/SecurityCodeForm';

const SecurityCodePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.securityCode')}</PageTitle>
      <SecurityCodeForm />
    </>
  );
};

export default SecurityCodePage;
