"use client";

import { useId, useState } from "react";
import type { Speaker } from "@/content/speakers";
import { useDict } from "@/i18n/I18nProvider";
import { useSectionMotion } from "@/lib/sectionMotion";
import { useCardTilt } from "@/lib/cardTilt";
import { Ph, SectionHeading } from "../ui/SectionHeading";
import { ArchOutline, StarRosette } from "../ui/Ornaments";
import { LinkButton } from "../ui/Button";

function Portrait({ s, index }: { s: Speaker; index: number }) {
  return (
    <div className="dark-island relative aspect-[4/4.3] overflow-hidden bg-[radial-gradient(70%_60%_at_50%_32%,#4d1424,#1a0e12_80%)]">
      <div aria-hidden className="girih-bg absolute -inset-[20%] opacity-[.13] [background-size:68px] transition-transform duration-[1400ms] ease-lux group-hover:rotate-[8deg] group-hover:scale-110" />
      {/* Ornamental arch */}
      <ArchOutline className="absolute inset-x-[14%] bottom-0 top-[9%] h-[91%] w-[72%] text-gold-hi/45" strokeWidth={1.4} />
      <div className="absolute inset-x-[19%] bottom-0 top-[14%] overflow-hidden rounded-t-full bg-[radial-gradient(60%_50%_at_50%_30%,rgb(241_214_142/0.22),transparent_70%)]">
        {s.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.photo} alt={s.name} className="size-full object-cover object-top" loading="lazy" />
        ) : (
          <svg viewBox="0 0 100 120" aria-hidden className="absolute inset-x-0 bottom-0 w-full transition-transform duration-700 ease-lux group-hover:translate-y-[-3%]">
            <defs>
              <linearGradient id={`sil-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c9a24a" stopOpacity=".6" />
                <stop offset="1" stopColor="#5b1426" stopOpacity=".95" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="46" r="17" fill={`url(#sil-${index})`} />
            <path d="M12 120c0-26 17-44 38-44s38 18 38 44Z" fill={`url(#sil-${index})`} />
          </svg>
        )}
      </div>
      <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.18em] text-gold">S.{String(index + 1).padStart(2, "0")}</span>
      <span className="absolute right-3 top-3 rounded-full border border-gold/40 bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold-hi backdrop-blur">
        {s.topic}
      </span>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,var(--color-ink-2),transparent)]" />
    </div>
  );
}

function SpeakerCard({ s, index }: { s: Speaker; index: number }) {
  const { ui } = useDict();
  const [open, setOpen] = useState(false);
  const tilt = useCardTilt<HTMLElement>();
  const bioId = useId();
  return (
    <div data-reveal className="min-w-0 [perspective:1100px]">
      <article
        ref={tilt}
        data-open={open}
        className="group relative h-full overflow-hidden border border-ivory/12 bg-ink-2 transition-[border-color] duration-500 hover:border-[var(--line)] data-[open=true]:border-[var(--line)]"
      >
        <Portrait s={s} index={index} />
        <div className="relative px-6 pb-6 pt-5">
          <h3 className="font-display text-[19px] font-semibold">{s.name}</h3>
          <p className="mt-1 text-[14px] text-gold">{s.role}</p>
          <div
            id={bioId}
            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-lux group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-data-[open=true]:grid-rows-[1fr]"
          >
            <p className="overflow-hidden text-[14.5px] leading-[1.65] text-[var(--ivory-dim)]">
              <span className="block pt-4">{s.bio}</span>
            </p>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={bioId}
            onClick={() => setOpen((o) => !o)}
            className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ivory-dim)] transition-colors hover:text-ivory"
          >
            <span aria-hidden className="grid size-5 place-items-center rounded-full border border-gold/50 text-gold transition-transform duration-500 group-data-[open=true]:rotate-45">
              +
            </span>
            {open ? ui.hideBio : ui.readBio}
          </button>
        </div>
      </article>
    </div>
  );
}

export default function Speakers() {
  const { speakers, speakersSection, cfp } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  return (
    <section ref={ref} id="speakers" aria-labelledby="speakers-title" className="relative overflow-hidden py-[clamp(96px,12vw,170px)]">
      <div aria-hidden data-speed="0.4" className="pointer-events-none absolute -left-40 top-40 size-[460px] text-gold opacity-[.05]">
        <StarRosette className="size-full" strokeWidth={0.5} />
      </div>
      <div className="wrap relative">
        <SectionHeading
          id="speakers-title"
          eyebrow={speakersSection.eyebrow}
          title={speakersSection.title}
          aside={<Ph>{speakersSection.badge}</Ph>}
          lead={speakersSection.lead}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s, i) => (
            <SpeakerCard key={i} s={s} index={i} />
          ))}

          {/* Call for proposals */}
          <div data-reveal className="h-full min-w-0">
            <div className="dark-island relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden border border-[var(--line)] bg-[linear-gradient(160deg,#41101e,#1d0f13_75%)] p-7 sm:p-8">
              <div aria-hidden className="absolute -bottom-24 -right-24 size-72 text-gold-hi opacity-[.14]">
                <StarRosette className="size-full animate-[spin-slow_90s_linear_infinite]" strokeWidth={0.6} />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{cfp.kicker}</p>
                  <Ph>{cfp.status}</Ph>
                </div>
                <h3 className="mt-8 font-display text-[clamp(26px,2.6vw,36px)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
                  {cfp.title.before}{" "}
                  <em className="font-serif text-[1.15em] font-semibold normal-case italic text-gold-hi">{cfp.title.em}</em>
                </h3>
                <p className="mt-5 text-[15px] text-[var(--ivory-dim)]">{cfp.text}</p>
                <p className="mt-6 font-mono text-[12.5px] text-gold-hi/80">
                  <span className="text-gold">$</span> git commit -m &quot;my first talk&quot;
                </p>
              </div>
              <LinkButton href={cfp.cta.href} size="sm" variant="outline" className="relative mt-8 h-auto min-h-11 max-w-full self-start whitespace-normal py-3 text-left">
                {cfp.cta.label}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
