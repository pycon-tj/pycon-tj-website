from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.panels import FieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page


class HomePage(Page):
    """The "ascent" home page. Most of its layout lives in the template."""

    headline = models.CharField(
        max_length=120, blank=True, help_text=_("Leave empty to use the default.")
    )
    subheadline = models.CharField(max_length=240, blank=True)

    content_panels = [*Page.content_panels, FieldPanel("headline"), FieldPanel("subheadline")]
    max_count = 1
    subpage_types = ["pages.StandardPage"]
    template = "pages/home_page.html"

    def get_context(self, request, *args, **kwargs):
        from datetime import datetime

        from django.conf import settings
        from django.utils import timezone

        from apps.sponsors.models import Tier

        context = super().get_context(request, *args, **kwargs)
        context["tiers"] = Tier.objects.prefetch_related("sponsors").all()
        start = datetime.fromisoformat(settings.EVENT["start"])
        context["days_left"] = max((start - timezone.now()).days + 1, 0)
        return context


class StandardPage(Page):
    """About, venue, FAQ, code of conduct and other text pages."""

    intro = models.CharField(max_length=300, blank=True)
    body = StreamField(
        [
            ("heading", blocks.CharBlock(form_classname="title")),
            ("paragraph", blocks.RichTextBlock()),
            ("quote", blocks.BlockQuoteBlock()),
        ],
        blank=True,
    )

    content_panels = [*Page.content_panels, FieldPanel("intro"), FieldPanel("body")]
    template = "pages/standard_page.html"
