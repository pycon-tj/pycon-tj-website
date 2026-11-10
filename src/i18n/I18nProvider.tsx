"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Dict } from "@/content/en";
import type { Locale } from "./config";

type Ctx = { locale: Locale; dict: Dict };
const I18nContext = createContext<Ctx | null>(null);

/**
 * In development, report reads of dictionary sections that the server did not
 * send (see toClientDict) instead of failing with a vague "undefined" error.
 */
function guard(dict: Dict): Dict {
  if (process.env.NODE_ENV === "production") return dict;
  return new Proxy(dict, {
    get(target, key, receiver) {
      if (typeof key === "string" && !(key in target) && key !== "then" && key !== "$$typeof" && key !== "toJSON") {
        console.error(`[i18n] "${key}" was not sent to the browser. Add it to toClientDict() in src/i18n/clientDict.ts.`);
      }
      return Reflect.get(target, key, receiver);
    },
  });
}

/** Provides the current locale's dictionary (passed in from the server layout). */
export function I18nProvider({ locale, dict, children }: Ctx & { children: ReactNode }) {
  const value = useMemo(() => ({ locale, dict: guard(dict) }), [locale, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useDict must be used inside <I18nProvider>");
  return ctx;
}

/** The current language's content (hero, about, ui strings, …). */
export const useDict = () => useI18n().dict;
export const useLocale = () => useI18n().locale;
