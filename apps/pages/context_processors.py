from datetime import datetime

from django.conf import settings
from django.http import HttpRequest


def event(request: HttpRequest) -> dict[str, object]:
    info = dict(settings.EVENT)
    info["start_dt"] = datetime.fromisoformat(str(info["start"]))
    info["pretix_url"] = settings.PRETIX_SHOP_URL
    info["pretalx_url"] = settings.PRETALX_EVENT_URL
    return {"event": info}
