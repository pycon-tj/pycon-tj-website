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


class Proposal(models.Model):
    """A talk or workshop sent through the call for speakers on /speak/."""

    class Format(models.TextChoices):
        TALK = "talk", _("Talk, 25 minutes + 5 for questions")
        WORKSHOP = "workshop", _("Workshop, 90 minutes")

    class Level(models.TextChoices):
        BEGINNER = "beginner", _("Beginner")
        INTERMEDIATE = "intermediate", _("Intermediate")
        ADVANCED = "advanced", _("Advanced")

    class Status(models.TextChoices):
        NEW = "new", _("New")
        ACCEPTED = "accepted", _("Accepted")
        DECLINED = "declined", _("Declined")
        WAITLIST = "waitlist", _("Waiting list")

    title = models.CharField(_("Title"), max_length=150)
    format = models.CharField(
        _("Format"), max_length=20, choices=Format.choices, default=Format.TALK
    )
    language = models.CharField(
        _("Language of the talk"), max_length=2, choices=Language.choices, default=Language.TAJIK
    )
    level = models.CharField(
        _("Level"), max_length=20, choices=Level.choices, default=Level.BEGINNER
    )
    audience = models.CharField(
        _("Who is it for?"),
        max_length=300,
        help_text=_(
            "For example: students who know a little Python, data analysts, web developers."
        ),
    )
    abstract = models.TextField(
        _("Abstract"),
        help_text=_("What will people learn? 2 to 5 sentences. This goes in the program."),
    )
    outline = models.TextField(
        _("Outline for reviewers"),
        blank=True,
        help_text=_("Optional: the main parts with rough minutes. Only the committee sees it."),
    )
    name = models.CharField(_("Your name"), max_length=200)
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone or Telegram"), max_length=60, blank=True)
    bio = models.TextField(
        _("Short bio"), help_text=_("2 or 3 sentences about you, in the third person.")
    )
    first_time = models.BooleanField(_("This is my first talk at a conference"), default=False)
    wants_mentor = models.BooleanField(_("I'd like a mentor to help me prepare"), default=False)
    notes = models.TextField(_("Anything else for the committee?"), blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.title} ({self.name})"
