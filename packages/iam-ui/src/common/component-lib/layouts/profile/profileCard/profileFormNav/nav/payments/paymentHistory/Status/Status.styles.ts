import { BaseTag } from '../../../../../../../../BaseTag/BaseTag';
import { media } from '../../../../../../../../../styles/themes/constants';
import styled from 'styled-components';

export const StatusTag = styled(BaseTag)`
  padding: 0.375rem 0;
  min-width: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  @media only screen and ${media.md} {
    min-width: 6.5rem;
  }
`;
