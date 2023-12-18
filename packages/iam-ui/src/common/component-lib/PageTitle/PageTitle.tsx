import React from 'react';
import { Helmet } from 'react-helmet-async';
import { WithChildrenProps } from '../../types/generalTypes';

export const PageTitle: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | Lightence Admin</title>
    </Helmet>
  );
};
