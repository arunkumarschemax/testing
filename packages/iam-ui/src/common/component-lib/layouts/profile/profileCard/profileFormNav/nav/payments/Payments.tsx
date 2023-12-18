import React, { useMemo } from 'react';
import { PaymentHistory } from './paymentHistory/PaymentHistory/PaymentHistory';
import { PaymentMethod } from './paymentMethod/PaymentMethod';
import { BaseCard } from '../../../../../../BaseCard/BaseCard';
import { BaseCol } from '../../../../../../BaseCol/BaseCol';
import { BaseRow } from '../../../../../../BaseRow/BaseRow';
import { useResponsive } from '../../../../../../../hooks/useResponsive';

export const Payments: React.FC = () => {
  const { isTablet } = useResponsive();

  const content = useMemo(
    () => (
      <BaseRow gutter={[0, 30]}>
        <BaseCol span={24}>
          <PaymentMethod />
        </BaseCol>
        <BaseCol span={24}>
          <PaymentHistory />
        </BaseCol>
      </BaseRow>
    ),
    [],
  );

  return isTablet ? <BaseCard>{content}</BaseCard> : content;
};
