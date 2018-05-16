# -*- coding: utf-8 -*-
from django.test import TestCase
from model_mommy import mommy
from django.utils.timezone import now
from django.urls import reverse_lazy
from forms.models import *
from forms.views import make_order
from home.models import Settings
import uuid

class Request:
    def __init__(self, data, method='POST'):
        setattr(self, method.upper(), data)
        self.method = method

class FormsViewsTestModel(TestCase):
    def setUp(self):
        self.order_callback_url = reverse_lazy('callback')
        self.make_order_url = reverse_lazy('order')
        self.ask_question_url = reverse_lazy('question')
        self.settings = Settings.objects.create()

        self.settings.save()

    def order_view_test(self):
        products = []
        slug_fields = ['one', 'two', 'three', 'four']
        for i in range(4):
            product = mommy.make(
                "catalog.Product",
                _fill_optional=True,
                slug=uuid.uuid4(),
                created=now(),
                modified=now()
            )
            data = {
                "combustibility": mommy.make('home.Combustibility'),
                "acoustics": mommy.make('home.Acoustics'),
                "lightning": mommy.make('home.Lightning'),
                "edges": mommy.make('home.Edge'),
                "material": mommy.make('home.Material'),
                "colors": mommy.make('home.Color'),
                "width": u"100",
                "height": u"8",
                "length": u"4",
                "thickness": u"1.5",
                "quantity": i,
                "uuid": u"%s" % product.uuid
            }

            products.append(data)

        self.assertEquals(type(products), list)
        self.assertEquals(type(products[0]), dict)

        new_request = Request({
            'full_name': "Zhuravlev Filipp",
            "email": 'shininigfinger@list.ru',
            "phone_number": '+7 (985) 905-12-51',
            "products": products,
            "isTest": True,
        })
        make_order(new_request)

    def callback_view_test(self):
        self.client.post(self.order_callback_url, {
            'full_name': "Zhuravlev Filipp",
            "phone_number": '+7 (985) 905-12-51',
            "isTest": True
        })

    def question_view_test(self):
        self.client.post(self.ask_question_url, {
            'full_name': "Zhuravlev Filipp",
            "email": 'shininigfinger@list.ru',
            'question': "Do you write tests with pleasure?",
            "isTest": True
        })
