from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.utils.translation import gettext as _

from .forms import VolunteerForm


def volunteer(request: HttpRequest) -> HttpResponse:
    form = VolunteerForm(request.POST or None)
    context = {"form": form, "submit": _("Join the crew")}
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(
            request,
            "partials/form_done.html",
            {"message": _("Thank you! We'll write to you about training and your shift.")},
        )
    if request.htmx:
        return render(request, "partials/form.html", context)
    return render(request, "volunteers/volunteer.html", context)
