# -*- encoding: utf-8 -*-
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
from myadmin.admin import admin_site
from jet.dashboard.dashboard_modules import google_analytics_views

urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    url(r'^admin/', admin_site.urls),
    url(r'^catalog/', include('catalog.urls')),
    url(r'^make_form/', include('forms.urls')),
    url(r'', include('pages.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
