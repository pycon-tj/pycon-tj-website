import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Unbounded, Cormorant_Garamond, Golos_Text, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Providers from "@/components/Providers";
import { I18nProvider } from "@/i18n/I18nProvider";
import { hasLocale, locales } from "@/i18n/config";
import { getDict } from "@/content";

// Tajik needs Cyrillic Extended (ғ ӣ қ ӯ ҳ ҷ). Unicode-range means each visitor only
// downloads the subsets their language uses; only the display face is preloaded.
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

const golos = Golos_Text({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-golos",
  display: "swap",
  preload: false,
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
      shortcut: "/assets/icon-256.png",
      apple: "/assets/icon-256.png",
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
  themeColor: "#141012",
  viewportFit: "cover",
};

/**
 * Sets data-theme before first paint (saved choice → system preference → dark),
 * so there's no flash of the wrong theme.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html
      lang={lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${unbounded.variable} ${cormorant.variable} ${golos.variable} ${jetbrains.variable}`}
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
        <I18nProvider locale={lang} dict={dict}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
