# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-24 13:55
from __future__ import unicode_literals

import colorfield.fields
from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Acoustics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': 'Акустика',
                'verbose_name_plural': 'Акустика',
                'db_table': 'item_acoustics',
            },
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
                ('color', colorfield.fields.ColorField(default='#ffffff', max_length=18, verbose_name='Цвет')),
            ],
            options={
                'verbose_name': 'Цвет',
                'verbose_name_plural': 'Цвета',
                'db_table': 'item_color',
            },
        ),
        migrations.CreateModel(
            name='Combustibility',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': 'Горючесть',
                'verbose_name_plural': 'Горючесть',
                'db_table': 'item_combustibility',
            },
        ),
        migrations.CreateModel(
            name='Edge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': 'Кромка',
                'verbose_name_plural': 'Кромки',
                'db_table': 'item_edges',
            },
        ),
        migrations.CreateModel(
            name='Lightning',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': 'Освящение',
                'verbose_name_plural': 'Освящение',
                'db_table': 'item_lightning',
            },
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': 'Материал',
                'verbose_name_plural': 'Материалы',
                'db_table': 'item_material',
            },
        ),
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('widgets', models.TextField(blank=True, max_length=8196, null=True, verbose_name='Метрики, виджеты и прочее')),
                ('email', models.CharField(blank=True, default='support@artceilingsystem.ru', max_length=200, null=True, verbose_name='Email')),
                ('phone', models.CharField(blank=True, default='+7 (985) 905-12-51', max_length=90, null=True, verbose_name='Телефон')),
                ('city', models.CharField(blank=True, default='г. Москва', max_length=100, null=True, verbose_name='Город')),
                ('address', models.CharField(blank=True, default='Шумкина д. 20 стр. 1', max_length=200, null=True, verbose_name='Адрес')),
                ('addressHref', models.CharField(blank=True, default='https://www.google.ru/maps/place/%D1%83%D0%BB.+%D0%A8%D1%83%D0%BC%D0%BA%D0%B8%D0%BD%D0%B0,+20%D1%811,+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,+107113/@55.787223,37.6687383,17z/data=!3m1!4b1!4m5!3m4!1s0x46b53584d0651261:0xba525273abdde888!8m2!3d55.787223!4d37.670927', max_length=500, null=True, verbose_name='Ссылка перенаправляющая на карты(Google/Yandex)')),
                ('account_sid', models.CharField(blank=True, default='', help_text='Account Sid из аккаунта TwilioAPI', max_length=350, null=True, verbose_name='Account Sid')),
                ('auth_token', models.CharField(blank=True, default='', help_text='Auth Token из аккаунта TwilioAPI', max_length=350, null=True, verbose_name='Auth Token')),
                ('phone_from', models.CharField(blank=True, default='+17609068017', max_length=20, null=True, verbose_name='Телефон для отправки сообщений')),
                ('phones_to', models.TextField(blank=True, default='+79859051251', help_text='Указывайте телефоны через запятую +7000999222,+7222111333', max_length=1000, null=True, verbose_name='Телефоны для отправления сообщений')),
                ('question_asked_message', models.TextField(blank=True, default='Панель администрирования пополнилась новым консультаном!', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=1000, null=True, verbose_name='Сообщение на телефон, с вопросом пользователя')),
                ('callback_called_message', models.TextField(blank=True, default='{{last_name}} {{first_name}} {{middle_name}} хочет связаться с вами!Его контактный телефон {{phone}}.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=1000, null=True, verbose_name='Оповещение на телфон с обратным вызовом')),
                ('order_ordered_message', models.TextField(blank=True, default='{{last_name}} {{first_name}} {{middle_name}} сделал заказ!Его можно обработать по этой ссылке {{site}}/ссылка-до-заказа.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=1000, null=True, verbose_name='Оповещение на телфон о новом заказе')),
                ('after_success_closing_order_subject', models.CharField(default='Изменили статус регистрации', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=200, verbose_name='Тема сообщения после смена статуса заказа на «Успешно Завершён»')),
                ('after_success_closing_order_message', models.TextField(default='Джон Галт, нам было приятно с вами сотрудничатьи мы хотим дать вам крепкое рукопожатие, выcказавим наилучшие пожелания!Мы надеемся на скорую встречу с вами в будущем;).', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=3200, verbose_name='Сообщение после смена статуса заказа на «Успешно Завершён»')),
                ('after_ordering_order_subject', models.CharField(default='Изменили статус регистрации', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=200, verbose_name='Тема сообщения человека оформившего заказ')),
                ('after_ordering_order_message', models.TextField(default='Здравствуйте, Джон Галт!Мы получили ваш заказ и задокументировали его.Вы заказали:{{items}}В любом случае, мы свяжемся с вами, чтобы подтвердить задокументированное;).С уважением, Наша-великолепная-команда-обработки-заказов.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/> <span class="variable">{{consultant_num}}</span> &mdash; <span class="helpText">123456789</span><br/><span class="variable">{{refferal_ur}}</span> &mdash; <span class="helpText">cosmeticsyou.ru/registration/123456789</span><br/><span class="variable">{{url_to_personal_room}}</span> &mdash; <span class="helpText">pcosmeticsyou.ru/personal_room/123456789</span><br/></div>', max_length=3200, verbose_name='Сообщение для человека оформившего заказ')),
                ('change_status_order_in_process_subject', models.CharField(default='Изменили статус регистрации', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/><div>', max_length=200, verbose_name='Тема сообщения, после смена статуса заказа на «В процессе»')),
                ('change_status_order_in_process_message', models.TextField(default='Здравствуйте, {{first_name}} {{last_name}}!Мы узрели ваш заказ и готовы с головой погрузиться в него!В скором времени, ожидайте звонка;).С уважением, Наша-великолепная-команда-по-смене-статуса-заказа.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{status}}</span> &mdash; <span class="helpText">Зарегистрированный "А"/Новый</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">cosmeticsyou.ru.</span><br/> <span class="variable">{{consultant_num}}</span> &mdash; <span class="helpText">123456789</span><br/><span class="variable">{{refferal_ur}}</span> &mdash; <span class="helpText">cosmeticsyou.ru/registration/123456789</span><br/><span class="variable">{{url_to_personal_room}}</span> &mdash; <span class="helpText">pcosmeticsyou.ru/personal_room/123456789</span><br/></div>', max_length=3200, verbose_name='Сообщение, после смена статуса заказа на «В процессе»')),
            ],
            options={
                'verbose_name': 'Глобальные Настройки',
                'verbose_name_plural': 'Глобальные Настройки',
                'db_table': 'site_settings',
            },
        ),
    ]
