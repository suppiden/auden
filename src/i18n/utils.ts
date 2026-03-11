import { en } from './en';
import { es } from './es';

export const languages = { en, es } as const;
export type Lang = keyof typeof languages;

export function getTranslations(lang: Lang) {
  return languages[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return 'en';
}

export function getAlternateUrl(currentUrl: URL, targetLang: Lang): string {
  const [, maybeLang, ...rest] = currentUrl.pathname.split('/');
  const isLangPrefix = maybeLang in languages;

  if (targetLang === 'en') {
    // en is at root — strip any lang prefix
    return '/' + (isLangPrefix ? rest.join('/') : currentUrl.pathname.slice(1));
  }
  // other lang — add prefix
  const path = isLangPrefix ? rest.join('/') : currentUrl.pathname.slice(1);
  return `/${targetLang}/${path}`;
}
