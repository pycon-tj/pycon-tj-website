from functools import lru_cache

from django import template
from django.utils.safestring import SafeString, mark_safe

import suzani
from apps.pages.scenes import scene_svg

register = template.Library()


@register.simple_tag
def rosette(seed: str, size: int = 400) -> SafeString:
    """Inline SVG rosette. Output is built from numbers and escaped text only."""
    return mark_safe(suzani.rosette_svg(str(seed), size=size))  # noqa: S308


@lru_cache(maxsize=16)
def _scene(name: str) -> str:
    return scene_svg(name)


@register.simple_tag
def scene(name: str) -> SafeString:
    """A logo-style vector scene drawn by apps/pages/scenes.py (numbers and fixed markup only)."""
    return mark_safe(_scene(name))  # noqa: S308


@register.simple_tag
def suzani_border(seed: str, width: int = 1200, height: int = 48) -> SafeString:
    return mark_safe(suzani.border_svg(str(seed), width=width, height=height))  # noqa: S308
