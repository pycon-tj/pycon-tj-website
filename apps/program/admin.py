from django.contrib import admin

from .models import Room, Speaker, Talk


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ["name", "order"]


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ["name", "pretalx_code"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ["name"]}


@admin.register(Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ["title", "kind", "language", "level", "room", "start"]
    list_filter = ["kind", "language", "level", "room"]
    search_fields = ["title", "abstract"]
    filter_horizontal = ["speakers"]
    prepopulated_fields = {"slug": ["title"]}
