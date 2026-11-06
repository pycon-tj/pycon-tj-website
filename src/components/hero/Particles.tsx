"use client";
/* eslint-disable react-hooks/immutability -- three.js position buffers are rewritten every frame by design */

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  QuadraticBezierCurve3,
  Vector3,
  type PointsMaterial,
  type Points,
  type SpriteMaterial,
} from "three";
import { CROWN, heroState, introTime, phases, pyPos, type Layout } from "./heroState";
import { dotTexture, radialTexture } from "./textures";

const THREAD = 110;

/** Seeded pseudo-random so the layout is stable between renders. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Gold particles: a stream from the crown in Somoni's raised hand to the Python,
 * a glow at the crown, an orbiting ring at the base of the arch, and rising dust.
 */
export default function Particles({ layout, touch }: { layout: Layout; touch: boolean }) {
  const RING = touch ? 700 : 1400;
  const DUST = touch ? 220 : 520;

  const dot = useMemo(() => dotTexture(), []);
  const crownTex = useMemo(
    () =>
      radialTexture(
        [
          [0, "rgba(255,246,214,1)"],
          [0.18, "rgba(241,214,142,.75)"],
          [0.5, "rgba(201,140,60,.18)"],
          [1, "rgba(0,0,0,0)"],
        ],
        128,
      ),
    [],
  );

  const data = useMemo(() => {
    const r = rng(7);
    const ringSeed = Float32Array.from({ length: RING }, () => r());
    const dust = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dust[i * 3] = (r() - 0.5) * 22;
      dust[i * 3 + 1] = (r() - 0.5) * 14;
      dust[i * 3 + 2] = (r() - 0.35) * 9;
    }
    const geo = (n: number, init?: Float32Array) => {
      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(init ?? new Float32Array(n * 3), 3));
      return g;
    };
    return {
      ringSeed,
      ringGeo: geo(RING),
      threadGeo: geo(THREAD),
      dustGeo: geo(DUST, dust),
      threadSeed: Float32Array.from({ length: THREAD }, () => r()),
    };
  }, [RING, DUST]);

  useEffect(
    () => () => {
      dot.dispose();
      crownTex.dispose();
      data.ringGeo.dispose();
      data.threadGeo.dispose();
      data.dustGeo.dispose();
    },
    [dot, crownTex, data],
  );

  const ringMat = useRef<PointsMaterial>(null);
  const threadMat = useRef<PointsMaterial>(null);
  const crownMat = useRef<SpriteMaterial>(null);
  const dust = useRef<Points>(null);
  const tmp = useMemo(
    () => ({ curve: new QuadraticBezierCurve3(new Vector3(), new Vector3(), new Vector3()), p: new Vector3() }),
    [],
  );

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const T = introTime();
    const { e3 } = phases(T);

    // Ring orbiting the base of the arch
    const rp = data.ringGeo.attributes.position.array as Float32Array;
    const { rx, rz, y } = layout.ring;
    const rot = T * 0.12;
    for (let i = 0; i < RING; i++) {
      const s = data.ringSeed[i];
      const a = s * Math.PI * 2 + rot * (1 + s * 0.15);
      const w = 1 + Math.sin(s * 90) * 0.06 + (1 - e3) * 0.6;
      rp[i * 3] = Math.cos(a) * rx * w;
      rp[i * 3 + 1] = y + Math.sin(a * 3 + s * 20) * 0.05 + Math.sin(a) * 0.5;
      rp[i * 3 + 2] = Math.sin(a) * rz * w;
    }
    data.ringGeo.attributes.position.needsUpdate = true;
    if (ringMat.current) ringMat.current.opacity = e3;

    // Stream: crown → Python
    const end = pyPos;
    const c = tmp.curve;
    c.v0.copy(CROWN);
    c.v1.set(
      (CROWN.x + end.x) / 2,
      Math.max(CROWN.y, end.y) + (layout.mobile ? 0.9 : 2.2),
      (CROWN.z + end.z) / 2 + 1,
    );
    c.v2.copy(end);
    const tp = data.threadGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < THREAD; i++) {
      const k = (i / THREAD + T * 0.11) % 1;
      c.getPoint(k, tmp.p);
      const j = Math.sin(i * 12.9 + T * 2) * 0.04 * (0.3 + data.threadSeed[i]);
      tp[i * 3] = tmp.p.x + j;
      tp[i * 3 + 1] = tmp.p.y + j * 0.7;
      tp[i * 3 + 2] = tmp.p.z;
    }
    data.threadGeo.attributes.position.needsUpdate = true;
    if (threadMat.current) threadMat.current.opacity = e3;
    if (crownMat.current) crownMat.current.opacity = e3 * (0.75 + Math.sin(T * 3) * 0.2);

    // Dust drifting upward
    if (!heroState.reduced) {
      const dp = data.dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST; i++) {
        dp[i * 3 + 1] += dt * 0.12 * (1 + (i % 5) * 0.2);
        if (dp[i * 3 + 1] > 7) dp[i * 3 + 1] = -7;
      }
      data.dustGeo.attributes.position.needsUpdate = true;
      if (dust.current) dust.current.rotation.y = T * 0.01;
    }
  });

  return (
    <>
      <points geometry={data.ringGeo} frustumCulled={false}>
        <pointsMaterial
          ref={ringMat}
          size={0.095}
          map={dot}
          color="#f1d68e"
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points geometry={data.threadGeo} frustumCulled={false}>
        <pointsMaterial
          ref={threadMat}
          size={0.15}
          map={dot}
          color="#ffe6ad"
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <sprite position={CROWN} scale={[1.1, 1.1, 1]}>
        <spriteMaterial ref={crownMat} map={crownTex} transparent opacity={0} blending={AdditiveBlending} depthWrite={false} />
      </sprite>
      <points ref={dust} geometry={data.dustGeo} frustumCulled={false}>
        <pointsMaterial
          size={0.05}
          map={dot}
          color="#e8c27a"
          transparent
          opacity={0.5}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
