import { createI18n } from 'vue-i18n';

const localization = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome to my app!',
      goodbye: 'Goodbye!',
    },
    es: {
      welcome: 'Bienvenue dans mon application!',
      goodbye: 'Au revoir!',
    },
  },
});

export { localization };
