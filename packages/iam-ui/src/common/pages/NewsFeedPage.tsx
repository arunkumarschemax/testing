import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';

const NewsFeedPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.feed')}</PageTitle>
      <></>
    </>
  );
};

export default NewsFeedPage;
