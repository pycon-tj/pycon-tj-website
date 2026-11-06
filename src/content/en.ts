/**
 * English dictionary — assembled from the per-section English files in this folder
 * (site.ts, about.ts, highlights.ts, …). Edit English copy in those files.
 * ru.ts and tg.ts mirror this exact shape; TypeScript flags any missing key.
 */
import { site, nav, mobileExtraNav, hero, marquee, ticketModal } from "./site";
import { about } from "./about";
import { highlights } from "./highlights";
import { speakersSection, speakers, cfp } from "./speakers";
import { scheduleSection, days, type Track } from "./schedule";
import { workshopsSection, workshops, type Level } from "./workshops";
import { heritage } from "./heritage";
import { venue, finalCta, footer } from "./venue";

export const en = {
  meta: {
    title: "PyCon Tajikistan 2026 · Where Heritage Meets Technology",
    description: site.description,
  },
  site,
  nav,
  mobileExtraNav,
  hero,
  marquee,
  ticketModal,
  about,
  highlights,
  speakersSection,
  speakers,
  cfp,
  scheduleSection,
  days,
  trackLabels: {
    Keynote: "Keynote",
    Core: "Core",
    Web: "Web",
    Data: "Data",
    ML: "ML",
    Community: "Community",
    Workshop: "Workshop",
  } as Record<Track, string>,
  workshopsSection,
  workshops,
  levelLabels: { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" } as Record<Level, string>,
  heritage,
  venue,
  finalCta,
  footer,
  ui: {
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    siteMenu: "Site menu",
    primaryNav: "Primary",
    mobileNav: "Mobile",
    register: "Register",
    backToTopAria: "PyCon Tajikistan — back to top",
    logoAlt: "PyCon Dushanbe 2026 — official logo",
    scroll: "Scroll",
    readBio: "Read bio",
    hideBio: "Hide bio",
    copy: "Copy",
    copied: "Copied",
    copyAria: "Copy command:",
    commandCopied: "Command copied",
    duration: "Duration",
    seats: "Seats",
    placeholder: "Placeholder",
    placeholderValues: "Placeholder values",
    phNote: "PH = placeholder · edit src/content/highlights.ts",
    tracks: "Tracks",
    conferenceDays: "Conference days",
    notToScale: "Stylised · not to scale",
    opensMapsSr: "(opens Google Maps for Dushanbe in a new tab)",
    contact: "Contact",
    organisedBy: "Organised by",
    edition: "Edition",
    closeDialog: "Close dialog",
    replAria: "Python REPL: from tajikistan import dushanbe … pycon.status returns 'the beginning'",
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
};

export type Dict = typeof en;
