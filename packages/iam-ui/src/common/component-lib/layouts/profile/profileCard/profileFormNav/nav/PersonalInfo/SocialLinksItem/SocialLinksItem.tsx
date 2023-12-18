import React from 'react';
import { useTranslation } from 'react-i18next';
import { TwitterOutlined } from '@ant-design/icons';
import { BaseButtonsForm } from '../../../../../../../forms/BaseButtonsForm/BaseButtonsForm';
import { ClipboardInput } from '../../../../../../../inputs/ClipboardInput/ClipboardInput';
import { OpenURLInput } from '../../../../../../../inputs/OpenURLInput/OpenURLInput';
import { LinkedinIcon } from '../../../../../../../icons/LinkedinIcon';
import { FacebookIcon } from '../../../../../../../icons/FacebookIcon';
import { websitePattern } from '../../../../../../../../constants/patterns';
import { BaseRow } from '../../../../../../../BaseRow/BaseRow';
import { BaseCol } from '../../../../../../../BaseCol/BaseCol';

export const SocialLinksItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item label={t('profile.nav.personalInfo.socialLinks')}>
      <BaseRow gutter={[20, 0]}>
        <BaseCol xs={24} md={12}>
          <BaseButtonsForm.Item shouldUpdate>
            {({ getFieldValue }) => {
              const twitter = getFieldValue('twitter');

              return (
                <label>
                  <BaseButtonsForm.Item name="twitter">
                    <ClipboardInput valueToCopy={twitter} addonBefore={<TwitterOutlined />} />
                  </BaseButtonsForm.Item>
                </label>
              );
            }}
          </BaseButtonsForm.Item>
        </BaseCol>
        <BaseCol xs={24} md={12}>
          <BaseButtonsForm.Item shouldUpdate>
            {({ getFieldValue }) => {
              const linkedin = getFieldValue('linkedin');

              return (
                <label>
                  <BaseButtonsForm.Item
                    name="linkedin"
                    rules={[
                      {
                        pattern: new RegExp(websitePattern),
                        message: t('profile.nav.personalInfo.notValidWebsite'),
                      },
                    ]}
                  >
                    <OpenURLInput href={linkedin} target="_blank" addonBefore={<LinkedinIcon />} />
                  </BaseButtonsForm.Item>
                </label>
              );
            }}
          </BaseButtonsForm.Item>
        </BaseCol>
        <BaseCol xs={24} md={12}>
          <BaseButtonsForm.Item shouldUpdate>
            {({ getFieldValue }) => {
              const facebook = getFieldValue('facebook');

              return (
                <label>
                  {' '}
                  <BaseButtonsForm.Item
                    name="facebook"
                    rules={[
                      {
                        pattern: new RegExp(websitePattern),
                        message: t('profile.nav.personalInfo.notValidWebsite'),
                      },
                    ]}
                  >
                    <OpenURLInput href={facebook} target="_blank" addonBefore={<FacebookIcon />} />
                  </BaseButtonsForm.Item>
                </label>
              );
            }}
          </BaseButtonsForm.Item>
        </BaseCol>
      </BaseRow>
    </BaseButtonsForm.Item>
  );
};
