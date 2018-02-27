# -*- encoding: utf-8 -*-

import sys
from django.conf import settings
if getattr(settings, 'IS_PRODUCTION', False):
    reload(sys)
    sys.setdefaultencoding('utf-8')

from model_utils.models import TimeStampedModel
import uuid as uuid_lib
from django.db import models
from django.utils.translation import gettext_lazy as _
from personal_data.models import Consumer, OrderedProduct
from home.help_parts import simple_hint, question_hint
from django.db.models.signals import pre_save, post_save, m2m_changed
from django.dispatch import receiver
from django.utils import timezone
from catalog.models import Product
from home.models import \
    Combustibility, \
    Acoustics, \
    Lightning, \
    Edge, \
    Material, \
    Color, \
    Proportion

class Callback(TimeStampedModel):
    consumer = models.ForeignKey(
        "personal_data.consumer",
        verbose_name=_('Заказчик')
    )

    choices = (
        ('Новый', _('Новый')),
        ('Проконсультированный', _('Проконсультированный')),
    )

    status = models.CharField(
        _('Статус обратного вызова'),
        choices=choices,
        max_length=20,
        default=_('Новый')
    )


    def __str__(self):
        return '%s | %s' % (Consumer.objects.get_full_name(self.consumer), self.status)

    class Meta:
        db_table = "user_callbacks"
        verbose_name = _('Обратный вызов')
        verbose_name_plural = _('Обратные вызовы')


class Question(TimeStampedModel):
    consumer = models.ForeignKey(
        "personal_data.consumer",
        verbose_name=_('Заказчик')
    )

    question = models.TextField(
        _('Вопрос'),
        max_length=1024
    )

    answer_subject = models.CharField(
        _('Тема email сообщения'),
        max_length=150,
        blank=True,
        null=True,
        help_text=simple_hint
    )

    answer = models.TextField(
        _('Ответ на вопрос'),
        max_length=1000,
        blank=True,
        null=True,
        help_text=question_hint
    )
    # При изменение на статус "Сгенерирован",
    # ответ отправляется на почту спросившего
    choices = (
        ('Генерируется', _('Генерируется')),
        ('Сгенерирован', _('Сгенерирован')),
    )

    status = models.CharField(
        _('Статус вопроса'),
        choices=choices,
        max_length=20,
        default=_('Генерируется'),
        help_text=_('При смене статуса на "Сгенерирован", ответ отправляется на email задавшего вопрос.')
    )

    def __str__(self):
        return '%s | %s' % (Consumer.objects.get_full_name(self.consumer), self.status)

    class Meta:
        db_table = "user_questions"
        verbose_name = _('Вопрос')
        verbose_name_plural = _('Вопросы')



class OrderManager(models.Manager):
    use_for_related_fields = True

    def remove_ordered_product_from_order(self, instance, uuid):

        item = instance.ordered_products.filter(uuid=uuid)

        if item.exists():
            instance.ordered_products.remove(item[0])
        else:
            return False
    def set_product_characteristics(self, product, data):
        # Foreign keys
        characteristics = (
            ('combustibility', Combustibility,),
            ('colors', Color,),
            ('material', Material,),
            ('acoustics', Acoustics,),
            ('edges', Edge,),
            ('lightning', Lightning,),
            ('proportions', Proportion,),
        )

        proportions = (
            'width',
            'height',
            'thickness',
            'length',
            'quantity',
            'step_between_panels',
            'angle_of_bend',
            'diameter',
            'ceil_size',
        )

        for characteristic in proportions:
            if characteristic in data:
                setattr(product, characteristic, data[characteristic])

        for characteristic, Model in characteristics:
            if characteristic in data:
                instance = Model.objects.filter(name=data[characteristic])

                if instance.exists():
                    setattr(product, characteristic, instance[0])



    def create_and_put_ordered_product_to_order(self, instance, uuid, data):
        product = Product.objects.filter(uuid=uuid)

        if product.exists():

            ordered_product = OrderedProduct.objects.create(
                product=product[0]
            )

            self.set_product_characteristics(
                ordered_product,
                data
            )

            ordered_product.save()

            instance.ordered_products.add(ordered_product)
        else:
            print("Doesn't exist")

    def get_ordered_products(self, instance):
        ordered_products = []

        for ordered_product in instance.ordered_products.all():
            ordered_products.append(ordered_product)

        return ordered_products

