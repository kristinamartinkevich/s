import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en.json';
import translationRU from './ru.json';

i18next
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        resources: {
            en: {
                translation: translationEN,
            },
            ru: {
                translation: translationRU,
            },
        },
    });

export default i18next;
