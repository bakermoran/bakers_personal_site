import { ui, defaultLang, type LangCodes } from "./ui";
import { enUS, fr } from "date-fns/locale";
import { format as formatDateFns } from "date-fns";

/**
 * Get the language from a pathname. If it does not contain a valid language, return the default language.
 * @param pathname The pathname to get the language from. Pass `Astro.originPathname` so `fallbackType: "rewrite"` doesn't mask the real locale.
 */
export function getLangFromUrl(pathname: string) {
  const [, lang] = pathname.split("/");
  if (lang in ui) return lang as LangCodes;
  return defaultLang;
}

/**
 * Get the translation function for the given language.
 * @param lang The language to get the translation function for.
 */
export function useTranslations(lang: LangCodes) {
  return function t(
    key: keyof (typeof ui)[typeof defaultLang],
    params?: Record<string, string | number>,
  ) {
    const str = ui[lang][key] || ui[defaultLang][key];
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => {
      return k in params ? String(params[k]) : `{${k}}`;
    });
  };
}

/**
 * Get the localized path for the given language and path.
 * @param lang The language to get the localized path for.
 * @param path The path to localize.
 */
export function getLocalizedPath(lang: LangCodes, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${lang}` : `/${lang}${normalized}`;
}

/**
 * Get the path without the language prefix.
 * @param pathname The pathname to remove the language prefix from.
 */
export function currentPathWithoutLang(pathname: string) {
  const [, maybeLang, ...rest] = pathname.split("/");
  if (maybeLang && maybeLang in ui) {
    return `/${rest.join("/")}`;
  }
  return pathname;
}

/**
 * Get the date-fns locale for the given language.
 * @param currentLocale The language to get the locale for.
 */
function getLocale(currentLocale: LangCodes) {
  switch (currentLocale) {
    case "en":
      return enUS;
    case "fr":
      return fr;
    default:
      return enUS;
  }
}

/**
 * Format a date using date-fns with the given format string and locale.
 * @param date The date to format.
 * @param formatStr The format string to use.
 * @param localeString The language to use for the locale. Defaults to the default language.
 */
export function formatDate(date: Date, formatStr: string, localeString: LangCodes = defaultLang) {
  const locale = getLocale(localeString);
  return formatDateFns(date, formatStr, { locale });
}
