
import { Badge as AntBadge } from 'antd';
import styled from 'styled-components';
import { NotificationType } from '../BaseNotification/BaseNotification';
import { defineColorBySeverity } from '../../utils/utils';

interface BadgeProps {
  severity?: NotificationType;
}

export const Badge = styled(AntBadge)<BadgeProps>`
  color: inherit;

  & .ant-badge-count {
    background: ${(props) => defineColorBySeverity(props.severity)};
  }
`;
