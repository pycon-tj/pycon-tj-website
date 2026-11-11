"""Public JSON API (django-ninja). Used by hall screens and future apps."""

from datetime import datetime

from django.http import HttpRequest, HttpResponse
from ninja import NinjaAPI, Schema

import suzani
from apps.program.models import Talk

api = NinjaAPI(title="PyCon Tajikistan API", version="1.0", urls_namespace="api")


class TalkOut(Schema):
    title: str
    slug: str
    kind: str
    level: str
    language: str
    room: str | None
    start: datetime | None
    end: datetime | None
    speakers: list[str]


@api.get("/schedule", response=list[TalkOut])
def schedule(request: HttpRequest) -> list[TalkOut]:
    talks = Talk.objects.select_related("room").prefetch_related("speakers")
    return [
        TalkOut(
            title=t.title,
            slug=t.slug,
            kind=t.kind,
            level=t.level,
            language=t.language,
            room=t.room.name if t.room else None,
            start=t.start,
            end=t.end,
            speakers=[s.name for s in t.speakers.all()],
        )
        for t in talks
    ]


@api.get("/suzani/{seed}.svg")
def suzani_svg(request: HttpRequest, seed: str, size: int = 400) -> HttpResponse:
    size = max(100, min(size, 2400))
    return HttpResponse(suzani.rosette_svg(seed[:60], size=size), content_type="image/svg+xml")
