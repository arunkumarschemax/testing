import React from 'react';
import { useTranslation } from 'react-i18next';
import serverError from '../../assets/images/server-error.svg';
import { PageTitle } from '../component-lib/PageTitle/PageTitle';
import { Error } from '../component-lib/Error/Error';

const ServerErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.serverError')}</PageTitle>
      <Error img={serverError} msg={t('serverError.main')} />
    </>
  );
};

export default ServerErrorPage;
