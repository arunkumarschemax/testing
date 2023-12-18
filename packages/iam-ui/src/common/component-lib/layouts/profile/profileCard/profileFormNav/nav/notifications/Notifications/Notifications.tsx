import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { BaseCard } from '../../../../../../../BaseCard/BaseCard';
import * as S from './Notifications.styles';
import { NotificationsTypes } from '../NotificationsTypes/NotificationsTypes';

export const Notifications: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseCard>
      <BaseButtonsForm.Item>
        <BaseButtonsForm.Title>{t('profile.nav.notifications.settings')}</BaseButtonsForm.Title>
      </BaseButtonsForm.Item>
      <S.Description>{t('profile.nav.notifications.description')}</S.Description>
      <NotificationsTypes />
    </BaseCard>
  );
};
