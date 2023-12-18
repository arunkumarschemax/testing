import styled from 'styled-components';
import { BaseLayout } from '../../../BaseLayout/BaseLayout';
import { media } from '../../../../../common/styles/themes/constants';

export const LayoutMaster = styled(BaseLayout)`
  height: 100vh;
`;

export const LayoutMain = styled(BaseLayout)`
  @media only screen and ${media.md} {
    margin-left: 80px;
  }

  @media only screen and ${media.xl} {
    margin-left: unset;
  }
`;
