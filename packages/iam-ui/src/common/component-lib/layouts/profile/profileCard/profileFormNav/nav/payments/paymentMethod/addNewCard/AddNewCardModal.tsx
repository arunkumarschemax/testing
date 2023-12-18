import React from 'react';
import { BaseModal } from '../../../../../../../../BaseModal/BaseModal';
import { PaymentForm } from '../paymentForm/PaymentForm/PaymentForm';
import { PaymentCard } from '../../../../../../../../../utils/interfaces';

interface PaymentModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onCardAdd: (card: PaymentCard) => void;
}

export const AddNewCardModal: React.FC<PaymentModalProps> = ({ isModalOpen, closeModal, onCardAdd }) => {
  return (
    <BaseModal destroyOnClose size="small" open={isModalOpen} onCancel={closeModal} footer={null} closable={false}>
      <PaymentForm closeModal={closeModal} onFormFinish={onCardAdd} />
    </BaseModal>
  );
};
