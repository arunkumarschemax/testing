import styled from 'styled-components';
import { media } from '../../../../../styles/themes/constants';
import { BaseTypography } from './../../../../BaseTypography/BaseTypography';
import { BaseDivider } from './../../../../BaseDivider/BaseDivider';

export const Text = styled(BaseTypography.Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 0.875rem;
  font-weight: 600;

  & > a {
    display: block;
  }

  @media only screen and ${media.md} {
    font-size: 1rem;
  }
`;

export const ItemsDivider = styled(BaseDivider)`
  margin: 0;
`;
