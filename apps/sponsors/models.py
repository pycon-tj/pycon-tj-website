from django.db import models


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
