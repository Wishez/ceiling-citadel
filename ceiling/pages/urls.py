# -*- coding: utf-8 -*-
from django.conf.urls import url
from .views import *

urlpatterns = [
    url('^$', HomeView.as_view(), name='index'),
    url('^catalog/$', CatalogView.as_view(), name='catalog'),
    url('^service/$', ServiceView.as_view(), name='business'),
    url('^contacts/$', ContactsView.as_view(), name='contacts'),
]