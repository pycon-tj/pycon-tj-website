"""Import accepted talks, speakers and rooms from pretalx.

    python manage.py sync_pretalx

Set PRETALX_EVENT_URL (e.g. https://pretalx.com/pycon-tj-2026) and, for
unpublished schedules, PRETALX_API_TOKEN. Run it from cron every hour, and
every 5 minutes during event week.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import urlsplit

import httpx
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.dateparse import parse_datetime
from django.utils.text import slugify

from apps.program.models import Room, Speaker, Talk

KIND_MAP = {
    "workshop": Talk.Kind.WORKSHOP,
    "lightning": Talk.Kind.LIGHTNING,
    "keynote": Talk.Kind.KEYNOTE,
}


def _text(value: Any) -> str:
    """pretalx returns some fields as {"en": "..."} dictionaries."""
    if isinstance(value, dict):
        return str(value.get("en") or next(iter(value.values()), ""))
    return str(value or "")


def _api_base(event_url: str) -> str:
    parts = urlsplit(event_url.rstrip("/"))
    slug = parts.path.rstrip("/").split("/")[-1]
    return f"{parts.scheme}://{parts.netloc}/api/events/{slug}"


class Command(BaseCommand):
    help = "Sync talks, speakers and rooms from pretalx."

    def handle(self, *args: Any, **options: Any) -> None:
        if not settings.PRETALX_EVENT_URL:
            raise CommandError("Set PRETALX_EVENT_URL first.")
        headers = {"Accept": "application/json"}
        if settings.PRETALX_API_TOKEN:
            headers["Authorization"] = f"Token {settings.PRETALX_API_TOKEN}"
        url: str | None = f"{_api_base(settings.PRETALX_EVENT_URL)}/talks/?limit=100"
        talks: list[dict[str, Any]] = []
        with httpx.Client(headers=headers, timeout=30) as client:
            while url:
                response = client.get(url)
                response.raise_for_status()
                data = response.json()
                talks.extend(data.get("results", []))
                url = data.get("next")
        with transaction.atomic():
            for item in talks:
                self._save(item)
        self.stdout.write(self.style.SUCCESS(f"Synced {len(talks)} talks from pretalx."))

    def _save(self, item: dict[str, Any]) -> None:
        slot = item.get("slot") or {}
        room = None
        if slot.get("room"):
            room_name = _text(slot["room"])
            room, _ = Room.objects.get_or_create(
                pretalx_id=str(slot.get("room_id") or room_name), defaults={"name": room_name}
            )
        kind_label = _text(item.get("submission_type")).lower()
        kind = next((v for k, v in KIND_MAP.items() if k in kind_label), Talk.Kind.TALK)
        locale = str(item.get("content_locale") or "tg")[:2]
        talk, _ = Talk.objects.update_or_create(
            pretalx_code=item["code"],
            defaults={
                "title": _text(item.get("title")),
                "slug": slugify(f"{item['code']}-{_text(item.get('title'))}")[:255],
                "abstract": _text(item.get("abstract")),
                "kind": kind,
                "language": locale if locale in {"tg", "ru", "en"} else "en",
                "room": room,
                "start": parse_datetime(slot["start"]) if slot.get("start") else None,
                "end": parse_datetime(slot["end"]) if slot.get("end") else None,
            },
        )
        speakers = []
        for person in item.get("speakers", []):
            speaker, _ = Speaker.objects.update_or_create(
                pretalx_code=person["code"],
                defaults={
                    "name": person.get("name", ""),
                    "slug": slugify(f"{person['code']}-{person.get('name', '')}"),
                    "bio": person.get("biography") or "",
                    "photo_url": person.get("avatar") or "",
                },
            )
            speakers.append(speaker)
        talk.speakers.set(speakers)
