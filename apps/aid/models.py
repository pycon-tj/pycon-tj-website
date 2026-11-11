from django.db import models
from django.utils.translation import gettext_lazy as _


class AidApplication(models.Model):
    """Financial aid: a free ticket and/or travel reimbursed against receipts after the event."""

    class Status(models.TextChoices):
        NEW = "new", _("New")
        ACCEPTED = "accepted", _("Accepted")
        DECLINED = "declined", _("Declined")

    name = models.CharField(_("Full name"), max_length=200)
    email = models.EmailField(_("Email"))
    city = models.CharField(_("City you travel from"), max_length=120)
    needs_ticket = models.BooleanField(_("I need a free ticket"), default=True)
    travel_estimate = models.CharField(
        _("Estimated travel cost, if any"), max_length=60, blank=True
    )
    motivation = models.TextField(_("Why do you want to come?"))
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.name
