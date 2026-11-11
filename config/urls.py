from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from apps.aid import views as aid_views
from apps.live import views as live_views
from apps.news import views as news_views
from apps.pages import views as page_views
from apps.program import views as program_views
from apps.tickets import views as ticket_views
from apps.volunteers import views as volunteer_views

from .api import api

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("i18n/", include("django.conf.urls.i18n")),
    path("api/", api.urls),
    path("suzani/source.py", page_views.suzani_source, name="suzani_source"),
    path("suzani/download.svg", page_views.suzani_download, name="suzani_download"),
]

urlpatterns += i18n_patterns(
    path("program/", program_views.schedule, name="schedule"),
    path("program/<slug:slug>/", program_views.talk_detail, name="talk"),
    path("tickets/", ticket_views.tickets, name="tickets"),
    path("tickets/aid/", aid_views.apply, name="aid"),
    path("volunteer/", volunteer_views.volunteer, name="volunteer"),
    path("live/", live_views.now, name="live"),
    path("news/", news_views.news_list, name="news"),
    path("news/<slug:slug>/", news_views.news_detail, name="news_detail"),
    path("suzani/", page_views.suzani_maker, name="suzani"),
    path(
        "code-of-conduct/",
        TemplateView.as_view(template_name="pages/code_of_conduct.html"),
        name="code_of_conduct",
    ),
    path("", include(wagtail_urls)),
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
