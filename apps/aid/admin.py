from django.contrib import admin

from .models import AidApplication


@admin.register(AidApplication)
class AidApplicationAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "needs_ticket", "travel_estimate", "status", "created_at"]
    list_filter = ["status", "needs_ticket"]
    list_editable = ["status"]
    search_fields = ["name", "email", "city"]
