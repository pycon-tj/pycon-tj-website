from django.contrib import admin

from .models import VolunteerApplication


@admin.register(VolunteerApplication)
class VolunteerApplicationAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "role", "languages", "created_at"]
    list_filter = ["role"]
    search_fields = ["name", "email"]
