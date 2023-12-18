import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { LockForm } from '../component-lib/layouts/auth/LockForm/LockForm';

const LockPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.lock')}</PageTitle>
      <LockForm />
    </>
  );
};

export default LockPage;
