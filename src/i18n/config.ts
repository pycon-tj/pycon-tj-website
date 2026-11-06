/** Supported languages. URL prefix = locale code (/en, /ru, /tg). */
export const locales = ["en", "ru", "tg"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie that remembers a visitor's manual language choice (read by src/proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, { short: string; native: string }> = {
  en: { short: "EN", native: "English" },
  ru: { short: "RU", native: "Русский" },
  tg: { short: "TJ", native: "Тоҷикӣ" },
};

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);
