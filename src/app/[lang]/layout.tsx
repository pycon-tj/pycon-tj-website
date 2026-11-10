import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Golos_Text, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Providers from "@/components/Providers";
import { I18nProvider } from "@/i18n/I18nProvider";
import { hasLocale, locales } from "@/i18n/config";
import { getDict } from "@/content";
import { toClientDict } from "@/i18n/clientDict";

// Tajik needs Cyrillic Extended (ғ ӣ қ ӯ ҳ ҷ). Unicode-range means each visitor only
// downloads the subsets their language uses. Golos is the one text + heading face.
const golos = Golos_Text({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-golos",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return {
    // Absolute URLs for canonical / hreflang. Set NEXT_PUBLIC_SITE_URL to the real domain in production.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: d.meta.title,
    description: d.meta.description,
    icons: {
      icon: "/assets/python-logo.svg",
      shortcut: "/assets/python-logo.svg",
      apple: "/assets/python-logo.svg",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/" },
    },
    openGraph: {
      title: `${d.site.name} ${d.site.year}`,
      description: d.meta.description,
      type: "website",
      locale: lang,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  viewportFit: "cover",
};

/**
 * Sets data-theme before first paint: light by default, dark only when the visitor
 * chose it with the toggle — so there's no flash of the wrong theme.
 */
const themeScript = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='dark'?'dark':'light'}catch(e){}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html
      lang={lang}
      data-theme="light"
      suppressHydrationWarning
      className={`${golos.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          {dict.ui.skip}
        </a>
        <I18nProvider locale={lang} dict={toClientDict(dict)}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
