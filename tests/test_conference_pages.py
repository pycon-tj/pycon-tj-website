"""The call for speakers, sponsors, volunteers and Explore Tajikistan pages."""

import pytest
from django.core.management import call_command

from apps.program.models import Proposal
from apps.sponsors.models import Inquiry, Tier
from apps.volunteers.models import VolunteerApplication

pytestmark = pytest.mark.django_db


@pytest.mark.parametrize(
    ("path", "en", "ru", "tg"),
    [
        ("speak", "Call for speakers", "Приём заявок на доклады", "Даъват барои маърӯзачиён"),
        (
            "sponsors",
            "Sponsors and exhibitors",
            "Спонсоры и экспоненты",
            "Сарпарастон ва намоишгарон",
        ),
        ("volunteer", "Call for volunteers", "Набор волонтёров", "Даъват барои волонтёрон"),
        ("explore", "Explore Tajikistan", "Откройте Таджикистан", "Тоҷикистонро кашф кунед"),
    ],
)
def test_pages_have_their_title_in_each_language(client, path, en, ru, tg):
    for lang, title in (("en", en), ("ru", ru), ("tg", tg)):
        response = client.get(f"/{lang}/{path}/")
        assert response.status_code == 200
        assert f"<h1>{title}</h1>" in response.content.decode()


def test_navigation_has_one_entry_per_audience(client):
    page = client.get("/en/").content.decode()
    for url in (
        "/en/program/",
        "/en/speak/",
        "/en/sponsors/",
        "/en/volunteer/",
        "/en/explore/",
        "/en/tickets/",
    ):
        assert f'href="{url}"' in page


def test_call_for_speakers_states_what_speakers_need(client):
    page = client.get("/en/speak/").content.decode()
    for text in (
        "1 February 2027",  # deadline
        "1 March 2027",  # when speakers hear back
        "Tajik, Russian or English",
        "25 minutes",
        "90 minutes",
        "First time? This call is for you.",
    ):
        assert text in page
    for field in (
        "title",
        "abstract",
        "audience",
        "bio",
        "email",
        "phone",
        "first_time",
        "wants_mentor",
    ):
        assert f'name="{field}"' in page


def test_proposal_is_saved(client):
    response = client.post(
        "/en/speak/",
        {
            "title": "Python in Tajik",
            "format": "talk",
            "language": "tg",
            "level": "beginner",
            "audience": "Students",
            "abstract": "How to process Tajik text with Python.",
            "name": "Test Speaker",
            "email": "speaker@example.com",
            "bio": "A developer from Khujand.",
            "first_time": "on",
        },
    )
    assert response.status_code == 200
    proposal = Proposal.objects.get()
    assert proposal.first_time and not proposal.wants_mentor
    assert proposal.status == Proposal.Status.NEW


def test_proposal_needs_abstract_and_bio(client):
    client.post("/en/speak/", {"title": "Half a proposal", "name": "A", "email": "a@example.com"})
    assert Proposal.objects.count() == 0


def test_sponsors_page_shows_cohost_packages_and_booths(client):
    call_command("seed_tiers", verbosity=0)
    page = client.get("/en/sponsors/").content.decode()
    assert "Co-hosted with" in page and ">Alif<" in page
    assert "Summit" in page and "Price on request" in page
    assert "Startup table" in page and "Community table" in page
    assert "sponsors@pycon.tj" in page
    ru = client.get("/ru/sponsors/").content.decode()
    assert "Вершина" in ru


@pytest.mark.parametrize("interest", ["sponsorship", "booth", "both"])
def test_sponsor_inquiry_records_interest(client, interest):
    call_command("seed_tiers", verbosity=0)
    tier = Tier.objects.get(name="Ridge")
    client.post(
        "/en/sponsors/",
        {
            "organization": "Example LLC",
            "name": "Contact",
            "email": "c@example.com",
            "interest": interest,
            "tier": tier.pk if interest != "booth" else "",
        },
    )
    inquiry = Inquiry.objects.get()
    assert inquiry.interest == interest


def test_alif_is_in_the_footer_on_every_page(client):
    assert ">Alif</a>" in client.get("/tg/explore/").content.decode()


def test_volunteer_application_keeps_role_and_availability(client):
    page = client.get("/en/volunteer/").content.decode()
    for role in ("Registration desk", "Room support", "Photography", "Speaker assistance"):
        assert role in page
    client.post(
        "/en/volunteer/",
        {
            "name": "Test",
            "email": "v@example.com",
            "role": "speakers",
            "availability": ["morning", "afternoon"],
        },
    )
    application = VolunteerApplication.objects.get()
    assert application.role == "speakers"
    assert application.availability == "morning,afternoon"


def test_volunteer_must_say_when_they_can_help(client):
    client.post("/en/volunteer/", {"name": "Test", "email": "v@example.com", "role": "any"})
    assert VolunteerApplication.objects.count() == 0


def test_explore_has_captioned_photos_with_credits(client):
    page = client.get("/en/explore/").content.decode()
    assert page.count("<figcaption>") == 6
    assert page.count('alt=""') == 0
    for place in ("Rudaki Avenue", "Qurutob", "Varzob", "Iskanderkul", "Hisor fortress", "Gusgarf"):
        assert place in page
    assert "Photos from Wikimedia Commons" in page
