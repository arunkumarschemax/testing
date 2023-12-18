import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { LoginForm } from '../component-lib/layouts/auth/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
      <LoginForm />
    </>
  );
};

export default LoginPage;
