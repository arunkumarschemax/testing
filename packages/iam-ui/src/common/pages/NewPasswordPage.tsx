import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { NewPasswordForm } from '../component-lib/layouts/auth/NewPasswordForm/NewPasswordForm';

const NewPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.newPassword')}</PageTitle>
      <NewPasswordForm />
    </>
  );
};

export default NewPasswordPage;
