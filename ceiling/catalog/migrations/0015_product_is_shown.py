# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-16 11:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0014_auto_20180216_1313'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_shown',
            field=models.BooleanField(default=True, verbose_name='Отобрзить в каталоге?'),
        ),
    ]
