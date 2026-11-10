import type { Dict } from "@/content/en";

/** Copy of `obj` without `keys`. */
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const out = { ...obj };
  for (const k of keys) delete out[k];
  return out;
}

/**
 * The part of the dictionary the browser receives.
 *
 * The server layout passes the dictionary to <I18nProvider> (a client component),
 * so everything in it is serialized into the page source. Only the content the
 * current homepage renders is sent: placeholder speakers, the sample agenda,
 * placeholder statistics, workshop details and internal notes stay on the server.
 *
 * Mounting another section again (Schedule, Workshops, Highlights, Marquee…)?
 * Add the keys it reads below — in development, <I18nProvider> logs an error
 * naming any key a component reads that was not sent.
 */
export function toClientDict(d: Dict): Dict {
  // Fields inside kept sections that the homepage does not render.
  const about = omit(d.about, ["repl"]); // old code-window demo
  const speakersSection = omit(d.speakersSection, ["lead"]); // refers to placeholder speaker cards
  const ui = omit(d.ui, ["phNote", "placeholderValues"]); // internal note + Highlights-only label

  const sent = {
    site: d.site,
    nav: d.nav,
    mobileExtraNav: d.mobileExtraNav,
    hero: d.hero,
    ticketModal: d.ticketModal,
    about,
    speakersSection,
    cfp: d.cfp,
    heritage: d.heritage,
    venue: d.venue,
    finalCta: d.finalCta,
    footer: d.footer,
    ui,
  };
  // Typed as the full Dict so unmounted components still type-check; see the dev guard in I18nProvider.
  return sent as unknown as Dict;
}
