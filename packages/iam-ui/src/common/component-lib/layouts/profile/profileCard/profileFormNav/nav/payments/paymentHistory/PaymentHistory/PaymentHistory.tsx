import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './PaymentHistory.styles';
import { getPaymentHistory, Payment as IPayment } from '../../../../../../../../../../api/paymentHistory.api';
import { BaseCard } from '../../../../../../../../BaseCard/BaseCard';
import { BaseCol } from '../../../../../../../../BaseCol/BaseCol';
import { BaseRow } from '../../../../../../../../BaseRow/BaseRow';
import { BaseForm } from '../../../../../../../../forms/BaseForm/BaseForm';
import { useResponsive } from '../../../../../../../../../hooks/useResponsive';
import { Payment } from '../Payment/Payment';
import { PaymentsTable } from '../PaymentsTable/PaymentsTable';

export const PaymentHistory: React.FC = () => {
  const [history, setHistory] = useState<IPayment[]>([]);

  const { mobileOnly, isTablet } = useResponsive();

  const { t } = useTranslation();

  const payments = useMemo(
    () =>
      history.map((item) => (
        <Payment
          key={item.id}
          src={item.imgUrl}
          recipient={item.recipient}
          date={item.date}
          status={item.status}
          price={item.amount}
          currency={item.currency}
        />
      )),
    [history],
  );

  useEffect(() => {
    getPaymentHistory().then((res) => setHistory(res));
  }, []);

  const content = useMemo(
    () => (
      <BaseRow gutter={[32, 32]}>
        <BaseCol span={24}>
          <BaseForm.Title>{t('profile.nav.payments.paymentHistory')}</BaseForm.Title>
        </BaseCol>

        <BaseCol span={24}>
          <S.ContentWrapper isEmptyHistory={history.length === 0}>
            {mobileOnly && (history.length > 0 ? payments : <S.Text>{t('profile.nav.payments.noHistory')}</S.Text>)}

            {isTablet && <PaymentsTable payments={history} />}
          </S.ContentWrapper>
        </BaseCol>
      </BaseRow>
    ),
    [isTablet, history, payments, mobileOnly, t],
  );

  return isTablet ? content : <BaseCard>{content}</BaseCard>;
};
