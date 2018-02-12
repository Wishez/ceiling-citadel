# -*- coding: utf-8 -*-
from django.test import TestCase
from ..models import *
from model_mommy import mommy
from django.utils.timezone import now


class ConsumerTestModel(TestCase):
    def setUp(self):
        self.consumer = mommy.make(
            Consumer,
            _fill_optional=True,
            created=now(),
            modified=now(),
            first_name='Hurry',
            last_name='Potter',
            middle_name='Evans-Veres',
            phone_number='+7 (985) 905-12-51',
            email='shiningfinger@list.ru'
        )
    def create_consumer_test(self):
        self.assertEquals(self.consumer.id, 1)
    def data_consumer_test(self):
        consumer = self.consumer

        self.assertEquals(consumer.first_name, 'Hurry')
        self.assertEquals(consumer.last_name, 'Potter')
        self.assertEquals(consumer.middle_name, 'Evans-Veres')
        self.assertEquals(consumer.phone_number, '+7 (985) 905-12-51')
        self.assertEquals(consumer.email, 'shiningfinger@list.ru')

    def check_existent_consumer_test(self):
        self.assertEquals(
            len(Consumer.objects.is_consumer(
                'Albus', 'Dumbledore'
            )),
            0
        )
        consumer = self.consumer
        self.assertEquals(
            len(Consumer.objects.is_consumer(
                getattr(consumer, 'first_name'),
                getattr(consumer, 'last_name')
            )),
            1
        )
    def get_full_name_consumer_test(self):
        consumer = self.consumer
        full_name = {
            "first": consumer.first_name,
            "last": consumer.last_name,
            "middle": consumer.middle_name
        }
        self.assertEquals(
            Consumer.objects.get_full_name(consumer),
            '%(last)s %(first)s %(middle)s' % full_name
        )
    def fill_name_by_fields_test(self):
        consumers = {
            "one_consumer": {
                "full_name": "Last First Middle"
            },
            "two_consumer": {
                "full_name": "Last First",
                "first": "First",
            },
            "three_consumer": {
                "full_name": "403Forbidden",
            }
        }

        for key in consumers.keys():
            new_consumer = Consumer.objects.create()
            tested_consumer = consumers[key]
            tested_consumer["instance"] = Consumer.objects.fill_name_by_fields_and_save(
                new_consumer,
                tested_consumer["full_name"]
            )

        def get_consumer_instance(name):
            return consumers.get(name).get('instance')

        first_consumer = get_consumer_instance('one_consumer')
        second_consumer = get_consumer_instance('two_consumer')
        none_consumer = get_consumer_instance('three_consumer')

        self.assertEquals(first_consumer.first_name, "First")
        self.assertEquals(first_consumer.last_name, "Last")
        self.assertEquals(first_consumer.middle_name, "Middle")

        self.assertEquals(second_consumer.first_name, "First")
        self.assertEquals(second_consumer.last_name, "Last")
        self.assertEquals(second_consumer.middle_name, None)

        self.assertEquals(none_consumer, False)


    def delete_consumer_test(self):
        self.consumer.delete()

class OrderedProductTestModel(TestCase):
    def setUp(self):
        self.product = mommy.make(
            OrderedProduct,
            _fill_optional=True,
            created=now(),
            modified=now(),
            quantity=3
        )

    def create_ordered_product_test(self):
        self.assertEquals(self.product.id, 1)

    def check_whole_product_price_test(self):
        ordered_product = self.product

        product = ordered_product.product
        product.price = 200
        product.save()
        ordered_product.save()

        self.assertEquals(ordered_product.quantity, 3)
        self.assertEquals(ordered_product.full_price, product.price * ordered_product.quantity)

    def ordered_product_characteristics_test(self):
        characteristics = {
            "combustibility": "Огнеупорный",
            "acoustics": "Звукоизалирующий",
            "lightning": "Освящённый",
            "edges": "Угловатый",
            "material": "Железный",
            "colors": "Красный",
        }
        ordered_product = self.product
        for key in characteristics.keys():
            if key != 'edges' or key != 'colors':
                continue

            product_characteristic = characteristics[key]
            setattr(
                ordered_product,
                key,
                mommy.make(
                    'home.%s' % key,
                    name=product_characteristic
                )
            )
            self.assertEquals(
                getattr(
                    getattr(ordered_product, key),
                    'name'
                ),
                product_characteristic
            )



        ordered_product.edges = mommy.make('home.Edge', name=characteristics['edges'])
        ordered_product.colors = mommy.make('home.Color', name=characteristics['colors'])
        self.assertEquals(self.product.colors.name, characteristics['colors'])
        self.assertEquals(self.product.edges.name, characteristics['edges'])

        characteristics = {
            "width": "100",
            "height": "8",
            "length": "4",
            "thickness": "1.5",
        }

        for key in characteristics.keys():
            value = characteristics[key]
            setattr(
                ordered_product,
                key,
                value
            )
            self.assertEquals(
                getattr(ordered_product, key),
                value
            )

    def single_relation_ordered_product_test(self):
        self.assertEquals(self.product.product.id, 1)

    def delete_ordered_product_test(self):
        self.product.delete()

