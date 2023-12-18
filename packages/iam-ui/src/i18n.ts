import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translationEN } from './locales/en/translation';
import { translationTEIn } from './locales/te-IN/translation';

const resources = {
  en: {
    translation: translationEN,
  },
  'te-IN': {
    translation: translationTEIn,
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
