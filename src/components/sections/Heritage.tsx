"use client";

import { useDict } from "@/i18n/I18nProvider";
import { SectionHeading } from "../ui/SectionHeading";
import { HisorGate, IkatMotif, SevenStars, SuzaniRosette } from "../ui/Ornaments";

const ICONS = { stars: SevenStars, suzani: SuzaniRosette, atlas: IkatMotif, hisor: HisorGate };

/**
 * Calm Heritage: Tajik culture as a quiet identity — suzani, atlas/adras, Hisor
 * and the seven stars as small line icons, with one static atlas stripe.
 * (The 3D emblem lives on in heritage/Emblem3D.tsx but is no longer mounted.)
 */
export default function Heritage() {
  const { heritage } = useDict();
  return (
    <section id="heritage" aria-labelledby="heritage-title" className="border-t border-[var(--line)] py-20 sm:py-24">
      <div className="wrap">
        <SectionHeading id="heritage-title" eyebrow={heritage.eyebrow} title={heritage.title} lead={heritage.lead} />

        <div aria-hidden className="ikat-thin mb-10 rounded-full opacity-60" />

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {heritage.items.map((it) => {
            const Icon = ICONS[it.icon];
            return (
              <li key={it.name} className="min-w-0">
                <Icon className="size-11 text-gold" strokeWidth={1.8} />
                <h3 className="mt-4 text-[18px] font-semibold">
                  {it.name}
                  <span className="ml-2 text-[14px] font-normal text-[var(--ivory-dim)]">{it.local}</span>
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-[var(--ivory-dim)]">{it.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
