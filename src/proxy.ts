import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, type Locale } from "./i18n/config";

/** Pick the best supported locale from Accept-Language (e.g. "ru-RU,ru;q=0.9,en;q=0.8"). */
function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.split("-")[0], q: q ? parseFloat(q.split("=")[1]) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) {
    if (base === "tj") return "tg"; // common mistaken code for Tajik
    if (hasLocale(base)) return base;
  }
  return null;
}

/**
 * Only runs on "/": sends visitors to /en, /ru or /tg.
 * A remembered manual choice (cookie) wins over the browser's language.
 */
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    (saved && hasLocale(saved) ? saved : null) ??
    fromAcceptLanguage(request.headers.get("accept-language")) ??
    defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: ["/"] };
