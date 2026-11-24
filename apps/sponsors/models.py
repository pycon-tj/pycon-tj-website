from django.db import models
from django.utils.translation import gettext_lazy as _


class Tier(models.Model):
    """Sponsor level. Higher order = higher ledge on the mountain."""

    name = models.CharField(max_length=60)
    order = models.PositiveSmallIntegerField(
        default=0, help_text="Higher shows higher on the page."
    )
    price = models.CharField(
        max_length=60, blank=True, help_text="Shown as written, for example $600."
    )
    benefits = models.TextField(blank=True)

    class Meta:
        ordering = ["-order"]

    def __str__(self) -> str:
        return self.name


class Sponsor(models.Model):
    name = models.CharField(max_length=120)
    tier = models.ForeignKey(Tier, on_delete=models.PROTECT, related_name="sponsors")
    logo = models.ImageField(upload_to="sponsors/", blank=True)
    url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-tier__order", "order", "name"]

    def __str__(self) -> str:
        return self.name


class Inquiry(models.Model):
    """An organization asking about sponsorship, a booth, or both, from /sponsors/."""

    class Interest(models.TextChoices):
        SPONSORSHIP = "sponsorship", _("Sponsorship")
        BOOTH = "booth", _("A booth")
        BOTH = "both", _("Both")

    organization = models.CharField(_("Organization"), max_length=200)
    name = models.CharField(_("Contact person"), max_length=200)
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone or Telegram"), max_length=60, blank=True)
    interest = models.CharField(
        _("We are interested in"), max_length=20, choices=Interest.choices, default=Interest.BOTH
    )
    tier = models.ForeignKey(
        Tier,
        verbose_name=_("Package"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text=_("Optional. Not sure yet? Leave it empty."),
    )
    message = models.TextField(_("Message"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "inquiries"

    def __str__(self) -> str:
        return f"{self.organization} ({self.get_interest_display()})"
