
import React from 'react';
import * as S from './MainHeader.styles';
import { WithChildrenProps } from '../../../../../common/types/generalTypes';

interface MainHeaderProps extends WithChildrenProps {
  isTwoColumnsLayout: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ isTwoColumnsLayout, children }) => {
  return <S.Header $isTwoColumnsLayoutHeader={isTwoColumnsLayout}>{children}</S.Header>;
};
