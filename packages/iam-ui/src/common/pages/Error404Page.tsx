import React from 'react';
import { useTranslation } from 'react-i18next';
import error404 from '../../assets/images/error404.svg';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { Error } from '../component-lib/Error/Error';

const Error404Page: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.clientError')}</PageTitle>
      <Error img={error404} msg={t('error404.notFound')} />
    </>
  );
};

export default Error404Page;
