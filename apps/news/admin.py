from django.contrib import admin

from .models import NewsPost


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ["title", "language", "published_at", "is_published", "sent_to_telegram"]
    list_filter = ["language", "is_published"]
    prepopulated_fields = {"slug": ["title"]}
