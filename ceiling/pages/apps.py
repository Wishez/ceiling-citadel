# -*- coding: utf-8 -*-
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ugettext_lazy as _

class PagesConfig(AppConfig):
    name = 'pages'
    verbose_name = _('Настройка страниц')
