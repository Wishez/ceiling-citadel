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

    def fill_name_by_fields_and_save(self, instance, full_name):
        shared_name = full_name.split(' ')
        if len(shared_name) < 2:
            return False

        setattr(instance, 'last_name', shared_name[0])
        setattr(instance, 'first_name', shared_name[1])
        setattr(instance, 'middle_name', shared_name[2] or "")

        instance.save()

    def is_consumer(self, first_name, last_name, **kwargs):
        return self.filter(first_name=first_name, last_name=last_name, **kwargs)
    def get_full_name(self, consumer):
        return '%s %s %s' % (getattr(consumer, "last_name", ""),
                             getattr(consumer, "first_name", ""),
                             getattr(consumer, "middle_name", ""))

class Consumer(TimeStampedModel):
    last_name = models.CharField(_('Фамилия'), max_length=36)
    first_name = models.CharField(_('Имя'), max_length=32)
    middle_name = models.CharField(_('Отчество'), max_length=32, blank=True, null=True)
    phone_number = models.CharField(
        _('Номер телефона'),
        max_length=26,
        blank=True,
        null=True
    )
    email = models.EmailField(
        _('Email'),
        max_length=150,
        blank=True,
        null=True
    )
    requisites = models.CharField(
        _('Реквизиты'), max_length=100,
        blank=True,
        null=True
    )
    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    objects = ConsumerManager()

    def __str__(self):
        return '%s %s' % (self.last_name, self.first_name)
    class Meta:
        db_table = 'site_consumers'
        verbose_name = _('Заказчик')
        verbose_name_plural = _('Заказчики')


class OrderedProduct(BaseProductModel):
    combustibility = models.ForeignKey(
        "home.combustibility",
        verbose_name=_("Горючесть"),
        default=None
    )
    acoustics = models.ForeignKey(
        "home.acoustics",
        verbose_name=_("Акустика"),
        default=None
    )
    lightning = models.ForeignKey(
        "home.lightning",
        verbose_name=_("Освящение"),
        default=None
    )
    edges = models.ForeignKey(
        "home.edge",
        verbose_name=_("Кромки"),
        default=None
    )
    material = models.ForeignKey(
        "home.material",
        verbose_name=_("Материал"),
        default = None
    )
    colors = models.ForeignKey(
        "home.color",
        verbose_name=_("Цвет"),
        default=None
    )
    product = models.ForeignKey(
        Product,
        related_name="ordered_product",
        verbose_name=_('Продукт')
    )

    quantity = models.IntegerField(
        _('Количество'),
        default=1
    )

    full_price = models.DecimalField(
        _('Общая цена'),
        editable=True,
        null=True,
        blank=True,
        max_digits=18,
        decimal_places=2,
        help_text=_('Расчитывается автоматически. Зависит от установленной цены продукта и оформленного количества.')
    )
    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    def __str__(self):
        return self.product.__str__()
    class Meta:
        db_table = 'consumers_ordered_products'
        verbose_name = _('Оформленный продукт')
        verbose_name_plural = _('Оформленные продукты')

@receiver(pre_save, sender=OrderedProduct)
def count_whole_price_of_ordered_product(sender, instance, **kwargs):
    price = instance.product.price
    if price:
        instance.full_price = price * instance.quantity