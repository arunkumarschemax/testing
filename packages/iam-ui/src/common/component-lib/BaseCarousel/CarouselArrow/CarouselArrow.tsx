import React from 'react';
import { CustomArrowProps } from 'react-slick';
import * as S from './CarouselArrow.styles';
import { WithChildrenProps } from '../../../types/generalTypes';

export const CarouselArrow: React.FC<WithChildrenProps<CustomArrowProps>> = ({ children, ...props }) => {
  return <S.ArrowWrapper {...props}>{children}</S.ArrowWrapper>;
};
