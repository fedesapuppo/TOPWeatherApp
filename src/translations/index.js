import en from './en';
import es from './es';

// Available languages
export const languages = {
  en,
  es
};

// Default language
export const defaultLang = 'es';

// Get translation by key for the current language
export function getTranslation(key, lang = defaultLang) {
  if (!languages[lang]) {
    console.warn(`Language ${lang} not found, falling back to ${defaultLang}`);
    lang = defaultLang;
  }

  return languages[lang][key] || languages[defaultLang][key] || key;
}

export default {
  languages,
  defaultLang,
  getTranslation
};