import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { Payments } from '../component-lib/layouts/profile/profileCard/profileFormNav/nav/payments/Payments';

const PaymentsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('profile.nav.payments.title')}</PageTitle>
      <Payments />
    </>
  );
};

export default PaymentsPage;
