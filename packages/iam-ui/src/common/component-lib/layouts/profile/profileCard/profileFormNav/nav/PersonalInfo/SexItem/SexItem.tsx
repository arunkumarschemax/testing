import React from 'react';
import { useTranslation } from 'react-i18next';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { BaseButtonsForm } from '../../../../../../..//forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '../../../../../../..//selects/BaseSelect/BaseSelect';
import { BaseSpace } from '../../../../../../..//BaseSpace/BaseSpace';

export const SexItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="sex" label={t('profile.nav.personalInfo.sex')}>
      <BaseSelect>
        <Option value="male">
          <BaseSpace align="center">
            <ManOutlined />
            {t('profile.nav.personalInfo.male')}
          </BaseSpace>
        </Option>
        <Option value="female">
          <BaseSpace align="center">
            <WomanOutlined />
            {t('profile.nav.personalInfo.female')}
          </BaseSpace>
        </Option>
      </BaseSelect>
    </BaseButtonsForm.Item>
  );
};
