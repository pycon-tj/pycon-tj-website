"use client";

/**
 * Нишон — the State Emblem of Tajikistan as a physical relief object.
 *
 * Geometry comes 1:1 from the official artwork (/assets/emblem-tajikistan.svg,
 * Wikimedia Commons): every path is extruded exactly as drawn — same outline,
 * position, colour and paint order. Bevels are inset (bevelOffset = −bevelSize)
 * so silhouettes never grow. Only materials, depth and lighting are added.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  CanvasTexture,
  Color,
  ExtrudeGeometry,
  MeshPhysicalMaterial,
  NeutralToneMapping,
  RepeatWrapping,
  type BufferGeometry,
  type Group,
} from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { emblemInput } from "./emblemInput";

export const EMBLEM_SRC = "/assets/emblem-tajikistan.svg";
const VIEW_W = 1211.5;
const VIEW_H = 1199;
const S = 3.95 / VIEW_W; // SVG units → world units

type Kind = "gold" | "engrave" | "rim" | "enamelRed" | "enamelWhite" | "fabric" | "cotton" | "cottonShade" | "leaf";

/** Roles of the paths in the official file (document order), checked against its bounding boxes. */
function kindOf(i: number, fill: string, strokeOnly: boolean): Kind {
  if (strokeOnly) return "rim"; // orange outlines of rays, sun and mountains
  if (i >= 183 && i <= 194) return "fabric"; // the four tricolour ribbons
  if (i >= 143 && i <= 162) return fill === "#adb3b5" ? "cottonShade" : "cotton";
  if (i >= 163 && i <= 166) return "leaf";
  switch (fill) {
    case "#f7bf00":
    case "#f3c843":
      return "gold";
    case "#d67144":
      return "engrave";
    case "#dc161d":
      return "enamelRed";
    case "#197b30":
      return "leaf";
    default:
      return "enamelWhite"; // mountain snow, leaf highlights
  }
}

/* ── Procedural surface detail (normal maps) ───────────────────────── */

function normalMapFrom(size: number, height: (x: number, y: number) => number, strength: number) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) h[y * size + x] = height(x, y);
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const img = g.createImageData(size, size);
  const at = (x: number, y: number) => h[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      const l = Math.hypot(dx, dy, 1);
      const o = (y * size + x) * 4;
      img.data[o] = ((-dx / l) * 0.5 + 0.5) * 255;
      img.data[o + 1] = ((-dy / l) * 0.5 + 0.5) * 255;
      img.data[o + 2] = ((1 / l) * 0.5 + 0.5) * 255;
      img.data[o + 3] = 255;
    }
  g.putImageData(img, 0, 0);
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  return t;
}

/** Plain weave: warp and weft threads alternating over / under. */
const weave = () =>
  normalMapFrom(
    64,
    (x, y) => {
      const p = 8;
      const over = (Math.floor(x / p) + Math.floor(y / p)) % 2 === 0;
      const warp = Math.sin((Math.PI * (x % p)) / p);
      const weft = Math.sin((Math.PI * (y % p)) / p);
      return over ? warp * 0.9 + weft * 0.15 : weft * 0.9 + warp * 0.15;
    },
    1.6,
  );

/** Soft fibrous noise for cotton. */
const fibre = () => {
  const n = 128;
  const seed = Array.from({ length: n * n }, (_, i) => Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1);
  const smooth = (x: number, y: number) => {
    let s = 0;
    for (let j = -2; j <= 2; j++) for (let k = -2; k <= 2; k++) s += seed[((y + j + n) % n) * n + ((x + k + n) % n)];
    return s / 25;
  };
  return normalMapFrom(n, (x, y) => smooth(x, y) + seed[y * n + x] * 0.25, 3);
};

/* ── Geometry ──────────────────────────────────────────────────────── */

const STEP = 0.42; // relief rise per paint-order step (SVG units)
const BASE = 6;

