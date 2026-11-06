"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  AdditiveBlending,
  SRGBColorSpace,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type SpriteMaterial,
} from "three";
import { STATUE, heroState, introTime, phases } from "./heroState";
import { girihHaloTexture, radialTexture, rayTexture } from "./textures";

const RAYS = 9;

/**
 * The real Ismail Somoni monument (statue.webp, sky removed), shown unaltered
 * on a plane. Everything else here is light around it: glow, rays, halo.
 */
export default function Monument() {
  const statueTex = useTexture("/assets/statue.webp", (t) => {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
  });
  const statueMat = useRef<MeshBasicMaterial>(null);
  const statue = useRef<Mesh>(null);
  const glowMat = useRef<SpriteMaterial>(null);
  const halo = useRef<Mesh>(null);
  const haloMat = useRef<MeshBasicMaterial>(null);
  const rays = useRef<Group>(null);
  const floorMat = useRef<MeshBasicMaterial>(null);

  const tex = useMemo(
    () => ({
      glow: radialTexture([
        [0, "rgba(255,226,170,.9)"],
        [0.22, "rgba(232,160,96,.42)"],
        [0.55, "rgba(120,20,40,.22)"],
        [1, "rgba(0,0,0,0)"],
      ]),
      floor: radialTexture([
        [0, "rgba(140,36,54,.55)"],
        [0.5, "rgba(48,10,20,.35)"],
        [1, "rgba(0,0,0,0)"],
      ]),
      halo: girihHaloTexture(1024),
      ray: rayTexture(),
    }),
    [],
  );
  useEffect(() => () => Object.values(tex).forEach((t) => t.dispose()), [tex]);

  const rayData = useMemo(
    () =>
      Array.from({ length: RAYS }, (_, k) => ({
        width: 0.6 + ((k * 37) % 10) / 8,
        rot: (k - (RAYS - 1) / 2) * 0.15 + (((k * 53) % 7) - 3) * 0.008,
        base: 0.05 + ((k * 29) % 8) / 100,
        seed: k * 1.7,
      })),
    [],
  );

  // Start the intro once the statue texture is ready.
  useEffect(() => {
    heroState.t0 = performance.now();
  }, []);

  useFrame(() => {
    const T = introTime();
    const { e1, e2 } = phases(T);
    const s = heroState.scroll;
    if (statueMat.current) statueMat.current.opacity = e1;
    if (statue.current) statue.current.position.y = (1 - e1) * -0.6;
    if (glowMat.current) glowMat.current.opacity = e1 * (0.86 + Math.sin(T * 0.8) * 0.08);
    if (floorMat.current) floorMat.current.opacity = e1;
    if (haloMat.current) haloMat.current.opacity = e2 * 0.11;
    if (halo.current) halo.current.rotation.z = T * 0.03 + s * 0.8;
    if (rays.current) {
      rays.current.rotation.z = Math.sin(T * 0.15) * 0.05;
      rays.current.children.forEach((g, i) => {
        const d = rayData[i];
        ((g.children[0] as Mesh).material as MeshBasicMaterial).opacity = e2 * d.base * (0.7 + 0.3 * Math.sin(T * 0.6 + d.seed));
      });
    }
  });

  return (
    <group>
      {/* Large additive glow (gold → burgundy) behind the arch */}
      <sprite position={[0, 0.5, -2.6]} scale={[17, 17, 1]} renderOrder={-3}>
        <spriteMaterial
          ref={glowMat}
          map={tex.glow}
          blending={AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0}
        />
      </sprite>

      {/* Slowly rotating girih halo */}
      <mesh ref={halo} position={[0, 1.4, -3.2]} renderOrder={-3}>
        <planeGeometry args={[13.5, 13.5]} />
        <meshBasicMaterial
          ref={haloMat}
          map={tex.halo}
          color="#c9a24a"
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Light rays falling from above the arch */}
      <group ref={rays} position={[0, STATUE.H / 2 + 0.3, -1.7]}>
        {rayData.map((d, i) => (
          <group key={i} rotation={[0, 0, d.rot]}>
            <mesh position={[0, -7, 0]} renderOrder={-2}>
              <planeGeometry args={[d.width, 14]} />
              <meshBasicMaterial
                map={tex.ray}
                transparent
                opacity={0}
                blending={AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Warm floor pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -STATUE.H / 2 + 0.08, 0.2]} renderOrder={-2}>
        <planeGeometry args={[34, 14]} />
        <meshBasicMaterial ref={floorMat} map={tex.floor} transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* The monument itself — drawn before particles and writing depth,
          so particles passing behind the arch are hidden (alphaTest). */}
      <mesh ref={statue} renderOrder={-1}>
        <planeGeometry args={[STATUE.W, STATUE.H]} />
        <meshBasicMaterial
          ref={statueMat}
          map={statueTex}
          transparent
          alphaTest={0.06}
          toneMapped={false}
          opacity={0}
        />
      </mesh>
    </group>
  );
}
