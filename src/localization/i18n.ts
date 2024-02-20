import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const english = require('./en.json');
const arabic = require('./ar.json');

// "Inline" English and Arabic translations.
// We can localize to any language and any number of languages.
const resources = {
    en: english,
    ar: arabic,
};
i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});
export default i18next;
