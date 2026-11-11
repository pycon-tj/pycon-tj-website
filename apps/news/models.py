from django.db import models
from django.utils import timezone

from apps.program.models import Language


class NewsPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    language = models.CharField(max_length=2, choices=Language.choices, default=Language.TAJIK)
    body = models.TextField()
    published_at = models.DateTimeField(default=timezone.now)
    is_published = models.BooleanField(default=False)
    sent_to_telegram = models.BooleanField(default=False, editable=False)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self) -> str:
        return self.title
