from django.db import models
from django.utils.translation import gettext_lazy as _


class VolunteerApplication(models.Model):
    class Role(models.TextChoices):
        REGISTRATION = "registration", _("Registration desk")
        ROOMS = "rooms", _("Room support")
        SPEAKERS = "speakers", _("Speaker assistance")
        PHOTO = "photo", _("Photography")
        SOCIAL = "social", _("Social media")
        SETUP = "setup", _("Setup and teardown")
        ANY = "any", _("Anything that helps")

    class Availability(models.TextChoices):
        SETUP_DAY = "setup_day", _("The day before, for setup")
        MORNING = "morning", _("Conference day, morning")
        AFTERNOON = "afternoon", _("Conference day, afternoon")
        FULL_DAY = "full_day", _("The whole conference day")

    name = models.CharField(_("Full name"), max_length=200)
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone or Telegram"), max_length=60, blank=True)
    role = models.CharField(
        _("Preferred role"), max_length=20, choices=Role.choices, default=Role.ANY
    )
    availability = models.CharField(_("When can you help?"), max_length=120, blank=True)
    languages = models.CharField(_("Languages you speak"), max_length=120, blank=True)
    note = models.TextField(_("Anything else we should know?"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.get_role_display()})"
