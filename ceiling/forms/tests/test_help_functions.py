# -*- coding: utf-8 -*-
from django.test import TestCase
from ..help_functions import get_or_create_consumer

class TestHelpFunctions(TestCase):
    def setUp(self):
        self.data = {
            "full_name": "Last First Middle",
        }
    def get_or_create_consumer_without_contacts_data_test(self):
        consumer = get_or_create_consumer(self.data)

        self.assertEquals(consumer.first_name, "First")
        self.assertEquals(consumer.last_name, "Last")
        self.assertEquals(consumer.middle_name, "Middle")

    def get_or_create_consumer_with_email_test(self):
        data = self.data
        data['email'] = 'shiningfinger@list.ru'

        consumer = get_or_create_consumer(data)

        self.assertEquals(consumer.first_name, "First")
        self.assertEquals(consumer.last_name, "Last")
        self.assertEquals(consumer.middle_name, "Middle")
        self.assertEquals(consumer.email, data['email'])

    def get_or_create_consumer_test(self):
        data = self.data
        data['phone_number'] = '+7 (985) 905-12-51'
        data['email'] = 'shiningfinger@list.ru'

        consumer = get_or_create_consumer(data)

        self.assertEquals(consumer.first_name, "First")
        self.assertEquals(consumer.last_name, "Last")
        self.assertEquals(consumer.middle_name, "Middle")
        self.assertEquals(consumer.email, data['email'])
        self.assertEquals(consumer.phone_number, data['phone_number'])