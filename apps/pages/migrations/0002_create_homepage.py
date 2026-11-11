from django.db import migrations


def create_homepage(apps, schema_editor):
    ContentType = apps.get_model("contenttypes.ContentType")
    Page = apps.get_model("wagtailcore.Page")
    Site = apps.get_model("wagtailcore.Site")
    Locale = apps.get_model("wagtailcore.Locale")
    HomePage = apps.get_model("pages.HomePage")

    # Remove the default "Welcome to Wagtail" page.
    Page.objects.filter(depth=2, slug="home").delete()

    locale = Locale.objects.order_by("pk").first()
    content_type, _ = ContentType.objects.get_or_create(model="homepage", app_label="pages")
    home = HomePage.objects.create(
        title="PyCon Tajikistan 2026",
        draft_title="PyCon Tajikistan 2026",
        slug="home",
        content_type=content_type,
        path="00010001",
        depth=2,
        numchild=0,
        url_path="/home/",
        locale=locale,
    )
    Site.objects.update_or_create(
        is_default_site=True,
        defaults={"hostname": "localhost", "root_page": home, "site_name": "PyCon Tajikistan"},
    )


def remove_homepage(apps, schema_editor):
    apps.get_model("pages.HomePage").objects.filter(slug="home", depth=2).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("pages", "0001_initial"),
        ("wagtailcore", "0001_initial"),
        ("contenttypes", "0002_remove_content_type_name"),
    ]
    run_before = []

    operations = [migrations.RunPython(create_homepage, remove_homepage)]
