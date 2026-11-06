"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { AdditiveBlending, ExtrudeGeometry, Path, Shape, type Group, type SpriteMaterial } from "three";
import { heroState, introTime, phases, pyPos, type Layout } from "./heroState";
import { radialTexture } from "./textures";

/**
 * Official Python logo, upper (blue) snake — absolute coordinates on the
 * 110-unit grid of the PSF "Python logo notext" artwork (y down).
 */
type Cmd = ["M" | "L", number, number] | ["C", number, number, number, number, number, number];
const SNAKE: Cmd[] = [
  ["M", 54.919, 0.001],
  ["C", 50.335, 0.022, 45.958, 0.413, 42.106, 1.095],
  ["C", 30.76, 3.099, 28.7, 7.295, 28.7, 15.032],
  ["L", 28.7, 25.251],
  ["L", 55.513, 25.251],
  ["L", 55.513, 28.657],
  ["L", 18.638, 28.657],
  ["C", 10.845, 28.657, 4.022, 33.341, 1.888, 42.251],
  ["C", -0.574, 52.464, -0.683, 58.837, 1.888, 69.501],
  ["C", 3.794, 77.439, 8.345, 83.095, 16.138, 83.095],
  ["L", 25.356, 83.095],
  ["L", 25.356, 70.845],
  ["C", 25.356, 61.995, 33.013, 54.189, 42.106, 54.189],
  ["L", 68.887, 54.189],
  ["C", 76.342, 54.189, 82.294, 48.051, 82.294, 40.564],
  ["L", 82.294, 15.033],
  ["C", 82.294, 7.767, 76.164, 2.308, 68.888, 1.095],
  ["C", 64.282, 0.328, 59.502, -0.02, 54.919, 0.001],
];
const EYE = { x: 40.419, y: 13.345, r: 5.06 };
/** Centre of the 180° rotation that produces the second (gold) snake. */
const CX = 55.5;
const CY = 55.88;

function snakeShape(rotated: boolean) {
  // Optional 180° rotation about (CX, CY), then centre on the origin and flip y (SVG → three).
  const T = (x: number, y: number): [number, number] => {
    const [a, b] = rotated ? [2 * CX - x, 2 * CY - y] : [x, y];
    return [a - CX, -(b - CY)];
  };
  const s = new Shape();
  for (const c of SNAKE) {
    if (c[0] === "M") s.moveTo(...T(c[1], c[2]));
    else if (c[0] === "L") s.lineTo(...T(c[1], c[2]));
    else {
      const [, x1, y1, x2, y2, x, y] = c as ["C", number, number, number, number, number, number];
      s.bezierCurveTo(...T(x1, y1), ...T(x2, y2), ...T(x, y));
    }
  }
  const eye = new Path();
  const [ex, ey] = T(EYE.x, EYE.y);
  eye.absarc(ex, ey, EYE.r, 0, Math.PI * 2, true);
  s.holes.push(eye);
  return s;
}

const EXTRUDE = {
  depth: 9,
  bevelEnabled: true,
  bevelThickness: 2.6,
  bevelSize: 2.0,
  // Pull the outline in a little so the bevel doesn't close the gap between the two snakes.
  bevelOffset: -1.1,
  bevelSegments: 6,
  curveSegments: 48,
};

export default function PythonLogo({ layout }: { layout: Layout }) {
  const holder = useRef<Group>(null);
  const spinner = useRef<Group>(null);
  const glowMat = useRef<SpriteMaterial>(null);
  const spinNow = useRef(0);

  const [blueGeo, goldGeo] = useMemo(() => {
    return [false, true].map((r) => {
      const g = new ExtrudeGeometry(snakeShape(r), EXTRUDE);
      g.translate(0, 0, -EXTRUDE.depth / 2);
      g.computeVertexNormals();
      return g;
    });
  }, []);
  const glowTex = useMemo(
    () =>
      radialTexture([
        [0, "rgba(241,214,142,.5)"],
        [0.4, "rgba(201,120,60,.16)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    [],
  );
  useEffect(
    () => () => {
      blueGeo.dispose();
      goldGeo.dispose();
      glowTex.dispose();
    },
    [blueGeo, goldGeo, glowTex],
  );

  useFrame((_, dt) => {
    const T = introTime();
    const { e2 } = phases(T);
    const fly = 1 - e2;
    const { x: sx, y: sy } = heroState.smooth;
    const s = heroState.scroll;
    const [bx, by, bz] = layout.py;

    spinNow.current += (heroState.spin - spinNow.current) * Math.min(1, dt * 3.2);

    const h = holder.current!;
    h.position.set(bx + fly * 3.2, by + Math.sin(T * 0.9) * 0.12 - fly * 2.6, bz + fly * 3);
    h.scale.setScalar(layout.pyScale * (0.35 + 0.65 * e2));
    pyPos.copy(h.position);

    // Gentle float + tilt towards the cursor + click spin + scroll turn + intro spin
    spinner.current!.rotation.set(
      sy * 0.28 + Math.sin(T * 0.5) * 0.06,
      -0.42 + Math.sin(T * 0.4) * 0.3 + sx * 0.55 + spinNow.current + fly * 4.5 + s * 2.6,
      Math.sin(T * 0.3) * 0.05 - sx * 0.06,
    );
    if (glowMat.current) glowMat.current.opacity = e2 * 0.85;
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    document.documentElement.dataset.cursor = "hover";
  };
  const out = () => {
    document.body.style.cursor = "";
    delete document.documentElement.dataset.cursor;
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!heroState.reduced) heroState.spin += Math.PI * 2;
  };

  return (
    <group ref={holder}>
      <sprite scale={[210, 210, 1]} renderOrder={1}>
        <spriteMaterial ref={glowMat} map={glowTex} blending={AdditiveBlending} transparent depthWrite={false} opacity={0} />
      </sprite>
      <group ref={spinner} onPointerOver={over} onPointerOut={out} onClick={click}>
        <mesh geometry={blueGeo}>
          <meshPhysicalMaterial
            color="#0f2f8f"
            metalness={0.7}
            roughness={0.32}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh geometry={goldGeo}>
          <meshPhysicalMaterial
            color="#f2c35e"
            metalness={1}
            roughness={0.24}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
            envMapIntensity={1.8}
          />
        </mesh>
      </group>
    </group>
  );
}
