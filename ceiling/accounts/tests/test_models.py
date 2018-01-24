from django.test import TestCase
from home.models import *

class EmailMessage(TestCase):
    def test_creating_email_message_setting(self):
        new_setting = EmailMessagesSetting.objects.create(
            registered_a='Message 1',
            registered_b='Message 2',
            is_active='Активная группа'
        )
        new_setting.save()
        self.assertEquals(new_setting.registered_a, 'Message 1')
        self.assertEquals(new_setting.registered_b, 'Message 2')
        self.assertEquals(new_setting.is_active, 'Активная группа')

    def test_switch_active_state_email_messages_settings(self):
        old_setting = EmailMessagesSetting.objects.create(
            registered_a='Message 1',
            registered_b='Message 2',
            is_active='Активная группа'
        )
        old_setting.save()

        self.assertEquals(old_setting.is_active, 'Активная группа')

        new_setting = EmailMessagesSetting.objects.create(
            registered_a='Message 1',
            registered_b='Message 2',
            is_active='Активная группа'
        )

        new_setting.save()
        self.assertEquals(new_setting.is_active, 'Активная группа')
        self.assertEquals(old_setting.is_active, 'Активная группа')
