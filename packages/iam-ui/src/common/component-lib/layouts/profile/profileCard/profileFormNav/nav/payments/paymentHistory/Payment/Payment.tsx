import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Status } from '../Status/Status';
import * as S from './Payment.styles';
import { BaseAvatar } from '../../../../../../../../BaseAvatar/BaseAvatar';
import { BaseButton } from '../../../../../../../../BaseButton/BaseButton';
import { Dates } from '../../../../../../../../../constants/Dates';
import { paymentStatuses } from '../../../../../../../../../constants/paymentStatuses';
import { CurrencyTypeEnum } from '../../../../../../../../../utils/interfaces';
import { defineColorByPriority, getCurrencyPrice } from '../../../../../../../../../utils/utils';

interface PaymentProps {
  src: string;
  recipient: string;
  date: number;
  status: number;
  price: number;
  currency: CurrencyTypeEnum;
}

export const Payment: React.FC<PaymentProps> = ({ src, recipient, date, status, price, currency }) => {
  const { t } = useTranslation();

  const paymentStatus = useMemo(() => paymentStatuses.find((item) => item.id === status), [status]);

  return paymentStatus ? (
    <>
      <S.Header>
        <S.AvatarWrapper>
          <BaseAvatar src={src} alt={recipient} shape="circle" />
        </S.AvatarWrapper>
        <S.Text>{recipient}</S.Text>
      </S.Header>
      <S.ContentWrapper>
        <S.Item>
          <S.Subtitle>{t('profile.nav.payments.date')}</S.Subtitle>
          <S.Text>{Dates.format(date, 'LL')}</S.Text>
        </S.Item>
        <S.Item>
          <S.Subtitle>{t('profile.nav.payments.status.title')}</S.Subtitle>
          <Status color={defineColorByPriority(paymentStatus.priority)} text={t(paymentStatus.name)} />
        </S.Item>
        <S.Item>
          <S.Subtitle>{t('profile.nav.payments.date')}</S.Subtitle>
          <S.Text>{getCurrencyPrice(price, currency)}</S.Text>
        </S.Item>
      </S.ContentWrapper>
      <S.DetailsWrapper>
        <BaseButton type="link">{t('profile.nav.payments.details')}</BaseButton>
      </S.DetailsWrapper>
    </>
  ) : null;
};
