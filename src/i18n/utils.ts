import { ui, defaultLang } from "./ui";
import { enUS, fr } from "date-fns/locale";
import { format as formatDateFns } from "date-fns";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: keyof typeof ui, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${lang}` : `/${lang}${normalized}`;
}

export function currentPathWithoutLang(pathname: string) {
  const [, maybeLang, ...rest] = pathname.split("/");
  if (maybeLang && maybeLang in ui) {
    return `/${rest.join("/")}`;
  }
  return pathname;
}

export function getLocale(currentLocale: keyof typeof ui) {
  switch (currentLocale) {
    case "en":
      return enUS;
    case "fr":
      return fr;
    default:
      return enUS;
  }
}

export function formatDate(
  date: Date,
  formatStr: string,
  localeString: keyof typeof ui = defaultLang,
) {
  const locale = getLocale(localeString);
  return formatDateFns(date, formatStr, { locale });
}
