# -*- encoding: utf-8 -*-
from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _

class HomeConfig(AppConfig):
    name = 'home'
    verbose_name = _('Основные категории')
