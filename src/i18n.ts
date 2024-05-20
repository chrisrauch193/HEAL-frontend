// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';
import translationEN from './locales/en/translation.json';
import translationJP from './locales/jp/translation.json';

const getDeviceLanguage = () => {
  if (Platform.OS === 'ios') {
    const locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
    return locale ? locale.split('_')[0] : 'en';
  } else if (Platform.OS === 'android') {
    return NativeModules.I18nManager.localeIdentifier.split('_')[0];
  } else {
    // For web platform
    return navigator.language.split('-')[0]; // Uses the browser's language setting
  }
};

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  jp: {
    translation: translationJP
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(), // Detect and set the device language
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export const changeLanguage = (languageCode: string) => {
  i18n.changeLanguage(languageCode);
};

export default i18n;
