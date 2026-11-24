from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.utils.translation import gettext as _

from .forms import InquiryForm
from .models import Tier


def sponsors(request: HttpRequest) -> HttpResponse:
    form = InquiryForm(request.POST or None)
    context = {"form": form, "submit": _("Send")}
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(
            request,
            "partials/form_done.html",
            {
                "message": _(
                    "Thank you! We'll send the prospectus and reply within three working days."
                )
            },
        )
    if request.htmx:
        return render(request, "partials/form.html", context)
    context["tiers"] = Tier.objects.prefetch_related("sponsors").all()
    return render(request, "sponsors/sponsors.html", context)
