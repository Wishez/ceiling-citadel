# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-17 07:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_settings_meta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settings',
            name='after_ordering_order_message',
            field=models.TextField(default='Здравствуйте, {{first_name}} {{last_name}}!Мы получили ваш заказ и задокументировали его. Вы заказали: {{ordered_products}} В любом случае, мы свяжемся с вами, чтобы подтвердить задокументированное;).С уважением, Наша-великолепная-команда-обработки-заказов.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><span class="variable">{{ordered_products}}</span> &mdash; <span class="helpText">Заказанные прдеметы</span><br/><div>', max_length=3200, verbose_name='Сообщение для человека оформившего заказ'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='after_ordering_order_subject',
            field=models.CharField(default='{{first_name}}, заказ оформлен!', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><div>', max_length=200, verbose_name='Тема сообщения человека оформившего заказ'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='after_success_closing_order_message',
            field=models.TextField(default='{{first_name}} {{last_name}}, нам было приятно с вами сотрудничатьи мы хотим дать вам крепкое рукопожатие, выcказавим наилучшие пожелания! Мы надеемся на скорую встречу с вами в будущем;).', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><div>', max_length=3200, verbose_name='Сообщение после смена статуса заказа на «Успешно Завершён»'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='after_success_closing_order_subject',
            field=models.CharField(default='Успешно Завершён', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><div>', max_length=200, verbose_name='Тема сообщения после смена статуса заказа на «Успешно Завершён»'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='callback_called_message',
            field=models.TextField(blank=True, default='{{last_name}} {{first_name}} {{middle_name}} хочет связаться с вами!Его контактный телефон {{phone}}.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><div>', max_length=1000, null=True, verbose_name='Оповещение на телфон с обратным вызовом'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='change_status_order_in_process_message',
            field=models.TextField(default='Здравствуйте, {{first_name}} {{last_name}}!Мы узрели ваш заказ и готовы с головой погрузиться в него!В скором времени, ожидайте звонка;).С уважением, Наша-великолепная-команда-по-смене-статуса-заказа.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><div>', max_length=3200, verbose_name='Сообщение, после смена статуса заказа на «В процессе»'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='change_status_order_in_process_subject',
            field=models.CharField(default='Перехватили ваш заказ, {{first_name}}!', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><div>', max_length=200, verbose_name='Тема сообщения, после смена статуса заказа на «В процессе»'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='order_ordered_message',
            field=models.TextField(blank=True, default='{{last_name}} {{first_name}} {{middle_name}} сделал заказ!Его можно обработать по этой ссылке {{site}}/ссылка-до-заказа.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><span class="variable">{{ordered_products}}</span> &mdash; <span class="helpText">Заказанные прдеметы</span><br/><div>', max_length=1000, null=True, verbose_name='Оповещение на телфон о новом заказе'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='question_asked_message',
            field=models.TextField(blank=True, default='Панель администрирования пополнилась новым консультаном!', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">artceiling-systems.ru.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика(Может отсутствовать)</span><br/><span class="variable">{{email}}</span> &mdash; <span class="helpText">Email заказчика(Может отсутствовать)</span><br/><span class="variable">{{question}}</span> &mdash; <span class="helpText">Вопрос заказчика</span><br/><span class="variable">{{answer}}</span> &mdash; <span class="helpText">Ваш ответ.</span><br/><div>', max_length=1000, null=True, verbose_name='Сообщение на телефон, с вопросом пользователя'),
        ),
    ]
