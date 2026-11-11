from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.utils.translation import gettext as _

from .forms import AidForm


def apply(request: HttpRequest) -> HttpResponse:
    form = AidForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(
            request,
            "partials/form_done.html",
            {
                "message": _("Application received. We'll reply by email within two weeks."),
            },
        )
    template = "partials/form.html" if request.htmx else "forms/form_page.html"
    return render(
        request,
        template,
        {
            "form": form,
            "title": _("Financial aid"),
            "intro": _(
                "Money should not stop you from coming. We give free tickets and pay back travel "
                "costs against receipts after the event. Aid is based on need, not on your CV."
            ),
            "submit": _("Send application"),
            "seed": "aid",
        },
    )
