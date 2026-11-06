"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/i18n/I18nProvider";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/motion";
import { useSectionMotion } from "@/lib/sectionMotion";
import { TitleText } from "../ui/SectionHeading";
import { Chorkhona, HisorGate, IkatMotif, SuzaniRosette, ArchOutline } from "../ui/Ornaments";

gsap.registerPlugin(ScrollTrigger);

const ICONS = { chorkhona: Chorkhona, suzani: SuzaniRosette, atlas: IkatMotif, hisor: HisorGate };
const LAYERS = [100, 70.7, 50, 35.4]; // % — each square inscribed in the previous one, turned 45°

/** Interactive 3D CSS chorkhona: layers separate in depth as the section scrolls, tilt with the pointer. */
function ChorkhonaStack() {
  const { heritage } = useDict();
  const stage = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stack.current;
    const el = stage.current;
    if (!st || !el) return;
    if (prefersReducedMotion()) {
      st.style.setProperty("--sep", "0.6");
      return;
    }
    const trig = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 20%",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        // Layers lift apart over the first 60% of the scroll, then stay separated.
        const k = Math.min(1, p / 0.6);
        const eased = k * k * (3 - 2 * k);
        st.style.setProperty("--sep", eased.toFixed(3));
        st.style.setProperty("--spin", `${(p * 40).toFixed(2)}deg`);
      },
    });
    let onMove: ((e: PointerEvent) => void) | null = null;
    if (!isCoarsePointer()) {
      onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        st.style.setProperty("--tx", `${52 - y * 18}deg`);
        st.style.setProperty("--tz", `${x * 24}deg`);
      };
      el.addEventListener("pointermove", onMove);
    }
    return () => {
      trig.kill();
      if (onMove) el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <figure data-reveal className="relative mx-auto w-full max-w-[360px] sm:max-w-[540px]">
      <div ref={stage} className="chork-stage relative aspect-square">
        <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(241_214_142/0.18),transparent_65%)] blur-2xl" />
        <div ref={stack} className="chork-stack" style={{ "--sep": 0, "--spin": "0deg" } as React.CSSProperties}>
          {LAYERS.map((s, i) => (
            <div
              key={i}
              className="chork-layer"
              style={{
                width: `${s * 0.78}%`,
                height: `${s * 0.78}%`,
                background:
                  i % 2
                    ? "linear-gradient(135deg, rgb(60 22 30 / .92), rgb(30 12 16 / .95))"
                    : "linear-gradient(135deg, rgb(91 20 38 / .9), rgb(48 10 20 / .92))",
                transform: `translate(-50%, -50%) translateZ(calc(var(--sep) * ${i * 64}px)) rotate(calc(${i * 45}deg + var(--spin) * ${(0.5 + i * 0.12).toFixed(2)}))`,
              }}
            >
              <span aria-hidden className="girih-bg absolute inset-0 opacity-[.12] [background-size:48px]" />
              <span aria-hidden className="absolute inset-[6%] border border-gold-hi/25" />
            </div>
          ))}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-[16%] rounded-full bg-[radial-gradient(circle,#fff6d8,var(--color-gold-hi)_38%,transparent_72%)]"
            style={{ transform: "translate(-50%, -50%) translateZ(calc(var(--sep) * 230px))" }}
          />
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ivory-dim)]">
        {heritage.chorkhonaCaption}
      </figcaption>
    </figure>
  );
}

export default function Heritage() {
  const { heritage } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  const so = heritage.somoni;
  return (
    <section
      ref={ref}
      id="heritage"
      aria-labelledby="heritage-title"
      className="dark-island grain relative overflow-hidden bg-[linear-gradient(180deg,var(--color-wine-deep),#1b0a10_68%,var(--color-ink))] py-[clamp(96px,12vw,170px)]"
    >
      <div aria-hidden data-speed="0.3" className="girih-bg pointer-events-none absolute -inset-y-24 inset-x-0 opacity-[.06] [background-size:140px]" />

      <div className="wrap relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-[clamp(48px,6vw,96px)]">
          <ChorkhonaStack />
          <div className="min-w-0">
            <div data-reveal>
              <p className="eyebrow">{heritage.eyebrow}</p>
              <h2
                id="heritage-title"
                className="mt-5 font-display text-[clamp(32px,4.8vw,64px)] font-extrabold uppercase leading-[1.03] tracking-[-0.035em]"
              >
                <TitleText t={heritage.title} />
              </h2>
              <p className="mt-6 max-w-[54ch] text-[clamp(15px,1.3vw,18px)] text-[var(--ivory-dim)]">{heritage.lead}</p>
            </div>
            <ul className="mt-10 border-t border-[var(--line)]">
              {heritage.items.map((it) => {
                const Icon = ICONS[it.icon];
                return (
                  <li key={it.name} data-reveal className="group grid grid-cols-[56px_1fr] items-start gap-5 border-b border-[var(--line)] py-6 sm:grid-cols-[64px_1fr]">
                    <Icon className="size-14 text-gold transition-transform duration-1000 ease-lux group-hover:rotate-45 group-hover:scale-105 sm:size-16" strokeWidth={1.6} />
                    <div>
                      <h3 className="font-display text-[17px] font-semibold uppercase tracking-[0.03em]">
                        {it.name}
                        <span className="ml-2 font-serif text-[1.15em] normal-case italic tracking-normal text-gold-hi">{it.local}</span>
                      </h3>
                      <p className="mt-1.5 text-[15px] text-[var(--ivory-dim)]">{it.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Animated atlas / adras band */}
      <div data-reveal className="relative mt-[clamp(72px,9vw,120px)] h-[110px] overflow-hidden border-y border-[var(--line)] sm:h-[130px]">
        <div aria-hidden className="ikat-band" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_0%,transparent_14%,transparent_86%,var(--color-ink)_100%)]" />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-[var(--line)] bg-ink px-5 py-2.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-gold-hi">
          {heritage.ikatLabel}
        </p>
      </div>

      {/* Somoni note */}
      <div className="wrap relative mt-[clamp(72px,9vw,120px)]">
        <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr] sm:gap-[clamp(32px,5vw,72px)]">
          <div data-reveal className="relative mx-auto w-[clamp(170px,22vw,260px)] sm:mx-0">
            <div className="relative aspect-[3/4.2] overflow-hidden rounded-t-full border border-[var(--line)] bg-[radial-gradient(70%_60%_at_50%_30%,#f3d9a0,#b07a52_55%,#5b1426)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- the monument is shown unaltered */}
              <img src="/assets/statue.webp" alt={so.alt} width={736} height={1104} loading="lazy" className="absolute inset-x-0 bottom-0 h-[98%] w-full object-contain object-bottom" />
            </div>
            <ArchOutline className="pointer-events-none absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-gold/40" strokeWidth={1} />
          </div>
          <div data-reveal className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{so.kicker}</p>
            <blockquote className="mt-4 font-serif text-[clamp(26px,3.2vw,42px)] font-medium italic leading-[1.18] text-ivory">“{so.quote}”</blockquote>
            <p className="mt-5 max-w-[60ch] text-[15.5px] text-[var(--ivory-dim)]">{so.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
