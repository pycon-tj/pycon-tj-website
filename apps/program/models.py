from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class Language(models.TextChoices):
    TAJIK = "tg", "Тоҷикӣ"
    RUSSIAN = "ru", "Русский"
    ENGLISH = "en", "English"


class Room(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveSmallIntegerField(default=0)
    pretalx_id = models.CharField(max_length=40, blank=True, unique=True, null=True)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self) -> str:
        return self.name


class Speaker(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    bio = models.TextField(blank=True)
    photo_url = models.URLField(blank=True)
    pretalx_code = models.CharField(max_length=40, blank=True, unique=True, null=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Talk(models.Model):
    class Kind(models.TextChoices):
        TALK = "talk", _("Talk")
        WORKSHOP = "workshop", _("Workshop")
        LIGHTNING = "lightning", _("Lightning talk")
        KEYNOTE = "keynote", _("Keynote")
        BREAK = "break", _("Tea break")

    class Level(models.TextChoices):
        BEGINNER = "beginner", _("Beginner")
        INTERMEDIATE = "intermediate", _("Intermediate")
        ADVANCED = "advanced", _("Advanced")

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    abstract = models.TextField(blank=True)
    kind = models.CharField(max_length=20, choices=Kind.choices, default=Kind.TALK)
    level = models.CharField(max_length=20, choices=Level.choices, default=Level.BEGINNER)
    language = models.CharField(max_length=2, choices=Language.choices, default=Language.TAJIK)
    speakers = models.ManyToManyField(Speaker, related_name="talks", blank=True)
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.SET_NULL)
    start = models.DateTimeField(null=True, blank=True)
    end = models.DateTimeField(null=True, blank=True)
    pretalx_code = models.CharField(max_length=40, blank=True, unique=True, null=True)

    class Meta:
        ordering = ["start", "room__order"]

    def __str__(self) -> str:
        return self.title

    @property
    def is_live(self) -> bool:
        now = timezone.now()
        return bool(self.start and self.end and self.start <= now < self.end)
