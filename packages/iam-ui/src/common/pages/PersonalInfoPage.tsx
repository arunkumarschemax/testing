import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { PersonalInfo } from '../component-lib/layouts/profile/profileCard/profileFormNav/nav/PersonalInfo/PersonalInfo';

const PersonalInfoPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('profile.nav.personalInfo.title')}</PageTitle>
      <PersonalInfo />
    </>
  );
};

export default PersonalInfoPage;
