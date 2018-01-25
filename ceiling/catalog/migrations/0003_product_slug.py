# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-25 07:08
from __future__ import unicode_literals

from django.db import migrations, models
import pages.validators


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_auto_20180125_0938'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.SlugField(default='', help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
    ]
