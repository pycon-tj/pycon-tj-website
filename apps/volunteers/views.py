from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.utils.translation import gettext as _

from .forms import VolunteerForm


def volunteer(request: HttpRequest) -> HttpResponse:
    form = VolunteerForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(
            request,
            "partials/form_done.html",
            {
                "message": _("Thank you! We'll write to you soon about training and your shift."),
            },
        )
    template = "partials/form.html" if request.htmx else "forms/form_page.html"
    return render(
        request,
        template,
        {
            "form": form,
            "title": _("Become part of the crew"),
            "intro": _(
                "Help at registration, in the rooms or on stage. You get a free ticket, a crew "
                "T-shirt, and a story about how you helped start the first PyCon in Tajikistan."
            ),
            "submit": _("Join the crew"),
            "seed": "volunteer",
        },
    )
