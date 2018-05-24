# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel
from home.help_parts import simple_hint, answer_hint, ordered_products_hint
from colorfield.fields import ColorField

class Settings(TimeStampedModel):
    # Additional content
    widgets = models.TextField(
        _('Метрики, виджеты и прочее'),
        max_length=8196,
        blank=True,
        null=True
    )

    is_tests_included = models.BooleanField(
        _('Включить front-end тесты?'),
        default=False
    )

    tests_file_name = models.CharField(
        _('Имя файла тестов'),
        max_length=100,
        blank=True,
        null=True,
        help_text="Пример: tests.hashname.js"
    )

    help_text = "Если нет имени файла, то тесты не загрузятся."
    meta = models.TextField(
        _('Глобальное мета описание'),
        max_length=300,
        blank=True,
        null=True,
        help_text="Для каждый страницы делать лучше уникальное описание."
    )
    # Contacts
    email = models.CharField(
        _('Email'),
        max_length=200,
        blank=True,
        null=True,
        default='support@artceilingsystem.ru'
    )
    phone = models.CharField(
        _('Телефон'),
        max_length=90,
        blank=True,
        null=True,
        default='+7 (985) 905-12-51'
    )
    city = models.CharField(
        _('Город'),
        max_length=100,
        blank=True,
        null=True,
        default='г. Москва'
    )
    address = models.CharField(
        _('Адрес'),
        max_length=200,
        blank=True,
        null=True,
        default='Шумкина д. 20 стр. 1'
    )
    addressHref = models.CharField(
        _('Ссылка перенаправляющая на карты(Google/Yandex)'),
        max_length=500,
        blank=True,
        null=True,
        default="https://www.google.ru/maps/place/%D1%83%D0%BB.+%D0%A8%D1%83%D0%BC%D0%BA%D0%B8%D0%BD%D0%B0,+20%D1%811,+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,+107113/@55.787223,37.6687383,17z/data=!3m1!4b1!4m5!3m4!1s0x46b53584d0651261:0xba525273abdde888!8m2!3d55.787223!4d37.670927"
    )
    # Sms service
    account_sid = models.CharField(
        _('Account Sid'),
        max_length=350,
        blank=True,
        null=True,
        default="",
        help_text="Account Sid из аккаунта TwilioAPI"
    )
    auth_token = models.CharField(
        _('Auth Token'),
        max_length=350,
        blank=True,
        null=True,
        default="",
        help_text="Auth Token из аккаунта TwilioAPI"
    )

    phone_from = models.CharField(
        _('Телефон для отправки сообщений'),
        max_length=20,
        blank=True,
        null=True,
        default="+17609068017"
    )
    phones_to = models.TextField(
        _('Телефоны для отправления сообщений'),
        max_length=1000,
        blank=True,
        null=True,
        default="+79859051251",
        help_text='Указывайте телефоны через запятую +7000999222,+7222111333'
    )
    question_asked_message = models.TextField(
        _('Сообщение на телефон, с вопросом пользователя'),
        max_length=1000,
        blank=True,
        null=True,
        default="Панель администрирования пополнилась новым консультаном!",
        help_text=answer_hint
    )
    callback_called_message = models.TextField(
        _('Оповещение на телфон с обратным вызовом'),
        max_length=1000,
        blank=True,
        null=True,
        default="{{last_name}} {{first_name}} {{middle_name}} хочет связаться с вами!"
                'Его контактный телефон {{phone}}.',
        help_text=simple_hint
    )
    order_ordered_message = models.TextField(
        _('Оповещение на телфон о новом заказе'),
        max_length=1000,
        blank=True,
        null=True,
        default="{{last_name}} {{first_name}} {{middle_name}} сделал заказ!"
                'Его можно обработать по этой ссылке {{site}}/ссылка-до-заказа.',
        help_text=ordered_products_hint
    )

    # Notifications
    after_success_closing_order_subject = models.CharField(
        _('Тема сообщения после смена статуса заказа на «Успешно Завершён»'),
        help_text=_(
            simple_hint
        ),
        max_length=200,
        default='Успешно Завершён'
    )

    after_success_closing_order_message = models.TextField(
        _('Сообщение после смена статуса заказа на «Успешно Завершён»'),
        max_length=3200,
        help_text=_(
            simple_hint
        ),
        default=_('{{first_name}} {{last_name}}, нам было приятно с вами сотрудничать' 
                  'и мы хотим дать вам крепкое рукопожатие, выcказав'
                  'им наилучшие пожелания! '
                  ''
                  'Мы надеемся на скорую встречу с вами в будущем;).'
        )
    )

    after_ordering_order_subject = models.CharField(
        _('Тема сообщения человека оформившего заказ'),
        help_text=_(
            simple_hint
        ),
        max_length=200,
        default='{{first_name}}, заказ оформлен!'
    )
    after_ordering_order_message = models.TextField(
        _('Сообщение для человека оформившего заказ'),
        max_length=3200,
        help_text=_(
            ordered_products_hint
        ),
        default=_('Здравствуйте, {{first_name}} {{last_name}}!'
                'Мы получили ваш заказ и задокументировали его. '
                ''
                'Вы заказали: '
                '{{ordered_products}}'
                ' '
                'В любом случае, мы свяжемся с вами, чтобы подтвердить задокументированное;).'
                'С уважением, Наша-великолепная-команда-обработки-заказов.')

    )

    change_status_order_in_process_subject = models.CharField(
        _('Тема сообщения, после смена статуса заказа на «В процессе»'),
        help_text=_(
            simple_hint
        ),
        max_length=200,
        default='Перехватили ваш заказ, {{first_name}}!'
    )
    change_status_order_in_process_message = models.TextField(
        _('Сообщение, после смена статуса заказа на «В процессе»'),  # Сообщение для консультанта при смене номера консультаната
        max_length=3200,
        help_text=_(
            simple_hint
        ),
        default=_('Здравствуйте, {{first_name}} {{last_name}}!' 
                ''
                'Мы узрели ваш заказ и готовы с головой погрузиться в него!' 
                'В скором времени, ожидайте звонка;).'
                ''
                'С уважением, Наша-великолепная-команда-по-смене-статуса-заказа.')
    )


    def __str__(self):
        return 'Глобальная настройка'
    class Meta:
        db_table='site_settings'
        verbose_name = _('Глобальные Настройки')
        verbose_name_plural = _('Глобальные Настройки')