function buildGeometry(svgText: string) {
  const data = new SVGLoader().parse(svgText);
  const buckets = new Map<string, { kind: Kind; color: string; geos: BufferGeometry[] }>();

  data.paths.forEach((path, i) => {
    const style = (path.userData?.style ?? {}) as { fill?: string; strokeWidth?: number };
    const fillRaw = String(style.fill ?? "#000").toLowerCase();
    const strokeOnly = fillRaw === "#000" || fillRaw === "#000000" || fillRaw === "black";
    const kind = kindOf(i, fillRaw, strokeOnly);
    const color = kind === "rim" ? "#d67144" : fillRaw;
    const shapes = path.toShapes();
    if (!shapes.length) return;

    // Size-aware rounding: small parts get crisp edges, cotton gets soft domes.
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const p of shapes[0].getPoints(8)) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }
    const minDim = Math.max(1, Math.min(maxX - minX, maxY - minY));
    const front = BASE + i * STEP; // later in paint order → higher front face, so overlaps match the artwork
    let bs = Math.min(Math.max(minDim * 0.08, 0.4), kind === "cotton" ? 14 : kind === "fabric" ? 3 : 4);
    bs = Math.min(bs, minDim / 2.5);
    const bt = Math.min(kind === "cotton" ? bs * 1.1 : bs * 0.7, front / 3);
    const strokeHalf = kind === "rim" ? (Number(style.strokeWidth) || 4.7) / 2 : 0;

    const geo = new ExtrudeGeometry(shapes, {
      depth: Math.max(0.2, front - 2 * bt),
      curveSegments: kind === "cotton" ? 10 : 8,
      bevelEnabled: true,
      bevelSize: bs,
      bevelThickness: bt,
      bevelOffset: strokeHalf - bs, // never grow the outline (rims grow by exactly half the original stroke)
      bevelSegments: kind === "cotton" ? 6 : 3,
    });
    geo.translate(0, 0, bt); // back face sits on the base plane: a solid cast relief
    const key = `${kind}|${color}`;
    if (!buckets.has(key)) buckets.set(key, { kind, color, geos: [] });
    buckets.get(key)!.geos.push(geo.index ? geo.toNonIndexed() : geo);
  });

  return [...buckets.values()].map(({ kind, color, geos }) => {
    const merged = mergeGeometries(geos, false)!;
    geos.forEach((g) => g.dispose());
    return { kind, color, geometry: merged };
  });
}

function makeMaterial(kind: Kind, color: string, maps: { weave: CanvasTexture; fibre: CanvasTexture }) {
  const c = new Color(color);
  switch (kind) {
    case "gold":
      return new MeshPhysicalMaterial({ color: c, metalness: 1, roughness: 0.2, envMapIntensity: 1 });
    case "engrave":
    case "rim":
      return new MeshPhysicalMaterial({ color: c, metalness: 1, roughness: 0.32, envMapIntensity: 0.9 });
    case "enamelRed":
    case "enamelWhite":
      return new MeshPhysicalMaterial({ color: c, metalness: 0, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.12 });
    case "fabric": {
      const m = new MeshPhysicalMaterial({
        color: c,
        metalness: 0,
        roughness: 0.82,
        sheen: 0.6,
        sheenRoughness: 0.5,
        sheenColor: c.clone().lerp(new Color("#ffffff"), 0.2),
        normalMap: maps.weave,
        emissive: c, // light scattering through the cloth
        emissiveIntensity: 0.07,
      });
      m.normalScale.set(0.45, 0.45);
      return m;
    }
    case "cotton": {
      const m = new MeshPhysicalMaterial({
        color: c,
        metalness: 0,
        roughness: 1,
        sheen: 0.8,
        sheenRoughness: 0.8,
        sheenColor: new Color("#ffffff"),
        normalMap: maps.fibre,
        emissive: c, // cotton fibres scatter light: whites stay white in the shade
        emissiveIntensity: 0.22,
      });
      m.normalScale.set(0.7, 0.7);
      return m;
    }
    case "cottonShade":
      return new MeshPhysicalMaterial({ color: c, metalness: 0, roughness: 0.95, sheen: 0.4, normalMap: maps.fibre });
    case "leaf":
      return new MeshPhysicalMaterial({ color: c, metalness: 0, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.35 });
  }
}

