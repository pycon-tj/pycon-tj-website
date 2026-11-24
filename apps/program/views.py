from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Language, Talk


def schedule(request: HttpRequest) -> HttpResponse:
    talks = Talk.objects.select_related("room").prefetch_related("speakers")
    language = request.GET.get("language", "")
    level = request.GET.get("level", "")
    if language:
        talks = talks.filter(language=language)
    if level:
        talks = talks.filter(level=level)
    context = {
        "talks": talks,
        "languages": Language.choices,
        "levels": Talk.Level.choices,
        "selected": {"language": language, "level": level},
    }
    template = "program/_talk_list.html" if request.htmx else "program/schedule.html"
    return render(request, template, context)


def talk_detail(request: HttpRequest, slug: str) -> HttpResponse:
    talk = get_object_or_404(Talk.objects.prefetch_related("speakers"), slug=slug)
    return render(request, "program/talk.html", {"talk": talk})


def speak(request: HttpRequest) -> HttpResponse:
    from django.utils.translation import gettext as _

    from .forms import ProposalForm

    form = ProposalForm(request.POST or None)
    context = {"form": form, "submit": _("Send my proposal")}
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(
            request,
            "partials/form_done.html",
            {
                "message": _(
                    "Thank you! Your proposal is in. We'll write to you by email "
                    "with the decision by the date on this page."
                )
            },
        )
    if request.htmx:
        return render(request, "partials/form.html", context)
    return render(request, "program/speak.html", context)
