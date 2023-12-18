import React, { useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { BaseButton } from '../../../BaseButton/BaseButton';
import { BaseBadge } from '../../../BaseBadge/BaseBadge';
import { notifications as fetchedNotifications, Notification } from '../../../../../api/notifications.api';
import { BasePopover } from '../../../BasePopover/BasePopover';
import { NotificationsOverlay } from './NotificationsOverlay/NotificationsOverlay';
import { HeaderActionWrapper } from '../../Header.styles';

export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(fetchedNotifications);
  const [isOpened, setOpened] = useState(false);

  return (
    <BasePopover
      trigger="click"
      content={<NotificationsOverlay notifications={notifications} setNotifications={setNotifications} />}
      onOpenChange={setOpened}
    >
      <HeaderActionWrapper>
        <BaseButton
          type={isOpened ? 'ghost' : 'text'}
          icon={
            <BaseBadge dot>
              <BellOutlined />
            </BaseBadge>
          }
        />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
