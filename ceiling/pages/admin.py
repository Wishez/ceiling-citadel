# -*- coding: utf-8 -*-
from myadmin.admin import admin_site
from django.contrib import admin
from singlemodeladmin import SingleModelAdmin
from .models import *


# Register your models here.

base_settings_page = ('Базовая настройка страницы', {
                'fields': (
                    ('page_title',),
                    ('meta',),
                ),
            },)

@admin.register(HomePage, site=admin_site)
class HomePageAdmin(SingleModelAdmin):
    fieldsets = (
        base_settings_page,
        ('Контент страницы', {
            'fields': (
                ('brands',),
                ('content',),
            ),
        },),
    )


@admin.register(ContactsPage, site=admin_site)
class ContactsPageAdmin(SingleModelAdmin):
    fieldsets = (
        base_settings_page,
        ('Контент страницы', {
            'fields': (
                ('map',),
                ('content',),
            ),
        },),
    )

@admin.register(CatalogPage, site=admin_site)
class CatalogPageAdmin(SingleModelAdmin):
    fieldsets = (
        base_settings_page,
        ('Контент страницы', {
            'fields': (
                ('brands',),
                ('categories',),
                ('content',),
            ),
        },),
    )




@admin.register(ServicePage, site=admin_site)
class ServicePageAdmin(SingleModelAdmin):
    fieldsets = (
        base_settings_page,
        ('Контент страницы', {
            'fields': (
                ('content',),
            ),
        },),
    )
