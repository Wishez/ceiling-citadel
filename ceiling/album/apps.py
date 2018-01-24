# -*- encoding: utf-8 -*-
from django.apps import AlbumConfig
from django.utils.translation import ugettext_lazy as _

class AlbumConfig(AlbumConfig):
    name = 'album'
    verbose_name = _('Альбомы')