function Emblem({ svgText, onReady }: { svgText: string; onReady?: () => void }) {
  const group = useRef<Group>(null);
  const sent = useRef(false);
  const cur = useRef({ ry: 0, rx: 0 });

  const parts = useMemo(() => {
    const maps = { weave: weave(), fibre: fibre() };
    maps.weave.repeat.set(1 / 9, 1 / 9); // one weave tile ≈ 9 SVG units
    maps.fibre.repeat.set(1 / 60, 1 / 60);
    return buildGeometry(svgText).map((p) => ({ ...p, material: makeMaterial(p.kind, p.color, maps) }));
  }, [svgText]);

  useEffect(
    () => () =>
      parts.forEach((p) => {
        p.geometry.dispose();
        p.material.dispose();
      }),
    [parts],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Scroll turns the emblem through ±32°, the pointer adds a tilt, and it sways gently at rest.
    const ty = (emblemInput.scroll - 0.5) * 1.1 + emblemInput.px * 0.4 + Math.sin(t * 0.45) * 0.1;
    const tx = -emblemInput.py * 0.28 + Math.sin(t * 0.32) * 0.04;
    const k = 1 - Math.exp(-dt * 4);
    cur.current.ry += (ty - cur.current.ry) * k;
    cur.current.rx += (tx - cur.current.rx) * k;
    g.rotation.set(cur.current.rx, cur.current.ry, 0);
    if (!sent.current) {
      sent.current = true;
      requestAnimationFrame(() => onReady?.());
    }
  });

  return (
    <group ref={group}>
      {/* SVG space is y-down: flip y and centre the artwork on the origin. */}
      <group scale={[S, -S, S]} position={[(-VIEW_W / 2) * S, (VIEW_H / 2) * S, -0.15]}>
        {parts.map((p, i) => (
          <mesh key={i} geometry={p.geometry} material={p.material} castShadow receiveShadow />
        ))}
      </group>
    </group>
  );
}

export default function Emblem3D({ active, reduced, onReady }: { active: boolean; reduced: boolean; onReady?: () => void }) {
  const [svgText, setSvgText] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(EMBLEM_SRC)
      .then((r) => r.text())
      .then((t) => {
        if (alive) setSvgText(t);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const touch = typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;
  const shadowSize = touch ? 1024 : 2048;

  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      dpr={[1, touch ? 1.5 : 2]}
      shadows="percentage"
      camera={{ fov: 28, position: [0, 0, 9], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = NeutralToneMapping; // keeps the original colours true (ACES washes out gold and red)
        gl.toneMappingExposure = 1;
      }}
    >
      <ambientLight intensity={0.12} />
      {/* Studio key light: casts the soft contact shadows between the layers. */}
      <directionalLight
        position={[-2.6, 3.2, 4.5]}
        intensity={1.7}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.015}
        shadow-camera-left={-2.4}
        shadow-camera-right={2.4}
        shadow-camera-top={2.4}
        shadow-camera-bottom={-2.4}
        shadow-camera-near={1}
        shadow-camera-far={14}
      />
      <directionalLight position={[3.5, -1, 3]} intensity={0.35} color="#ffe2c0" />
      {/* Softboxes for the reflections in polished gold. */}
      <Environment resolution={512} frames={1}>
        {/* Narrow strips on a dark studio: polished metal needs dark reflections as much as bright ones. */}
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, 6, 3]} rotation-x={-Math.PI / 3} scale={[10, 1.6, 1]} />
        <Lightformer form="rect" intensity={2.6} color="#fff3e0" position={[-5, 1, 5]} scale={[1.2, 9, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.5} color="#ffe6c4" position={[5, 0.5, 4]} scale={[0.8, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.35} color="#ffffff" position={[0, 0, 9]} scale={[6, 4, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.7} color="#f6d9a8" position={[0, -6, 3]} rotation-x={Math.PI / 3} scale={[10, 1.4, 1]} />
        <Lightformer form="ring" intensity={1.2} color="#ffffff" position={[3, 4, 6]} scale={1.2} target={[0, 0, 0]} />
      </Environment>
      {svgText && <Emblem svgText={svgText} onReady={onReady} />}
    </Canvas>
  );
}
