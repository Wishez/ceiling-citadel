# -*- encoding: utf-8 -*-
from django.urls import reverse_lazy, reverse
from catalog.models import *
from model_mommy import mommy
from django.utils.timezone import now
from django.test import TestCase, Client
from django.contrib.auth.models import User

class CatalogAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="hello",
            password="username",
            email="testmail@list.ru"
        )

        self.user.save()

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
            setattr(self, '%sUUID' % key, model.uuid)


    # def security_test(self):
    #     url = reverse('categories_list')
    #     response = self.client.get(url)
    #
    #     self.assertEquals(response.status_code, 403)

    def get_categories_test(self):
        self.client.login(username='username', password='demonstration')
        url = reverse('categories_list')

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def get_brands_test(self):
        self.client.login(username='username', password='demonstration')
        url = reverse_lazy('brands_list')
        response = self.client.get(url)

        self.assertEquals(response.status_code, 200)

    def get_collections_test(self):
        self.client.login(username='username', password='demonstration')
        url = reverse_lazy('collections_list')
        response = self.client.get(url)

        self.assertEquals(response.status_code, 200)
    #
    def get_category_test(self):
        self.client.login(username='username', password='demonstration')
        category_read_url = reverse('category', kwargs={
            "uuid": getattr(self, 'categoryUUID')
        })
        response = self.client.get(category_read_url)

        self.assertEquals(response.status_code, 200)

    def get_brand_test(self):
        self.client.login(username='username', password='demonstration')
        brand_read_url = reverse('brand', kwargs={
            "uuid": getattr(self, 'brandUUID')
        })
        response = self.client.get(brand_read_url)

        self.assertEquals(response.status_code, 200)
    #
    #
    def get_collection_test(self):
        self.client.login(username='username', password='demonstration')
        collection_read_url = reverse('collection', kwargs={
            "uuid": getattr(self, 'collectionUUID')
        })
        response = self.client.get(collection_read_url )

        self.assertEquals(response.status_code, 200)

    def get_product_test(self):
        product_read_url = reverse('collection', kwargs={
            "uuid": getattr(self, 'collectionUUID')
        })
        response = self.client.get(product_read_url)

        self.assertEquals(response.status_code, 200)
