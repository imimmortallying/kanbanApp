import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n

  // .use(Backend) // вообще, задают переводы в этом файле. У меня их тут нет, потому что они подтягиваются из public/locales, 
  // это позволит потом добавить асинхронную подрузку переводов, когда будет несколько страниц
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: __IS_DEV__,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          "Новая группа": "Add group",
          "Перевести": "Translate",
          "Добавить задачу": "Add task",
          "Поиск": "Find a task",
          "Все":"All",
          "Текущие":"Current",
          "Выполненные":"Done",
          "Фильтрация задач по выполнению": "Filtering tasks by completion",
          "Фильтрация задач по важности": "Filtering tasks by importance",
          "Важно и срочно": "important and urgent",
          "Важно и не срочно": "important and not urgent",
          "Срочно и не важно": "urgent and not important",
          "Не срочно и не важно": "not urgent and not important",
          "Не выбран": "not selected",
          "Выбери статус": "select status"
        }
      },
      ru: {
        translation: {
          "Новая группа": "Новая группа",
          "Перевести": "Перевести",
          "Добавить задачу": "Добавить задачу",
          "Поиск": "Найти задачууууууууууууууууууу",
          "Все":"Все",
          "Текущие":"Текущие",
          "Выполненные":"Выполненные",
          "Фильтрация задач по выполнению": "Фильтрация задач по выполнению",
          "Фильтрация задач по важности": "Фильтрация задач по важности",
          "Важно и срочно": "важно и срочно",
          "Важно и не срочно": "важно и не срочно",
          "Срочно и не важно": "срочно и не важно",
          "Не срочно и не важно": "не срочно и не важно",
          "Не выбран": "не выбран",
          "Выбери статус": "выбери статус"
        }
      }
    }

  });

export default i18n;