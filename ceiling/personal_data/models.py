# -*- encoding: utf-8 -*-

from model_utils.models import TimeStampedModel
import uuid as uuid_lib
from django.db import models
from django.utils.translation import gettext_lazy as _
from catalog.models import Product, BaseProductModel
from django.db.models.signals import pre_save
from django.dispatch import receiver

class ConsumerManager(models.Manager):
    use_for_related_fields = True

    def is_consumer(self, email, first_name, last_name, **kwargs):
        return self.filter(email=email, first_name=first_name, last_name=last_name, **kwargs)
    def get_full_name(self, consumer):
        return '%s %s %s' % (getattr(consumer, "last_name", ""),
                             getattr(consumer, "first_name", ""),
                             getattr(consumer, "middle_name", ""))

class Consumer(TimeStampedModel):
    last_name = models.CharField(_('Фамилия'), max_length=36)
    first_name = models.CharField(_('Имя'), max_length=32)
    middle_name = models.CharField(_('Отчество'), max_length=32, blank=True, null=True)
    phone_number = models.CharField(_('Номер телефона'), max_length=26)
    email = models.EmailField(_('Email'), max_length=150)
    requisites = models.CharField(_('Реквизиты'), max_length=100)
    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    def __str__(self):
        return '%s %s' % (self.last_name, self.first_name)
    class Meta:
        db_table = 'site_consumers'
        verbose_name = _('Консультант')
        verbose_name_plural = _('Консультанты')


class OrderedProduct(BaseProductModel):
    product = models.ForeignKey(
        Product,
        related_name="ordered_product",
        verbose_name=_('Продукт')
    )

    quantity = models.IntegerField(
        _('Количество продукта'),
        default=1
    )

    full_price = models.DecimalField(
        _('Общая цена'),
        editable=False,
        null=True,
        blank=True,
        max_digits=12,
        decimal_places=2
    )

    class Meta:
        db_table = 'consumers_ordered_products'
        verbose_name = _('Консультант')
        verbose_name_plural = _('Консультанты')

@receiver(pre_save, sender=OrderedProduct)
def count_whole_price_of_ordered_product(sender, instance, **kwargs):
    price = instance.product.price
    if price:
        instance.full_price = price * instance.quntity