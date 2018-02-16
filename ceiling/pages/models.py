# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel
from django.conf import settings

if getattr(settings, 'IS_PRODUCTION', False):
    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')

class PageManager(models.Manager):
    user_for_related_fields = True

class BasePage(TimeStampedModel):
    page_title = models.CharField(
        _('Заголовок'),
        help_text=_('Название страницы во вкладке'),
        max_length=100,
        blank=True,
        null=True
    )
    meta = models.TextField(
        _('META-описание страницы'),
        max_length=300,
        blank=True,
        null=True
    )

    objects = PageManager()

    def __str__(self):
        return self.page_title
    class Meta:
        abstract=True

class HomePage(BasePage):
    brands = models.ManyToManyField(
        "catalog.brand",
        verbose_name=_('Отображаемые бренды'),
        related_name='brands_of_home_page',
        blank=True
    )

    class Meta:
        db_table='data_home_page'
        verbose_name=_('Страница "Главная"')
        verbose_name_plural = _('Страница "Главная"')


class CatalogPage(BasePage):
    brands = models.ManyToManyField(
        "catalog.brand",
        verbose_name=_('Бренды каталога'),
        related_name='brands_of_catalog',
        help_text=_('Бренды, которые будут отображаться на странице "Акции".'),
        blank=True
    )
    #
    categories = models.ManyToManyField(
        "catalog.category",
        verbose_name=_('Категории каталога'),
        related_name='categories_of_catalog_page',
        help_text=_('Категории, которые будут отображаться на странице "Акции".'),
        blank=True
    )

    class Meta:
        db_table = 'data_catalog_page'
        verbose_name = _('Страница "Каталог"')
        verbose_name_plural = _('Страница "Каталог"')


class ContactsPage(BasePage):
    map = models.TextField(
        _('Окно с картой'),
        help_text=_('Карта, которая отображается в контактах'),
        max_length=2048,
        blank=True,
        null=True,
        default='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.346384211085!2d37.66873831593188!3d55.78722298056262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53584d0651261%3A0xba525273abdde888!2z0YPQuy4g0KjRg9C80LrQuNC90LAsIDIw0YExLCDQnNC-0YHQutCy0LAsIDEwNzExMw!5e0!3m2!1sru!2sru!4v1516777576394" width="100%" frameborder="0" style="border:0" allowfullscreen></iframe>'
    )

    class Meta:
        db_table = 'data_contacts_page'
        verbose_name = _('Страница "Контакты"')
        verbose_name_plural = _('Страница "Контакты"')

class ServicePage(BasePage):

    class Meta:
        db_table = 'data_service_page'
        verbose_name = _('Страница "Сервис"')
        verbose_name_plural = _('Страница "Сервис"')