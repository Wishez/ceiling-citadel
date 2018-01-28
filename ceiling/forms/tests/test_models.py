# -*- coding: utf-8 -*-
from django.test import TestCase
from ..models import *
from model_mommy import mommy
from django.utils.timezone import now
from home.models import Settings

class OrderTestModel(TestCase):
    def setUp(self):
        self.order = mommy.make(
            Order,
            _fill_optional=True,
            created=now(),
            modified=now(),
        )
        self.settings = Settings.objects.create()

        self.settings.save()
    def create_order_test(self):
        self.assertEquals(self.order.id, 1)


    def get_ordered_products_test(self):
        ordered_product = mommy.make(
            "personal_data.OrderedProduct",
            _fill_optional=True,
            created=now(),
            modified=now()
        )
        self.order.ordered_products.add(ordered_product)
        self.settings = Settings.objects.create()
        self.settings.save()

        ordered_products = Order.objects.get_ordered_products(self.order)
        self.assertEquals(
            len(ordered_products),
            1
        )
        self.assertEquals(
            type(ordered_products),
            list
        )
    def remove_ordered_product_from_order_test(self):
        order = self.order
        ordered_product = mommy.make(
            "personal_data.OrderedProduct",
            _fill_optional=True,
            created=now(),
            modified=now(),
        )

        order.ordered_products.add(ordered_product)

        self.assertEquals(
            order.ordered_products.all().count(),
            1
        )
        Order.objects.remove_ordered_product_from_order(
            self.order,
            ordered_product.uuid
        )
        self.assertEquals(
            order.ordered_products.all().count(),
            0
        )

    def create_and_put_ordered_product_to_order_test(self):
        product = mommy.make(
            'catalog.Product',
            _fill_optional=True,
            created=now(),
            modified=now(),
            slug='new_product_2018'
        )

        data = {
            "width": "от 10 мм до 250 мм",
            "height": "8мм",
            "length": "от 1м до 10м",
            "thickness": "от 1 мм до 1,5 мм",
            "combustibility": mommy.make('home.Combustibility'),
            "acoustics": mommy.make('home.Acoustics'),
            "lightning": mommy.make('home.Lightning'),
            "edges": mommy.make('home.Edge'),
            "material": mommy.make('home.Material'),
            "colors": mommy.make('home.Color')
        }

        Order.objects.create_and_put_ordered_product_to_order(
            self.order,
            product.uuid,
            data
        )

        self.assertEquals(
            self.order.ordered_products.all().count(),
            1
        )

    def delete_order_test(self):
        self.order.delete()

class QuestionTestModel(TestCase):
    def setUp(self):
        self.question = mommy.make(
            Question,
            _fill_optional=True,
            created=now(),
            modified=now(),
            status='Генерируется'
        )

    def create_question_test(self):
        self.assertEquals(self.question.id, 1)

    def question_data_test(self):
        self.assertEquals(self.question.consumer.id, 1)
        self.assertEquals(self.question.status, 'Генерируется')
        self.assertEquals(type(self.question.question), str)


    def delete_question_test(self):
        self.question.delete()

class CallbackTestModel(TestCase):
    def setUp(self):
        self.callback = mommy.make(
            Callback,
            _fill_optional=True,
            created=now(),
            modified=now(),
            status='Новый'
        )

    def create_callback_test(self):
        self.assertEquals(self.callback.id, 1)

    def callback_data_test(self):
        callback = self.callback
        self.assertEquals(callback.consumer.id, 1)
        self.assertEquals(callback.status, 'Новый')

    def delete_callback_test(self):
        self.callback.delete()


