import pytest
from django.urls import reverse
from django.utils import translation

from apps.aid.models import AidApplication
from apps.program.models import Talk
from apps.volunteers.models import VolunteerApplication

pytestmark = pytest.mark.django_db


@pytest.mark.parametrize(
    ("lang", "text"),
    [("en", "One day of Python"), ("ru", "Один день Python"), ("tg", "Як рӯзи Python")],
)
def test_home_page_in_three_languages(client, lang, text):
    response = client.get(f"/{lang}/")
    assert response.status_code == 200
    assert text in response.content.decode()


@pytest.mark.parametrize(
    "name", ["schedule", "tickets", "aid", "volunteer", "live", "news", "suzani"]
)
def test_pages_load(client, name):
    with translation.override("en"):
        url = reverse(name)
    assert client.get(url).status_code == 200


def test_volunteer_form_saves(client):
    with translation.override("en"):
        url = reverse("volunteer")
    response = client.post(url, {"name": "Test", "email": "t@example.com", "role": "any"})
    assert response.status_code == 200
    assert VolunteerApplication.objects.count() == 1


def test_aid_form_requires_motivation(client):
    with translation.override("en"):
        url = reverse("aid")
    client.post(url, {"name": "Test", "email": "t@example.com", "city": "Khujand"})
    assert AidApplication.objects.count() == 0


def test_schedule_filter_by_language(client):
    Talk.objects.create(title="Салом Python", slug="salom", language="tg")
    Talk.objects.create(title="Hello Django", slug="hello", language="en")
    with translation.override("en"):
        url = reverse("schedule")
    body = client.get(url, {"language": "tg"}).content.decode()
    assert "Салом Python" in body
    assert "Hello Django" not in body


def test_suzani_download_and_source(client):
    svg = client.get("/suzani/download.svg?name=Ormon")
    assert svg["Content-Type"] == "image/svg+xml"
    source = client.get("/suzani/source.py")
    assert b"def rosette_svg" in source.content


def test_api_schedule(client):
    Talk.objects.create(title="API talk", slug="api-talk")
    data = client.get("/api/schedule").json()
    assert data[0]["title"] == "API talk"


@pytest.mark.parametrize(
    ("lang", "title", "section"),
    [
        ("en", "Code of Conduct", "Reporting an incident"),
        ("ru", "Кодекс поведения", "Как сообщить о нарушении"),
        ("tg", "Кодекси рафтор", "Хабар додан дар бораи вайронкунӣ"),
    ],
)
def test_code_of_conduct_page_in_each_language(client, lang, title, section):
    body = client.get(f"/{lang}/code-of-conduct/").content.decode()
    assert title in body
    assert section in body
    assert "mailto:coc@pycon.tj" in body
    assert "to confirm" not in body  # unconfirmed contacts are never shown as raw placeholders
    assert "{#" not in body and "{%" not in body  # no template syntax leaks onto the page
    if lang != "en":
        assert "Reporting an incident" not in body  # the full text is translated, not English


def test_tajik_button_reads_tj(client):
    body = client.get("/en/").content.decode()
    assert ">TJ</a>" in body
    assert ">TG</a>" not in body


def test_footer_links_to_code_of_conduct(client):
    assert "/en/code-of-conduct/" in client.get("/en/").content.decode()


@pytest.mark.parametrize(
    ("start", "expected"),
    [
        ("/en/code-of-conduct/", ['href="/tg/code-of-conduct/"', 'href="/ru/code-of-conduct/"']),
        ("/ru/tickets/", ['href="/tg/tickets/"', 'href="/en/tickets/"']),
        ("/tg/", ['href="/ru/"', 'href="/en/"']),
    ],
)
def test_language_links_open_the_same_page_in_each_language(client, start, expected):
    page = client.get(start).content.decode()
    for link in expected:
        assert link in page
