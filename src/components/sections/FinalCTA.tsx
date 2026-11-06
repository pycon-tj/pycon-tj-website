"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/motion";
import { useSectionMotion } from "@/lib/sectionMotion";
import { LinkButton, TicketButton } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/** Three nested arches in the Hisor/Somoni silhouette; they draw themselves on scroll. */
function Arches() {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = svg.current;
    if (!el || prefersReducedMotion()) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-draw]"));
    const ctx = gsap.context(() => {
      paths.forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: `top ${92 - i * 6}%`, end: "center 55%", scrub: 0.8 },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <svg
      ref={svg}
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMax meet"
      className="pointer-events-none absolute bottom-0 left-1/2 h-[92%] max-h-[860px] w-auto -translate-x-1/2"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="cta-door" cx="50%" cy="100%" r="70%">
          <stop offset="0" stopColor="#f1d68e" stopOpacity=".24" />
          <stop offset="1" stopColor="#f1d68e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M150 800V360c0-82 67-150 150-150s150 68 150 150v440Z" fill="url(#cta-door)" />
      <path data-draw d="M10 800V300C10 140 140 10 300 10s290 130 290 290v500" stroke="rgb(241 214 142 / .45)" strokeWidth="1.5" />
      <path data-draw d="M70 800V320c0-127 103-230 230-230s230 103 230 230v480" stroke="rgb(241 214 142 / .25)" strokeWidth="1" />
      <path data-draw d="M150 800V360c0-82 67-150 150-150s150 68 150 150v440" stroke="rgb(241 214 142 / .35)" strokeWidth="1" strokeDasharray="2 6" />
      {/* crown at the keystone */}
      <path data-draw d="M270 10l10-22 20 14 20-14 10 22" stroke="rgb(241 214 142 / .6)" strokeWidth="1.5" />
    </svg>
  );
}

const DUST = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${20 + ((i * 53) % 70)}%`,
  size: 2 + (i % 3),
  dur: 5 + (i % 5),
  delay: (i % 7) * 0.6,
}));

export default function FinalCTA() {
  const { finalCta } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      className="dark-island grain relative overflow-hidden bg-[radial-gradient(60%_80%_at_50%_100%,#6d1a2e_0%,var(--color-wine-deep)_55%,var(--color-ink)_100%)] py-[clamp(120px,15vw,220px)] text-center"
    >
      <div aria-hidden data-speed="0.25" className="girih-bg pointer-events-none absolute inset-0 opacity-[.05] [background-size:110px]" />
      <Arches />
      {DUST.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full bg-gold-hi shadow-[0_0_10px_var(--color-gold-hi)]"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: 0.5,
            animation: `float-y ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}

      <div className="wrap relative">
        <p data-reveal className="eyebrow justify-center">
          {finalCta.eyebrow}
        </p>
        <h2
          id="cta-title"
          data-reveal
          className="mx-auto mt-8 max-w-[14ch] font-display text-[clamp(40px,8vw,128px)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em]"
        >
          {finalCta.title.before}
          <em className="mt-2 block font-serif text-[1.08em] font-semibold normal-case italic tracking-[-0.01em] text-gold-hi">
            {finalCta.title.em}
          </em>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-[44ch] text-[clamp(17px,1.6vw,21px)] text-[var(--ivory-dim)]">
          {finalCta.text}
        </p>
        <div data-reveal className="mt-11 flex flex-wrap justify-center gap-3.5">
          <TicketButton>{finalCta.cta}</TicketButton>
          <LinkButton href={finalCta.secondary.href} arrow="↑">
            {finalCta.secondary.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
