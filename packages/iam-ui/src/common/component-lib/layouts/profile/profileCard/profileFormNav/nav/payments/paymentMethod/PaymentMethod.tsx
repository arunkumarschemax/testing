import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentCardsWidget } from './PaymentCardsWidget';
import { getPaymentCards } from '../../../../../../../../../api/paymentCards.api';
import { BaseCard } from '../../../../../../../../component-lib/BaseCard/BaseCard';
import { BaseCol } from '../../../../../../../../component-lib/BaseCol/BaseCol';
import { BaseRow } from '../../../../../../../../component-lib/BaseRow/BaseRow';
import { BaseSpin } from '../../../../../../../../component-lib/BaseSpin/BaseSpin';
import { BaseForm } from '../../../../../../../../component-lib/forms/BaseForm/BaseForm';
import { useAppSelector } from '../../../../../../../../hooks/reduxHooks';
import { useResponsive } from '../../../../../../../../hooks/useResponsive';
import { PaymentCard } from '../../../../../../../../utils/interfaces';

export const PaymentMethod: React.FC = () => {
  const { t } = useTranslation();

  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [loading, setLoading] = useState(false);

  const id = useAppSelector((state) => state.user?.user?.id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPaymentCards(id)
        .then((res) => setCards(res))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const { isTablet } = useResponsive();

  const handleCardRemove = (cardNumber: string) => setCards(cards.filter((card) => card.number !== cardNumber));

  const handleCardAdd = (card: PaymentCard) => {
    setCards([...cards, card]);
  };

  const content = (
    <BaseRow gutter={[32, 32]}>
      <BaseCol span={24}>
        <BaseForm.Title>{t('profile.nav.payments.paymentMethod')}</BaseForm.Title>
      </BaseCol>
      <BaseCol span={24}>
        <BaseSpin spinning={loading}>
          <PaymentCardsWidget cards={cards} onCardRemove={handleCardRemove} onCardAdd={handleCardAdd} />
        </BaseSpin>
      </BaseCol>
    </BaseRow>
  );

  return isTablet ? content : <BaseCard>{content}</BaseCard>;
};
