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
from personal_data.models import Consumer
from home.help_parts import variables_text_2, variables_text_1
from django.db.models.signals import pre_save
from django.dispatch import receiver

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
        return self.callback_name

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

    answer_subject = models.TextField(
        _('Тема email сообщения'),
        max_length=150,
        blank=True,
        null=True,
        help_text=variables_text_1
    )

    answer = models.TextField(
        _('Ответ на вопрос'),
        max_length=1000,
        blank=True,
        null=True,
        help_text=variables_text_2
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

    def remove_ordered_item(self, instance, item):

        item = instance.ordered_items.filter(id=item.id)

        if item.exists():
            instance.ordered_items.remove(item[0])

    # Write when the OrderedItem model will be created

    # def add_ordered_item(self, instance, word):
    #     # w, is_created = Word.objects.get_or_create(id=word)
    #     if not is_created:
    #         w.save()
    #     instance.words.add(w)

    def get_words(self, instance):
        ordered_items = []

        for word in instance.ordered_items.all():
            ordered_items.append(word.name)

        return ordered_items

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
        _('Статус вопроса'),
        choices=choices,
        max_length=20,
        default=_('Новый'),
        help_text=_('При смене статуса на "В процессе" или на "Успешно завершён" '
                    'заказчику отправляется сообщение указанное в "Настройках".')
    )
    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    def __str__(self):
        return Consumer.objects.get_full_name(self.consumer)

    class Meta:
        db_table = "user_orders"
        verbose_name = _('Заказ')
        verbose_name_plural = _('Заказы')

@receiver(pre_save, sender=Order)
def count_whole_price_of_ordered_product(sender, instance, **kwargs):
    if instance.price_will_be_counted:
        order_price = 0

        for product in instance.products_of_order.all():
          order_price += product.full_price

        # Count order_price with discount.
        discount = instance.discount
        if discount:
            order_price = order_price - (order_price / 100 * discount)

        instance.order_price = order_price