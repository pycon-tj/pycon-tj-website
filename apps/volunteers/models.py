from django.db import models
from django.utils.translation import gettext_lazy as _


class VolunteerApplication(models.Model):
    class Role(models.TextChoices):
        REGISTRATION = "registration", _("Registration desk")
        ROOMS = "rooms", _("Room host and session chair")
        STAGE = "stage", _("Stage and sound")
        SETUP = "setup", _("Setup and teardown")
        PHOTO = "photo", _("Photo and social media")
        ANY = "any", _("Anything that helps")

    name = models.CharField(_("Full name"), max_length=200)
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone or Telegram"), max_length=60, blank=True)
    role = models.CharField(
        _("Preferred role"), max_length=20, choices=Role.choices, default=Role.ANY
    )
    languages = models.CharField(_("Languages you speak"), max_length=120, blank=True)
    note = models.TextField(_("Anything else we should know?"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.get_role_display()})"
