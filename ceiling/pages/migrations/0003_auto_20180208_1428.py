# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-08 11:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_auto_20180125_1636'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='catalogpage',
            options={'verbose_name': 'Страница "Каталог"', 'verbose_name_plural': 'Страница "Каталог"'},
        ),
        migrations.AlterField(
            model_name='catalogpage',
            name='brands',
            field=models.ManyToManyField(blank=True, help_text='Бренды, которые будут отображаться на странице "Акции".', related_name='brands_of_catalog', to='catalog.Brand', verbose_name='Бренды каталога'),
        ),
        migrations.AlterField(
            model_name='catalogpage',
            name='categories',
            field=models.ManyToManyField(blank=True, help_text='Категории, которые будут отображаться на странице "Акции".', related_name='categories_of_catalog_page', to='catalog.Category', verbose_name='Категории каталога'),
        ),
    ]
