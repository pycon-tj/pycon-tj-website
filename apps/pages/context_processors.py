from datetime import datetime

from django.conf import settings
from django.http import HttpRequest


def event(request: HttpRequest) -> dict[str, object]:
    info = dict(settings.EVENT)
    info["start_dt"] = datetime.fromisoformat(str(info["start"]))
    info["pretix_url"] = settings.PRETIX_SHOP_URL
    info["pretalx_url"] = settings.PRETALX_EVENT_URL
    return {"event": info}


def language_links(request: HttpRequest) -> dict[str, object]:
    """The current page in every language: /en/tickets/ gives /tg/tickets/ and /ru/tickets/."""
    codes = [code for code, _ in settings.LANGUAGES]
    path = request.get_full_path()
    parts = path.split("/", 2)  # ["", "en", "rest?query"]
    rest = parts[2] if len(parts) > 2 and parts[1] in codes else path.lstrip("/")
    return {"language_links": [(code, f"/{code}/{rest}") for code in codes]}
