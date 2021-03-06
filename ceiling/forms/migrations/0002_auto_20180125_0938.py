# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-25 06:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.TextField(blank=True, help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">example.com.</span><br/><div>', max_length=1000, null=True, verbose_name='Ответ на вопрос'),
        ),
        migrations.AlterField(
            model_name='question',
            name='answer_subject',
            field=models.TextField(blank=True, help_text='<div class="variablesHint">Доступные переменные:<br/><br/><span class="variable">{{first_name}}</span> &mdash; <span class="helpText">Иван</span><br/><span class="variable">{{last_name}}</span> &mdash; <span class="helpText">Иванович</span><br/><span class="variable">{{middle_name}}</span> &mdash; <span class="helpText">Иванов</span><br/><span class="variable">{{full_name}}</span> &mdash; <span class="helpText">Иван Иванович</span><br/><span class="variable">{{site}}</span> &mdash; <span class="helpText">example.com.</span><br/> <span class="variable">{{consultant_num}}</span> &mdash; <span class="helpText">123456789</span><br/><span class="variable">{{refferal_ur}}</span> &mdash; <span class="helpText">cosmeticsyou.ru/registration/123456789</span><br/><span class="variable">{{url_to_personal_room}}</span> &mdash; <span class="helpText">pcosmeticsyou.ru/personal_room/123456789</span><br/></div>', max_length=150, null=True, verbose_name='Тема email сообщения'),
        ),
    ]
