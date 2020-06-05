# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-25 10:16
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0003_auto_20180125_1304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_id',
            field=models.CharField(blank=True, default=uuid.uuid4, max_length=90, null=True, unique=True, verbose_name='Номер заказа'),
        ),
    ]