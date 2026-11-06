"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dict } from "@/content/en";
import type { Locale } from "./config";

type Ctx = { locale: Locale; dict: Dict };
const I18nContext = createContext<Ctx | null>(null);

/** Provides the current locale's dictionary (passed in from the server layout). */
export function I18nProvider({ locale, dict, children }: Ctx & { children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, dict }}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useDict must be used inside <I18nProvider>");
  return ctx;
}

/** The current language's content (hero, about, ui strings, …). */
export const useDict = () => useI18n().dict;
export const useLocale = () => useI18n().locale;
