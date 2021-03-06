# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-25 13:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0010_auto_20180125_1636'),
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='catalogpage',
            name='brands',
            field=models.ManyToManyField(blank=True, help_text='Акции, которые будут отображаться на странице "Акции".', related_name='brands_of_catalog', to='catalog.Brand', verbose_name='Бренды каталога'),
        ),
        migrations.AddField(
            model_name='catalogpage',
            name='categories',
            field=models.ManyToManyField(blank=True, help_text='Акции, которые будут отображаться на странице "Акции".', related_name='categories_of_catalog_page', to='catalog.Category', verbose_name='Категории каталога'),
        ),
    ]
