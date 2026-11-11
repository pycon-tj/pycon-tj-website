"""Generative suzani patterns for PyCon Tajikistan.

Pure Python with no dependencies, so the same module runs on the Django
server and in the browser through Pyodide. The same seed always draws the
same pattern, which is how a visitor's online suzani matches their badge.

    >>> from suzani import rosette_svg
    >>> svg = rosette_svg("Ormon")
"""

from __future__ import annotations

import hashlib
import math
import random
from dataclasses import dataclass

__all__ = ["PALETTE", "Rosette", "design", "rosette_svg", "border_svg"]

# Colours from the PyCon Tajikistan logo (see design.md, section 3).
PALETTE: dict[str, str] = {
    "night": "#0E1A3D",
    "navy": "#1B2A6B",
    "snow": "#F7F8FC",
    "sun1": "#FFB703",
    "sun2": "#FB8500",
    "sun3": "#E63946",
    "sun4": "#D61F69",
    "red": "#CC0000",
    "green": "#1E7B34",
}
_THREAD = ["sun1", "sun2", "sun3", "sun4", "navy", "green"]


def _rng(seed: str) -> random.Random:
    digest = hashlib.sha256(seed.strip().lower().encode("utf-8")).hexdigest()
    return random.Random(int(digest[:16], 16))


@dataclass(frozen=True)
class Ring:
    kind: str  # "petals", "dots" or "leaves"
    count: int
    inner: float
    outer: float
    width: float
    color: str
    offset: float  # rotation in degrees


@dataclass(frozen=True)
class Rosette:
    seed: str
    rings: tuple[Ring, ...]
    core: tuple[str, str]


def design(seed: str) -> Rosette:
    """Choose the structure of a rosette from a seed (name, email, anything)."""
    rng = _rng(seed)
    symmetry = rng.choice([6, 8, 10, 12])
    rings: list[Ring] = []
    radius = 0.16
    colors = _THREAD[:]
    rng.shuffle(colors)
    for i in range(rng.randint(3, 4)):
        kind = "petals" if i % 2 == 0 else rng.choice(["dots", "leaves"])
        depth = rng.uniform(0.12, 0.18)
        count = symmetry * (1 + (i % 2))
        rings.append(
            Ring(
                kind=kind,
                count=count,
                inner=radius,
                outer=min(radius + depth, 0.96),
                width=rng.uniform(0.35, 0.6),
                color=PALETTE[colors[i % len(colors)]],
                offset=(180 / count) * (i % 2),
            )
        )
        radius += depth * rng.uniform(0.7, 0.95)
    core = (PALETTE[rng.choice(["sun1", "sun2"])], PALETTE[rng.choice(["sun3", "sun4"])])
    return Rosette(seed=seed, rings=tuple(rings), core=core)


def _petal(ring: Ring, scale: float) -> str:
    ri, ro = ring.inner * scale, ring.outer * scale
    mid = (ri + ro) / 2
    half = (2 * math.pi * mid / ring.count) * ring.width
    return f"M0,{-ri:.2f} Q{half:.2f},{-mid:.2f} 0,{-ro:.2f} Q{-half:.2f},{-mid:.2f} 0,{-ri:.2f}Z"


def _ring_svg(ring: Ring, scale: float) -> str:
    step = 360 / ring.count
    parts: list[str] = []
    if ring.kind == "dots":
        r = (ring.outer - ring.inner) * scale * 0.28
        y = -(ring.inner + ring.outer) / 2 * scale
        shape = f'<circle cx="0" cy="{y:.2f}" r="{r:.2f}"/>'
    elif ring.kind == "leaves":
        ri, ro = ring.inner * scale, ring.outer * scale
        w = (ro - ri) * 0.45
        shape = f'<path d="M0,{-ri:.2f} C{w:.2f},{-ri:.2f} {w:.2f},{-ro:.2f} 0,{-ro:.2f}Z"/>'
    else:
        shape = f'<path d="{_petal(ring, scale)}"/>'
    for i in range(ring.count):
        parts.append(f'<g transform="rotate({ring.offset + i * step:.2f})">{shape}</g>')
    return f'<g fill="{ring.color}">{"".join(parts)}</g>'


def rosette_svg(seed: str, size: int = 400, title: str | None = None) -> str:
    """Return a standalone SVG rosette for the seed."""
    r = design(seed)
    half = size / 2
    scale = half * 0.98
    label = title or f"Suzani rosette for {seed}"
    rings = "".join(_ring_svg(ring, scale) for ring in r.rings)
    core = (
        f'<circle r="{scale * 0.15:.2f}" fill="{r.core[1]}"/>'
        f'<circle r="{scale * 0.10:.2f}" fill="{r.core[0]}"/>'
        f'<circle r="{scale * 0.04:.2f}" fill="{PALETTE["snow"]}"/>'
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
        f'width="{size}" height="{size}" role="img" aria-label="{_escape(label)}">'
        f"<title>{_escape(label)}</title>"
        f'<g transform="translate({half},{half})">{rings}{core}</g></svg>'
    )


def border_svg(seed: str, width: int = 1200, height: int = 48) -> str:
    """A horizontal band of small rosettes joined by a vine, used as a section divider."""
    rng = _rng(seed)
    count = max(3, width // (height * 2))
    gap = width / count
    vine_y = height / 2
    amp = height * 0.22
    points = " ".join(
        f"{x:.1f},{vine_y + amp * math.sin(x / gap * math.pi):.1f}" for x in range(0, width + 1, 8)
    )
    flowers: list[str] = []
    for i in range(count):
        cx = gap * (i + 0.5)
        color = PALETTE[_THREAD[(i + rng.randint(0, 5)) % len(_THREAD)]]
        petals = rng.choice([5, 6, 8])
        pr = height * 0.34
        petal = f'<ellipse cx="0" cy="{-pr / 2:.1f}" rx="{pr / 3.2:.1f}" ry="{pr / 2:.1f}"/>'
        ring = "".join(
            f'<g transform="rotate({k * 360 / petals:.1f})">{petal}</g>' for k in range(petals)
        )
        flowers.append(
            f'<g transform="translate({cx:.1f},{vine_y})"><g fill="{color}">{ring}</g>'
            f'<circle r="{pr / 4:.1f}" fill="{PALETTE["sun1"]}"/></g>'
        )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'
        f'<polyline points="{points}" fill="none" stroke="{PALETTE["green"]}" '
        f'stroke-width="2" stroke-linecap="round"/>{"".join(flowers)}</svg>'
    )


def _escape(text: str) -> str:
    return (
        text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
    )
