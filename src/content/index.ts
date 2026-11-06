import type { Locale } from "@/i18n/config";
import { en, type Dict } from "./en";
import { ru } from "./ru";
import { tg } from "./tg";

export type { Dict };

const dictionaries: Record<Locale, Dict> = { en, ru, tg };

/** Full content dictionary for a locale (server side; passed to the client provider). */
export const getDict = (locale: Locale): Dict => dictionaries[locale];
