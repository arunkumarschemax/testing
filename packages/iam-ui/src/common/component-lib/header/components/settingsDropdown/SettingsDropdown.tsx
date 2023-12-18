import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { SettingsOverlay } from './settingsOverlay/SettingsOverlay/SettingsOverlay';
import { BaseButton } from '../../../BaseButton/BaseButton';
import { BasePopover } from '../../../BasePopover/BasePopover';
import { HeaderActionWrapper } from '../../Header.styles';

export const SettingsDropdown: React.FC = () => {
  const [isOpened, setOpened] = useState(false);

  return (
    <BasePopover content={<SettingsOverlay />} trigger="click" onOpenChange={setOpened}>
      <HeaderActionWrapper>
        <BaseButton type={isOpened ? 'ghost' : 'text'} icon={<SettingOutlined />} />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
