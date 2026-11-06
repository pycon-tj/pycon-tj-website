"use client";

import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import Monument from "./Monument";
import PythonLogo from "./PythonLogo";
import Particles from "./Particles";
import { STATUE, heroState, introTime, phases, type Layout } from "./heroState";
import { hero } from "@/content/site";

const FOV = 35;
const TAN = Math.tan(MathUtils.degToRad(FOV / 2));

/** Framing for desktop (scene on the right) and mobile (scene on top, centred). */
function computeLayout(w: number, h: number): Layout {
  const aspect = w / Math.max(h, 1);
  const mobile = typeof window !== "undefined" && window.innerWidth < 1024;
  if (!mobile) {
    const camZ = Math.max(STATUE.H / 0.8 / 2 / TAN, 12);
    const halfW = TAN * camZ * aspect;
    const rigX = MathUtils.clamp(halfW * 0.45, 2.8, 8.5);
    return {
      mobile,
      camZ,
      rig: [rigX, -0.3, 0],
      py: [1.45, -2.0, 2.6],
      pyScale: 0.0195,
      ring: { rx: 4.3, rz: 2.1, y: -3.6 },
    };
  }
  // Mobile/tablet: keep the whole statue visible with a little air around it.
  const camZ = Math.max(STATUE.H / 0.84 / 2 / TAN, (STATUE.W + 1.6) / 2 / (TAN * aspect));
  return {
    mobile,
    camZ,
    rig: [0, -0.45, 0],
    py: [2.0, 2.65, 2.2],
    pyScale: 0.0145,
    ring: { rx: 3.7, rz: 1.8, y: -3.6 },
  };
}

function Scene({ touch, onReady }: { touch: boolean; onReady?: () => void }) {
  const readySent = useRef(false);
  const size = useThree((s) => s.size);
  const layout = useMemo(() => computeLayout(size.width, size.height), [size.width, size.height]);
  const rig = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  // Reduced motion renders on demand: draw a few frames once the scene is ready.
  useEffect(() => {
    if (!heroState.reduced) return;
    const id = setInterval(() => invalidate(), 200);
    const stop = setTimeout(() => clearInterval(id), 2400);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, [invalidate, layout]);

  useFrame(({ camera }) => {
    const T = introTime();
    const { dolly } = phases(T);
    // Tell the Hero once the first real frame (statue texture loaded) is on screen.
    if (!readySent.current && heroState.t0 >= 0) {
      readySent.current = true;
      requestAnimationFrame(() => onReady?.());
    }
    const sm = heroState.smooth;
    const k = heroState.reduced ? 1 : 0.05;
    sm.x += (heroState.pointer.x - sm.x) * k;
    sm.y += (heroState.pointer.y - sm.y) * k;
    const s = heroState.scroll;
    const par = layout.mobile ? 0.3 : 0.85;
    // Intro dolly from far away + cursor parallax + scroll push-in
    camera.position.set(sm.x * par, -dolly * 1.6 - sm.y * 0.45 + s * 1.1, layout.camZ + dolly * 13 - s * 5);
    camera.lookAt(sm.x * 0.15, s * 0.5, 0);
  });

  return (
    <>
      <ambientLight intensity={0.3} color="#ffe8cc" />
      <directionalLight position={[-4, 6, 8]} intensity={2.4} color="#ffe2b0" />
      <pointLight position={[layout.rig[0] + 4, 1, 1]} intensity={2.4} decay={0} color="#ff5a6e" />
      <pointLight position={[-6, -3, 5]} intensity={1.1} decay={0} color="#7aa2ff" />

      {/* Procedural studio for metal reflections — no HDR download */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#24100f"]} />
        {/* Front panels (behind the camera) — what the logo's front faces reflect */}
        <Lightformer form="rect" intensity={1.1} color="#ffd9a0" position={[0, 1, 9]} scale={[16, 7, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={5} color="#fff4dc" position={[4, 2, 7]} scale={[1.6, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#f1d68e" position={[-5, -2, 7]} scale={[2, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3.2} color="#ffe2b0" position={[0, 5, -5]} scale={[12, 2.5, 1]} />
        <Lightformer form="ring" intensity={2.2} color="#f1d68e" position={[-5, 1.5, 3]} scale={3} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} color="#c2334d" position={[6, 0, 0]} rotation-y={-Math.PI / 2} scale={[7, 7, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#5f7dff" position={[-6, -2, 1]} rotation-y={Math.PI / 2} scale={[5, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, -4, 4]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
      </Environment>

      <group ref={rig} position={layout.rig}>
        <Monument />
        <PythonLogo layout={layout} />
        <Particles layout={layout} touch={touch} />
      </group>
    </>
  );
}

class GLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function StatueFallback() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- the statue must be shown unaltered
    <img
      src="/assets/statue.webp"
      alt={hero.statueAlt}
      width={736}
      height={1104}
      className="absolute inset-x-0 bottom-0 top-[12%] mx-auto h-[84%] w-auto object-contain drop-shadow-[0_30px_60px_rgb(0_0_0/0.6)] lg:left-auto lg:right-[8%] lg:top-[11%] lg:mx-0 lg:h-[80%]"
    />
  );
}

/**
 * The full hero canvas. Lazy-loaded (client only) by Hero.
 * Pauses rendering when the hero is off screen; falls back to the static
 * statue image when WebGL is unavailable or the scene throws.
 */
export default function HeroScene({ reduced, onReady }: { reduced: boolean; onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [env] = useState(() => ({
    gl: hasWebGL(),
    touch: window.matchMedia("(pointer: coarse)").matches,
  }));

  // Layout effect runs before the first animation frame, so frame one already uses the right mode.
  useLayoutEffect(() => {
    heroState.reduced = reduced;
  }, [reduced]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!env.gl) return <StatueFallback />;

  return (
    <div ref={wrap} className="absolute inset-0">
      <GLBoundary fallback={<StatueFallback />}>
        <Canvas
          className="!absolute inset-0"
          frameloop={!visible ? "never" : reduced ? "demand" : "always"}
          dpr={[1, env.touch ? 1.5 : 2]}
          camera={{ fov: FOV, near: 0.1, far: 200, position: [0, 0, 30] }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          aria-hidden
        >
          <Suspense fallback={null}>
            <Scene touch={env.touch} onReady={onReady} />
          </Suspense>
        </Canvas>
      </GLBoundary>
    </div>
  );
}
