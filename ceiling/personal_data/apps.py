from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _

class PersonalDataConfig(AppConfig):
    name = 'personal_data'
    verbose_name = _('Данные')
