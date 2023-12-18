import React from 'react';
import { PaymentCard as IPaymentCard } from '../../../../../../../../../utils/interfaces';
import * as S from './PaymentCard.styles';

interface PaymentCardProps {
  className?: string;
  cardData: IPaymentCard;
  children?: React.ReactNode;
}

const Cards = (props: IPaymentCard) => {
  return (
    <div>Cards</div>
  )
}
export const PaymentCard: React.FC<PaymentCardProps> = ({ className, cardData, children }) => (
  <S.Wrapper className={className} $background={cardData.background}>
    <Cards {...cardData} />
    {children}
  </S.Wrapper>
);
