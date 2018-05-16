# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-05-16 10:25
from __future__ import unicode_literals

from django.db import migrations, models
import pages.validators
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0020_collection_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='slug',
            field=models.SlugField(default=uuid.uuid1, help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(default=uuid.uuid1, help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
        migrations.AlterField(
            model_name='collection',
            name='slug',
            field=models.SlugField(default=uuid.uuid1, help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
        migrations.AlterField(
            model_name='product',
            name='slug',
            field=models.SlugField(default=uuid.uuid1, help_text='К примеру, "new-awesome_collection-2018"', max_length=150, unique=True, validators=[pages.validators.validate_slug_field], verbose_name='Ссылка'),
        ),
    ]
