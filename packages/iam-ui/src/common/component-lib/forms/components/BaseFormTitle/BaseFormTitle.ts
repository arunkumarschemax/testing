import styled from 'styled-components';
import { BaseTypography } from '../../../BaseTypography/BaseTypography';
import { media } from '../../../../../common/styles/themes/constants';

export const BaseFormTitle = styled(BaseTypography.Text)`
  font-weight: 700;
  font-size: 1rem;
  display: block;

  @media only screen and ${media.md} {
    font-size: 1.125rem;
  }
`;
