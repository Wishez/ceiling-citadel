# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-25 06:38
from __future__ import unicode_literals

from django.db import migrations, models
import pages.validators


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='brand',
            name='slug',
            field=models.SlugField(default='', help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.SlugField(default='', help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
        migrations.AddField(
            model_name='collection',
            name='slug',
            field=models.SlugField(default='', help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
    ]