# Characteristics
class DropdownCharacteristics(TimeStampedModel):
    name = models.CharField(_('Наименование'), max_length=100)

    def __str__(self):
        return self.name
    class Meta:
        abstract = True
class Combustibility(DropdownCharacteristics):
    class Meta:
        db_table = 'item_combustibility'
        verbose_name = _('Горючесть')
        verbose_name_plural = _('Горючесть')
class Acoustics(DropdownCharacteristics):
    class Meta:
        db_table = 'item_acoustics'
        verbose_name = _('Акустика')
        verbose_name_plural = _('Акустика')
class Lightning(DropdownCharacteristics):
    class Meta:
        db_table = 'item_lightning'
        verbose_name = _('Освящение')
        verbose_name_plural = _('Освящение')
class Edge(DropdownCharacteristics):
    class Meta:
        db_table = 'item_edges'
        verbose_name = _('Кромка')
        verbose_name_plural = _('Кромки')

class Material(DropdownCharacteristics):
    class Meta:
        db_table = 'item_material'
        verbose_name = _('Материал')
        verbose_name_plural = _('Материалы')
class Color(DropdownCharacteristics):
    color = ColorField(_('Цвет'), default='#ffffff')
    class Meta:
        db_table = 'item_color'
        verbose_name = _('Цвет')
        verbose_name_plural = _('Цвета')

class Proportion(DropdownCharacteristics):

    class Meta:
        db_table = 'item_proportions'
        verbose_name = _('Пропорции')
        verbose_name_plural = _('Пропорции')