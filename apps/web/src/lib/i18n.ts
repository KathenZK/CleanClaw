export type Lang = "zh" | "en";
export const locales: Lang[] = ["zh", "en"];
export const defaultLang: Lang = "zh";
export const siteUrl = "https://www.cleanclaw.icu";

export function normalizeLang(value?: string | null): Lang {
  return value === "en" ? "en" : defaultLang;
}

export function isLang(value: string): value is Lang {
  return locales.includes(value as Lang);
}

export function getLocalizedPath(lang: Lang, path = "/") {
  if (path === "/") {
    return `/${lang}`;
  }

  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}
