# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-25 07:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0005_auto_20180125_1035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='album',
            field=models.ForeignKey(blank=True, help_text='Альбом для слайдов.', null=True, on_delete=django.db.models.deletion.CASCADE, to='album.Album', verbose_name='Изображения визуализирующая продукт'),
        ),
        migrations.AlterField(
            model_name='product',
            name='colors',
            field=models.ManyToManyField(blank=True, to='home.Color', verbose_name='Цвет'),
        ),
        migrations.AlterField(
            model_name='product',
            name='content',
            field=models.TextField(blank=True, max_length=8164, null=True, verbose_name='Дополнительный контент'),
        ),
        migrations.AlterField(
            model_name='product',
            name='visualisation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_visualisation', to='album.AlbumImage', verbose_name='Изображение визуализирующая продукт'),
        ),
    ]
