"""Create the mountain-named sponsor tiers. Prices are left empty for the team to set.

python manage.py seed_tiers
"""

from typing import Any

from django.core.management.base import BaseCommand
from django.utils.translation import gettext_noop as _

from apps.sponsors.models import Tier

TIERS = [
    (_("Summit"), 50, _("Headline partner. Your name at the top of the mountain.")),
    (_("Peak"), 40, _("Big logo on stage, booth, short talk slot, 4 tickets.")),
    (_("Ridge"), 30, _("Logo on stage and site, booth, 3 tickets.")),
    (_("Valley"), 20, _("Logo on site and screens, 2 tickets.")),
    (_("Base camp"), 10, _("Logo on site, 1 ticket. Made for local startups.")),
    (
        _("Friends of the trail"),
        0,
        _("Community partners, universities and individual supporters."),
    ),
]


class Command(BaseCommand):
    help = "Create default sponsor tiers."

    def handle(self, *args: Any, **options: Any) -> None:
        for name, order, benefits in TIERS:
            Tier.objects.get_or_create(name=name, defaults={"order": order, "benefits": benefits})
        self.stdout.write(self.style.SUCCESS(f"{len(TIERS)} tiers ready."))
