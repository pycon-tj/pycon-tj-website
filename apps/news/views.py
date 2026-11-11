from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.utils import timezone

from .models import NewsPost


def _published():
    return NewsPost.objects.filter(is_published=True, published_at__lte=timezone.now())


def news_list(request: HttpRequest) -> HttpResponse:
    return render(request, "news/list.html", {"posts": _published()})


def news_detail(request: HttpRequest, slug: str) -> HttpResponse:
    return render(request, "news/detail.html", {"post": get_object_or_404(_published(), slug=slug)})
