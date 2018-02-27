# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-19 08:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_proportion'),
        ('personal_data', '0009_orderedproduct_ceil_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderedproduct',
            name='proportions',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Proportion', verbose_name='Пропорции'),
        ),
    ]
