import i18next from 'i18next';
import en from './locales/en.json';
import es from './locales/es.json';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
});
