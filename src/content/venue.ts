/**
 * 08 — Venue, 09 — Final CTA, Footer.
 * ⚠️ Venue name, address and contacts are PLACEHOLDERS until confirmed.
 */
export const venue = {
  eyebrow: "08 — Venue",
  city: "Dushanbe",
  cityLocal: "Душанбе · Tajikistan",
  lead: "The capital of Tajikistan, set in the Hisor valley beneath the mountains — a city of wide avenues, plane trees and tea houses.",
  details: [
    { label: "Venue", value: "To be announced", placeholder: true },
    { label: "Address", value: "To be announced", placeholder: true },
    { label: "Airport", value: "Dushanbe International", note: "DYU" },
    { label: "Time zone", value: "UTC+5", note: "Tajikistan Time" },
    { label: "Languages", value: "Tajik · Russian · English" },
  ] as { label: string; value: string; note?: string; placeholder?: boolean }[],
  map: {
    tag: "Map placeholder",
    pinTitle: "Venue TBA",
    pinText: "Exact location will be published with the venue.",
    river: "Dushanbinka",
    linkLabel: "Open in maps",
    // City-level link only — replace with the venue's map link once confirmed.
    href: "https://www.google.com/maps/search/?api=1&query=Dushanbe%2C%20Tajikistan",
  },
};

export const finalCta = {
  eyebrow: "09 — Join us",
  title: { before: "Be part of ", em: "the beginning." },
  text: "Join the community shaping the future of Python in Tajikistan.",
  cta: "Register",
  secondary: { label: "Back to top", href: "#top" },
};

export const footer = {
  tagline: "The first Python conference in Tajikistan. Where heritage meets technology.",
  columns: [
    {
      title: "Conference",
      links: [
        { label: "About", href: "#about" },
        { label: "Highlights", href: "#highlights" },
        { label: "Speakers", href: "#speakers" },
        { label: "Schedule", href: "#schedule" },
      ],
    },
    {
      title: "Experience",
      links: [
        { label: "Workshops", href: "#workshops" },
        { label: "Heritage", href: "#heritage" },
        { label: "Venue", href: "#venue" },
      ],
    },
  ],
  // ⚠️ PLACEHOLDER contacts — replace with real channels before launch.
  contacts: [
    { label: "Email", value: "To be announced" },
    { label: "Telegram", value: "To be announced" },
    { label: "Instagram", value: "To be announced" },
  ],
  organiser: "Softclub",
  trademark:
    "“Python” and the Python logos are trademarks or registered trademarks of the Python Software Foundation.",
};
