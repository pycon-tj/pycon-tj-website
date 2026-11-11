"""Create the mountain-named sponsor tiers. Prices are left empty for the team to set.

python manage.py seed_tiers
"""

from typing import Any

from django.core.management.base import BaseCommand

from apps.sponsors.models import Tier

TIERS = [
    ("Summit", 50, "Headline partner. Your name at the top of the mountain."),
    ("Peak", 40, "Big logo on stage, booth, short talk slot, 4 tickets."),
    ("Ridge", 30, "Logo on stage and site, booth, 3 tickets."),
    ("Valley", 20, "Logo on site and screens, 2 tickets."),
    ("Base camp", 10, "Logo on site, 1 ticket. Made for local startups."),
    ("Friends of the trail", 0, "Community partners, universities and individual supporters."),
]


class Command(BaseCommand):
    help = "Create default sponsor tiers."

    def handle(self, *args: Any, **options: Any) -> None:
        for name, order, benefits in TIERS:
            Tier.objects.get_or_create(name=name, defaults={"order": order, "benefits": benefits})
        self.stdout.write(self.style.SUCCESS(f"{len(TIERS)} tiers ready."))
