import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { SecuritySettings } from '../component-lib/layouts/profile/profileCard/profileFormNav/nav/SecuritySettings/SecuritySettings';

const SecuritySettingsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('profile.nav.securitySettings.title')}</PageTitle>
      <SecuritySettings />
    </>
  );
};

export default SecuritySettingsPage;
