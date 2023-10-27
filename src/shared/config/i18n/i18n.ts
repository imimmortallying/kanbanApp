import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n

  .use(Backend) // вообще, задают переводы в этом файле. У меня их тут нет, потому что они подтягиваются из public/locales, 
  // это позволит потом добавить асинхронную подрузку переводов, когда будет несколько страниц
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: __IS_DEV__,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

  });

export default i18n;