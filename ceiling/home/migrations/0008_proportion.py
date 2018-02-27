# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-19 08:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_auto_20180217_1006'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proportion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=100, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': 'Пропорции',
                'verbose_name_plural': 'Пропорции',
                'db_table': 'item_proportions',
            },
        ),
    ]
