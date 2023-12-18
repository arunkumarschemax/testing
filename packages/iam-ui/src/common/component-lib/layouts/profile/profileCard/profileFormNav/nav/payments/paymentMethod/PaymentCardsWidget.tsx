import React from 'react';
import { PaymentCard as IPaymentCard } from '../../../../../../../../utils/interfaces';
import { BaseCol } from '../../../../../../../BaseCol/BaseCol';
import { BaseRow } from '../../../../../../../BaseRow/BaseRow';
import { useResponsive } from '../../../../../../../../hooks/useResponsive';
import { ActionButtons } from './ActionButtons/ActionButtons';
import { PaymentCard } from './PaymentCard/PaymentCard';
import { AddNewCardButton } from './addNewCard/AddNewCardButton/AddNewCardButton';

interface PaymentCardsWidgetProps {
  cards: IPaymentCard[];
  onCardRemove: (cardNumber: string) => void;
  onCardAdd: (card: IPaymentCard) => void;
}

export const PaymentCardsWidget: React.FC<PaymentCardsWidgetProps> = ({ cards, onCardRemove, onCardAdd }) => {
  const { useMediaQuery } = useResponsive();

  const breakpoint = 659.98; // calculated manually according to default card size (290px) and other factors
  const isBreakpoint = useMediaQuery({ query: `(min-width: ${breakpoint}px)` });

  const justify = isBreakpoint ? 'start' : 'space-around';

  return (
    <BaseRow justify={justify} gutter={[16, 16]}>
      {cards.map((card) => (
        <BaseCol key={card.number}>
          <PaymentCard cardData={card}>
            <ActionButtons onRemove={() => onCardRemove(card.number)} />
          </PaymentCard>
        </BaseCol>
      ))}
      <BaseCol>
        <AddNewCardButton onCardAdd={onCardAdd} />
      </BaseCol>
    </BaseRow>
  );
};
