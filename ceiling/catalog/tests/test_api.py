# -*- encoding: utf-8 -*-
import json
from django.urls import reverse, reverse_lazy
from catalog.models import *
from model_mommy import mommy
from django.utils.timezone import now
from django.test import TestCase
from django.contrib.auth.models import User

class CatalogAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="username",
            password="demonstration",
            email="shiningfinger@list.ru"
        )

        models = {
            'brand': Brand,
            'category': Category,
            'collection': Collection,
            'product': Product
        }

        for key in models.keys():
            model = mommy.make(
                models[key],
                _fill_optional=True,
                created=now(),
                modified=now()
            )

            setattr(self, key, model)
            setattr(
                self,
                key + '_read_url',
                reverse_lazy(key, kwargs={
                    'uuid': model.uuid
                })
            )

        self.brands_list_read_url = reverse_lazy('brands_list')
        self.categories_list_read_url = reverse_lazy('categories_list')
        self.collections_list_read_url = reverse_lazy('collections_list')

        # self.assertEquals()

    def security_test(self):
        response = self.client.get(self.categories_list_read_url)

        self.assertEquals(response.status_code, 403)
    def get_categories_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.categories_list_read_url)

        self.assertEquals(response.status_code, 200)
    def get_brands_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.brands_list_read_url)

        self.assertEquals(response.status_code, 200)
    def get_collections_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.collections_list_read_url)

        self.assertEquals(response.status_code, 200)
    def get_category_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.category_read_url)

        self.assertEquals(response.status_code, 200)

    def get_brand_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.brand_read_url)

        self.assertEquals(response.status_code, 200)

    def get_collection_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.collection_read_url)

        self.assertEquals(response.status_code, 200)

    def get_product_test(self):
        self.client.login(username='username', password='demonstration')
        response = self.client.get(self.product_read_url)

        self.assertEquals(response.status_code, 200)
