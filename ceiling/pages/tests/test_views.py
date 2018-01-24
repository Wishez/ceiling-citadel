# -*- coding: utf-8 -*-
from django.test import TestCase
from django.urls import reverse
import json
class TestPages(TestCase):
    def setUp(self):
        self.home_url = reverse('home')
        self.services_url = reverse('services')
        self.prices_url = reverse('prices')
        self.contacts_url = reverse('contacts')
        # self.sauna_url = reverse('sauna')
    #
    # def test_go_to_home_page(self):
    #     response = self.client.get(self.home_url)
    #
    #     self.assertEquals(response.status_code, 200)

        # data = json.loads(response.content)
        # self.assertEquals(len(data), 3)
    #
    # def test_go_to_services_page(self):
    #     response = self.client.get(self.services_url)
    #
    #     self.assertEquals(response.status_code, 200)
    #
    #     data = json.loads(response.content)
    #     self.assertEquals(len(data), 3)
    #
    # def test_go_to_prices_page(self):
    #     response = self.client.get(self.prices_url)
    #
    #     self.assertEquals(response.status_code, 200)
    #
    #     data = json.loads(response.content)
    #     self.assertEquals(len(data), 3)
    #
    # def test_go_to_contacts_page(self):
    #     response = self.client.get(self.contacts_url)
    #
    #     self.assertEquals(response.status_code, 200)
    #
    #     data = json.loads(response.content)
    #     self.assertEquals(len(data), 3)