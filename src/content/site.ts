/**
 * Global site content for PyCon Tajikistan.
 * Everything a non-developer may need to edit lives in /src/content.
 * Values marked TBA / placeholder must be confirmed before launch —
 * never replace them with invented dates, venues or numbers.
 */

export const site = {
  name: "PyCon Tajikistan",
  shortName: "PyCon TJ",
  year: 2026,
  edition: "No. 01",
  city: "Dushanbe",
  country: "Tajikistan",
  organiser: "Softclub",
  dateLabel: "To be announced · 2026",
  coordinates: "38.5598° N · 68.7870° E · UTC+5",
  description:
    "PyCon Tajikistan — the first Python conference in Tajikistan. Dushanbe, 2026. Organised by Softclub.",
};

export type NavItem = { id: string; label: string; num: string };

/** Main navigation. `id` must match the section's id attribute. */
export const nav: NavItem[] = [
  { id: "about", label: "About", num: "02" },
  { id: "speakers", label: "Speakers", num: "04" },
  { id: "heritage", label: "Heritage", num: "07" },
  { id: "venue", label: "Venue", num: "08" },
];

/** Extra links shown only in the full-screen mobile menu. */
export const mobileExtraNav: NavItem[] = [];

export const hero = {
  badge: "First Python Conference in Tajikistan",
  // Each entry is one line of the H1. Segments let us style single words.
  headline: [
    [{ text: "The future" }],
    [{ text: "of " }, { text: "Python", style: "gold" }],
    [{ text: "starts " }, { text: "here.", style: "serif" }],
  ] as { text: string; style?: "gold" | "serif" }[][],
  lead: "Bringing together developers, engineers, educators, and technology enthusiasts for the first Python conference in Tajikistan.",
  primaryCta: "Get your ticket",
  secondaryCta: { label: "Explore conference", href: "#about" },
  meta: [
    { label: "Date", value: "To be announced · 2026" },
    { label: "Location", value: "Dushanbe, Tajikistan" },
    { label: "Edition", value: "No. 01" },
  ],
  sceneHint: "Move your cursor · Click the Python",
  statueAlt:
    "The Ismail Somoni monument in Dushanbe: the bronze statue raising a crowned sceptre beneath a golden arch",
};

export const marquee = ["Python", "Пайтон", "Dushanbe", "Душанбе", "import this", "2026"];

/** Copy for the modal opened by every ticket / register button. */
export const ticketModal = {
  eyebrow: "Registration",
  title: { before: "Tickets open", em: "soon" },
  body: "Registration for the first PyCon Tajikistan hasn't opened yet. Dates, ticket types and prices will be announced here first.",
  note: "No payment is taken on this site.",
  close: "Got it",
};
