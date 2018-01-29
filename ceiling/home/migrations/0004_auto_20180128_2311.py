# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-28 20:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20180128_1352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settings',
            name='callback_called_message',
            field=models.TextField(blank=True, default='{{last_name}} {{first_name}} {{middle_name}} хочет связаться с вами!Его контактный телефон {{phone}}.', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">example.com.</span><br/><span class="variable">{{phone_number}}</span> &mdash; <span class="helpText">Телефон заказчика.</span><br/><div>', max_length=1000, null=True, verbose_name='Оповещение на телфон с обратным вызовом'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='question_asked_message',
            field=models.TextField(blank=True, default='Панель администрирования пополнилась новым консультаном!', help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">example.com.</span><br/><span class="variable">{{question}}</span> &mdash; <span class="helpText">Вопрос заказчика.</span><br/><span class="variable">{{answer}}</span> &mdash; <span class="helpText">Ваш ответ.</span><br/><div>', max_length=1000, null=True, verbose_name='Сообщение на телефон, с вопросом пользователя'),
        ),
    ]