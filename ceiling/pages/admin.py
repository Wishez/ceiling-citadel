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
                # ('brands',),
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
    )

# @admin.register(SharePage)
# class SaunaPageAdmin(admin.ModelAdmin):
#     list_per_page = 10
#     list_display = ('name', 'gallery',)
#     filter_fields = ('name', 'gallery', )
#     search_fields = ('name', 'gallery',)
#     prepopulated_fields = {'slug': ('title',)}
#     # filter_horizontal = ('schedule', 'services',)
#     fieldsets = (
#         base_settings_page,
#         ('Контент страницы', {
#             'fields': (
#                 ('name', 'slug',),
#                 ('services'),
#                 ('schedule'),
#                 ('gallery',),
#                 ('content',),
#             ),
#         },),
#     )

