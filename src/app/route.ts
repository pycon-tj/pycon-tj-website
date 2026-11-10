import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, type Locale } from "@/i18n/config";

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
 * "/" sends visitors to /en, /ru or /tg.
 * A remembered manual choice (cookie) wins over the browser's language.
 * (A route handler rather than proxy/middleware: same redirect, and it deploys as a
 * plain serverless function — Netlify cannot bundle a Next 16 proxy built on Windows.)
 */
export function GET(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    (saved && hasLocale(saved) ? saved : null) ??
    fromAcceptLanguage(request.headers.get("accept-language")) ??
    defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url, 307);
}

