# -*- encoding: utf-8 -*-
from django.test import TestCase
from django.utils import timezone
from catalog.models import *
from model_mommy import mommy
# import json
# from django.urls import reverse


class BrandTestModel(TestCase):
    def setUp(self):
        self.brand = mommy.make(
            Brand,
            _fill_optional=True,
            created=timezone.now(),
            modified=timezone.now()
        )

    def create_brand_test(self):
        self.assertEquals(self.brand.id, 1)

    def m2m_brand_test(self):
        self.brand.categories.add(mommy.make(Category))
        self.assertEquals(len(self.brand.categories.all()), 1)

        self.brand.collections.add(mommy.make(Collection))
        self.brand.collections.add(mommy.make(Collection, slug="super_collection_2018"))
        self.assertEquals(len(self.brand.collections.all()), 2)

    def single_relation_brand_test(self):
        self.assertEquals(self.brand.preview.id, 1)

    def delete_brand_test(self):
        self.brand.delete()

class CategoryTestModel(TestCase):
    def setUp(self):

        self.category = mommy.make(
            Category,
            _fill_optional=True,
            created=timezone.now(),
            modified=timezone.now()
        )

    def create_category_test(self):
        self.assertEquals(self.category.id, 1)

    def m2m_category_test(self):
        self.category.brands.add(mommy.make(Brand))
        self.assertEquals(len(self.category.brands.all()), 1)

        self.category.collections.add(mommy.make(Collection))
        self.assertEquals(len(self.category.collections.all()), 1)

        self.category.products.add(mommy.make(Product))
        self.category.products.add(mommy.make(Product, slug='awesome_product'))
        self.assertEquals(len(self.category.products.all()), 2)

    def single_relation_category_test(self):
        self.assertEquals(self.category.preview.id, 1)
        self.assertEquals(self.category.section.id, 1)

    def delete_category_test(self):
        self.category.delete()

class CollectionTestModel(TestCase):
    def setUp(self):
        self.collection = mommy.make(
            Collection,
            _fill_optional=True,
            created=timezone.now(),
            modified=timezone.now()
        )
    def create_collection_test(self):
        self.assertEquals(self.collection.id, 1)

    def m2m_collection_test(self):
        self.collection.collection_items.add(mommy.make(Product))
        self.collection.collection_items.add(mommy.make(Product, slug='awesome_product'))
        self.assertEquals(len(self.collection.collection_items.all()), 2)

    def single_relation_collection_test(self):
        self.assertEquals(self.collection.preview.id, 1)
        self.assertEquals(self.collection.brand.id, 1)

    def delete_collection_test(self):
        self.collection.delete()

class ProductTestModel(TestCase):
    def setUp(self):
        self.product = mommy.make(
            Product,
            _fill_optional=True,
            created=timezone.now(),
            modified=timezone.now()
        )
    def create_collection_test(self):
        self.assertEquals(self.product.id, 1)

    def m2m_collection_test(self):
        for gogo in range(4):
            self.product.combustibility.add(mommy.make('home.Combustibility'))
            self.product.acoustics.add(mommy.make('home.Acoustics'))
            self.product.lightning.add(mommy.make('home.Lightning'))
            self.product.edges.add(mommy.make('home.Edge'))
            self.product.material.add(mommy.make('home.Material'))
            self.product.colors.add(mommy.make('home.Color'))

        self.assertEquals(len(self.product.combustibility.all()), 4)
        self.assertEquals(len(self.product.acoustics.all()), 4)
        self.assertEquals(len(self.product.lightning.all()), 4)
        self.assertEquals(len(self.product.colors.all()), 4)
        self.assertEquals(len(self.product.edges.all()), 4)
        self.assertEquals(len(self.product.material.all()), 4)

    def product_characteristics_test(self):
        characteristics = {
            "width": "от 10 мм до 250 мм",
            "height": "8мм",
            "length": "от 1м до 10м",
            "thickness": "от 1 мм до 1,5 мм",
            "title": "Product",
            "meta": "The description of the product.",
            "content": "Additional content in the product's page."
        }

        for characteristic in characteristics.keys():
            value = characteristics[characteristic]
            setattr(self.product, characteristic, value)
            self.assertEquals(getattr(self.product, characteristic), value)

    def single_relation_collection_test(self):
        self.assertEquals(self.product.preview.id, 1)
        self.assertEquals(self.product.album.id, 1)
        self.assertEquals(self.product.visualisation.id, 2)

    def delete_collection_test(self):
        self.product.delete()


