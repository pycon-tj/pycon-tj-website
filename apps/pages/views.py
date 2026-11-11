from pathlib import Path

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.utils.text import slugify
from django.views.decorators.cache import cache_control

import suzani

SUZANI_SOURCE = Path(suzani.__file__)


def suzani_maker(request: HttpRequest) -> HttpResponse:
    """Type a name, get a personal rosette. HTMX swaps in a fresh SVG on each keystroke."""
    seed = request.GET.get("name", "").strip()[:60]
    if request.htmx:
        return render(request, "pages/_rosette.html", {"seed": seed or "PyCon Tajikistan"})
    return render(request, "pages/suzani.html", {"seed": seed or "PyCon Tajikistan"})


@cache_control(max_age=60 * 60 * 24)
def suzani_download(request: HttpRequest, size: int = 1080) -> HttpResponse:
    seed = request.GET.get("name", "PyCon Tajikistan").strip()[:60] or "PyCon Tajikistan"
    size = max(200, min(int(request.GET.get("size", size)), 2400))
    response = HttpResponse(suzani.rosette_svg(seed, size=size), content_type="image/svg+xml")
    filename = f"suzani-{slugify(seed, allow_unicode=False) or 'pycon-tj'}.svg"
    response["Content-Disposition"] = f'attachment; filename="{filename}"'
    return response


@cache_control(max_age=60 * 60)
def suzani_source(request: HttpRequest) -> HttpResponse:
    """The generator's Python source, loaded into Pyodide by the in-browser terminal."""
    return HttpResponse(
        SUZANI_SOURCE.read_text(encoding="utf-8"), content_type="text/x-python; charset=utf-8"
    )
