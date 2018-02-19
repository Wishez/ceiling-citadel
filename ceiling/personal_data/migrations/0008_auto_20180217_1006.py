# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-17 07:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personal_data', '0007_auto_20180211_0928'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderedproduct',
            name='angle_of_bend',
            field=models.IntegerField(blank=True, help_text='Целочисленное значение, к примеру: 30', null=True, verbose_name='Минимальный угол загиба'),
        ),
        migrations.AddField(
            model_name='orderedproduct',
            name='diameter',
            field=models.CharField(blank=True, help_text='Пример: от 50 мм до 150 мм', max_length=100, null=True, verbose_name='Диаметр окружности'),
        ),
        migrations.AddField(
            model_name='orderedproduct',
            name='step_between_panels',
            field=models.CharField(blank=True, help_text='Пример: от 100 мм до 1000 мм', max_length=100, null=True, verbose_name='Шаг между панелями'),
        ),
    ]
