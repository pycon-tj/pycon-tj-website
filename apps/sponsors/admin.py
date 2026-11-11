from django.contrib import admin

from .models import Sponsor, Tier


class SponsorInline(admin.TabularInline):
    model = Sponsor
    extra = 0


@admin.register(Tier)
class TierAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "order"]
    inlines = [SponsorInline]


@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ["name", "tier", "is_active", "order"]
    list_filter = ["tier", "is_active"]
