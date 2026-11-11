from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.utils import timezone

from apps.program.models import Talk


def now(request: HttpRequest) -> HttpResponse:
    """'Now on stage'. The page refreshes itself every 30 seconds with HTMX."""
    moment = timezone.now()
    talks = Talk.objects.select_related("room").prefetch_related("speakers")
    context = {
        "live": talks.filter(start__lte=moment, end__gt=moment),
        "next": talks.filter(start__gt=moment)[:3],
    }
    template = "live/_now.html" if request.htmx else "live/now.html"
    return render(request, template, context)
