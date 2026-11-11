"""Send published news posts that were not sent yet to the Telegram channel.

    python manage.py post_to_telegram

Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL (e.g. @pycon_tj) in the environment.
"""

import os
from typing import Any

import httpx
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone

from apps.news.models import NewsPost


class Command(BaseCommand):
    help = "Post new news items to Telegram."

    def handle(self, *args: Any, **options: Any) -> None:
        token = os.environ.get("TELEGRAM_BOT_TOKEN")
        channel = os.environ.get("TELEGRAM_CHANNEL")
        if not token or not channel:
            raise CommandError("Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL.")
        posts = NewsPost.objects.filter(
            is_published=True, sent_to_telegram=False, published_at__lte=timezone.now()
        )
        for post in posts:
            response = httpx.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={"chat_id": channel, "text": f"{post.title}\n\n{post.body}"},
                timeout=20,
            )
            response.raise_for_status()
            post.sent_to_telegram = True
            post.save(update_fields=["sent_to_telegram"])
            self.stdout.write(f"Sent: {post.title}")
