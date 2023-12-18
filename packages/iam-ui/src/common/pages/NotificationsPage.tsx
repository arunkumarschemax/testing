import React from 'react';
import { useTranslation } from 'react-i18next';
import { Notifications } from '../component-lib/layouts/profile/profileCard/profileFormNav/nav/notifications/Notifications/Notifications';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('profile.nav.notifications.title')}</PageTitle>
      <Notifications />
    </>
  );
};

export default NotificationsPage;
