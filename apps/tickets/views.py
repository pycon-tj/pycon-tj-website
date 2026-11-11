from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def tickets(request: HttpRequest) -> HttpResponse:
    # Prices are decided by the organising team; tickets are sold on pretix.
    return render(request, "tickets/tickets.html")