class Order(TimeStampedModel):
    consumer = models.ForeignKey(
        "personal_data.consumer",
        verbose_name=_('Заказчик')
    )
    ordered_products = models.ManyToManyField(
        "personal_data.orderedproduct",
        verbose_name=_('Заказанные предметы'),
        related_name='products_of_order'
    )

    price_will_be_counted = models.BooleanField(
        _('Автоматически рассчитывать цену?'),
        default=True,
        help_text='При отключение, цена не будет расчитываться.'
    )
    discount = models.DecimalField(
        _('Скидка'),
        null=True,
        blank=True,
        max_digits=5,
        decimal_places=2,
        default=0,
        help_text=_('Влияет на цену. Скидка - процентное значение.')
    )

    order_price = models.DecimalField(
        _('Цена заказа'),
        null=True,
        blank=True,
        max_digits=14,
        decimal_places=2,
        help_text=_('Если включена галочка автоматического расчёта цены, '
                    'то цена, которую вы установите будет замененна на рассчитанную.<br/>'
                    'Обновляется после сохранения.')
    )
    choices = (
        ('Новый', _('Новый')),
        ('В процессе', _('В процессе')),
        ('Успешно завершён', _('Успешно завершён')),
        ('Архивирован', _('Архивирован')),
    )

    status = models.CharField(
        _('Статус заказа'),
        choices=choices,
        max_length=20,
        default=_('Новый'),
        help_text=_('При смене статуса на "В процессе" или на "Успешно завершён" '
                    'заказчику отправляется сообщение указанное в "Настройках".')
    )
    order_id = models.CharField(
        _('Номер заказа'),
        default=uuid_lib.uuid4,
        max_length=90,
        blank=True,
        null=True,
        unique=True
    )

    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    # Notifications
    after_success_closing_order_subject = models.CharField(
        _('Тема сообщения после смена статуса заказа на «Успешно Завершён»'),
        help_text=_(
            'Если вы не определите тему сообщения, то будет использоваться глобальный шаблон из глобальных настроек.<br/>' +
            simple_hint
        ),
        max_length=200,
        default='',
        blank=True,
        null=True
    )

    after_success_closing_order_message = models.TextField(
        _('Сообщение после смена статуса заказа на «Успешно Завершён»'),
        max_length=3200,
        help_text=_(
            'Если вы оставите сообщение пустым, то будет использоваться глобальный шаблон из глобальных настроек.<br/>' +
            simple_hint
        ),
        default='',
        blank=True,
        null=True
    )

    change_status_order_in_process_subject = models.CharField(
        _('Тема сообщения, после смена статуса заказа на «В процессе»'),
        help_text=_(
            'Если вы не определите тему сообщения, то будет использоваться глобальный шаблон из глобальных настроек.<br/>' +
            simple_hint
        ),
        max_length=200,
        default='',
        blank=True,
        null=True
    )
    change_status_order_in_process_message = models.TextField(
        _('Сообщение, после смена статуса заказа на «В процессе»'),
        # Сообщение для консультанта при смене номера консультаната
        max_length=3200,
        help_text=_(
            'Если вы оставите сообщение пустым, то будет использоваться глобальный шаблон из глобальных настроек.<br/>' +
            simple_hint
        ),
        default='',
        blank=True,
        null=True
    )

    objects = OrderManager()

    def __str__(self):
        return '%s | %s' % (Consumer.objects.get_full_name(self.consumer), self.status)
    class Meta:
        db_table = "user_orders"
        verbose_name = _('Заказ')
        verbose_name_plural = _('Заказы')

@receiver(pre_save, sender=Order)
def count_whole_price_of_ordered_product(sender, instance, **kwargs):
    if instance.pk is None:
        instance.pk = sender.objects.all().count() + 1

    if instance.price_will_be_counted:
        order_price = 0

        for product in instance.ordered_products.all():
            order_price += product.full_price or 0

        # Count order_price with discount.
        discount = instance.discount
        # if discount:
        #     order_price = order_price - (order_price / 100 * discount)

        instance.order_price = order_price
        return True

