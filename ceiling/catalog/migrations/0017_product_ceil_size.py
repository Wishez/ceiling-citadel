# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-17 10:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0016_auto_20180217_1006'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='ceil_size',
            field=models.CharField(blank=True, help_text='Пример: от 5мм до 50 мм', max_length=100, null=True, verbose_name='Размер ячеек'),
        ),
    ]
