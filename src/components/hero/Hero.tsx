"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/i18n/I18nProvider";
import { useReducedMotion } from "@/lib/motion";
import { whenIdle } from "@/lib/sectionMotion";
import { TicketButton, LinkButton } from "../ui/Button";
import TajikFlag from "../ui/TajikFlag";
import { heroState } from "./heroSignals";

gsap.registerPlugin(ScrollTrigger);

// three.js + R3F are split into their own chunk and only load on the client.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export default function Hero() {
  const { hero, site, ui } = useDict();
  const section = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mountScene, setMountScene] = useState(false);
  const [live, setLive] = useState(false);

  // Poster first: the static statue paints with the HTML (fast LCP). The 3D scene — and
  // ~1 MB of three.js — loads only when it can run: on touch devices after the first
  // scroll/touch, elsewhere once the page has loaded and gone idle. No WebGL → poster stays.
  useEffect(() => {
    if (!supportsWebGL()) return;
    const start = () => {
      heroState.fromPoster = true;
      setMountScene(true);
    };
    if (window.matchMedia("(pointer: coarse)").matches) {
      const events = ["touchstart", "pointerdown", "wheel", "scroll", "keydown"] as const;
      const go = () => {
        events.forEach((e) => window.removeEventListener(e, go));
        start();
      };
      events.forEach((e) => window.addEventListener(e, go, { passive: true }));
      return () => events.forEach((e) => window.removeEventListener(e, go));
    }
    let cancel = () => {};
    const onLoad = () => {
      cancel = whenIdle(start, 1500);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      cancel();
    };
  }, []);

  // Pointer + scroll feed the 3D scene (no React re-renders).
  useEffect(() => {
    if (reduced) {
      heroState.pointer.x = heroState.pointer.y = 0;
      heroState.scroll = 0;
      return;
    }
    const onMove = (e: PointerEvent) => {
      heroState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      heroState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const h = section.current?.offsetHeight || window.innerHeight;
      heroState.scroll = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  // Copy drifts up and fades as the hero scrolls away (desktop).
  useEffect(() => {
    if (reduced || !copy.current || !section.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 64rem)", () => {
      gsap.to(copy.current, {
        yPercent: -12,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-[radial-gradient(60%_70%_at_50%_30%,rgb(140_38_58/0.5),transparent_70%),linear-gradient(180deg,#1a0d12_0%,#2a0d17_45%,#140c0f_100%)] lg:min-h-[max(720px,100svh)] lg:bg-[radial-gradient(55%_70%_at_72%_45%,rgb(140_38_58/0.55),transparent_70%),radial-gradient(35%_40%_at_72%_28%,rgb(241_214_142/0.16),transparent_70%),linear-gradient(180deg,#1a0d12_0%,#2a0d17_45%,#140c0f_100%)]"
    >
      {/* Girih lattice, masked to the scene */}
      <div
        aria-hidden
        className="girih-bg absolute -inset-[10%] opacity-[.05] [mask-image:radial-gradient(60%_55%_at_50%_35%,#000,transparent)] lg:[mask-image:radial-gradient(60%_60%_at_72%_45%,#000,transparent)]"
      />

      {/* 3D stage — full-bleed behind the text on desktop, on top on mobile */}
      <div className="relative h-[65svh] min-h-[440px] max-h-[760px] [container-type:size] lg:absolute lg:inset-0 lg:h-auto lg:max-h-none">
        {/* Poster: the same monument image, placed exactly where the 3D statue lands; fades once 3D is live */}
        {/* eslint-disable-next-line @next/next/no-img-element -- the monument is shown unaltered */}
        <img
          src="/assets/statue.webp"
          alt={hero.statueAlt}
          width={736}
          height={1104}
          fetchPriority="high"
          decoding="async"
          className="hero-poster pointer-events-none absolute z-[1] max-w-none transition-opacity duration-1000 ease-lux"
          style={{ opacity: live ? 0 : 1 }}
        />
        {mountScene && <HeroScene reduced={reduced} onReady={() => setLive(true)} />}
      </div>

      {/* Legibility shades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--color-ink)_0%,transparent_22%)] lg:bg-[linear-gradient(90deg,rgb(20_12_15/0.92)_0%,rgb(20_12_15/0.66)_32%,transparent_58%),linear-gradient(0deg,var(--color-ink)_0%,transparent_20%)]"
      />

      <div className="wrap pointer-events-none relative z-10 -mt-6 pb-16 sm:-mt-10 lg:mt-0 lg:flex lg:min-h-[max(720px,100svh)] lg:flex-col lg:justify-center lg:pb-28 lg:pt-28">
        <div ref={copy} className="pointer-events-auto max-w-[640px] lg:max-w-[min(640px,47%)]">
          <p
            className="intro-fade inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-ink/45 py-2 pl-2 pr-4 text-[13px] backdrop-blur-md"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          >
            <TajikFlag />
            {hero.badge}
          </p>

          <h1
            id="hero-title"
            className="mb-6 mt-6 font-display text-[clamp(38px,10.5vw,64px)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] lg:mb-7 lg:mt-7 lg:text-[clamp(44px,5.1vw,88px)]"
          >
            {hero.headline.map((line, i) => (
              <span key={i} className="intro-line" style={{ "--i": i } as React.CSSProperties}>
                <span>
                  {line.map((seg, j) =>
                    seg.style === "gold" ? (
                      <span key={j} className="text-gold-sheen">
                        {seg.text}
                      </span>
                    ) : seg.style === "serif" ? (
                      <em
                        key={j}
                        className="font-serif text-[1.08em] font-semibold normal-case italic tracking-[-0.01em] text-gold-hi"
                      >
                        {seg.text}
                      </em>
                    ) : (
                      <span key={j}>{seg.text}</span>
                    ),
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="intro-fade max-w-[46ch] text-[clamp(16px,1.4vw,19px)] text-[var(--ivory-dim)]"
            style={{ "--d": "0.75s" } as React.CSSProperties}
          >
            {hero.lead}
          </p>

          <div className="intro-fade mt-9 flex flex-wrap gap-3.5" style={{ "--d": "0.9s" } as React.CSSProperties}>
            <TicketButton>{hero.primaryCta}</TicketButton>
            <LinkButton href={hero.secondaryCta.href} arrow="↓">
              {hero.secondaryCta.label}
            </LinkButton>
          </div>

          <dl
            className="intro-fade mt-12 grid max-w-[640px] grid-cols-1 border-t border-[var(--line)] xs:grid-cols-[auto_auto_auto] xs:justify-start"
            style={{ "--d": "1.05s" } as React.CSSProperties}
          >
            {hero.meta.map((m, i) => (
              <div
                key={m.label}
                className={`pt-3.5 xs:pr-5 sm:pr-6 ${i > 0 ? "xs:border-l xs:border-[var(--line)] xs:pl-5 sm:pl-6" : ""}`}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{m.label}</dt>
                <dd className="mt-1 text-[15px] font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>

          <p
            className="intro-fade mt-7 font-mono text-[11px] tracking-[0.14em] text-[var(--ivory-dim)] lg:hidden"
            style={{ "--d": "1.15s" } as React.CSSProperties}
          >
            {site.coordinates}
          </p>
        </div>
      </div>

      {/* Desktop-only furniture */}
      <p
        aria-hidden
        className="intro-fade absolute bottom-10 left-10 z-10 hidden font-mono text-[11px] tracking-[0.14em] text-[var(--ivory-dim)] lg:block xl:left-[max(40px,calc((100vw-1320px)/2+40px))]"
        style={{ "--d": "1.2s" } as React.CSSProperties}
      >
        {site.coordinates}
      </p>
      <p
        aria-hidden
        className="absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-ivory/40 [writing-mode:vertical-rl] lg:block"
      >
        {hero.sceneHint}
      </p>
      <div
        aria-hidden
        className="absolute bottom-10 right-10 z-10 hidden items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ivory-dim)] lg:flex"
      >
        {ui.scroll}
        <span className="relative h-14 w-px overflow-hidden bg-[var(--line)]">
          <span className="absolute -top-[40%] left-0 h-[40%] w-px animate-[cue_2.2s_cubic-bezier(.2,.7,.1,1)_infinite] bg-gold-hi" />
        </span>
      </div>
    </section>
  );
}

/** Cheap capability check before downloading three.js. */
function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}
