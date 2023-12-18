import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { SignUpForm } from '../component-lib/layouts/auth/SignUpForm/SignUpForm';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.signUp')}</PageTitle>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
