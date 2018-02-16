# -*- coding: utf-8 -*-
from myadmin.admin import admin_site
from django.contrib import admin
from singlemodeladmin import SingleModelAdmin
from .models import *

@admin.register(Settings, site=admin_site)
class SettingsAdmin(SingleModelAdmin):
    fieldsets = (
        ('Настройка информации сайта', {
            'fields': (
                ('widgets',),
                ('meta',),
            ),
        },),
        ('Настройка контактной информации', {
            'fields': (
                ('email', 'phone',),
                ('city', 'address',),
                ('addressHref',),
            ),
        },),
        ('Настройка отправки сообщений', {
            'fields': (
                ('account_sid',),
                ('auth_token',),
                ('phone_from',),
                ('phones_to',),
            ),
        },),
        ('Сообщения на телефон', {
            'fields': (
                ('question_asked_message',),
                ('callback_called_message',),
                ('order_ordered_message',),
            )
        }),
        ('Сообщения на email', {
            'fields': (
                ('after_success_closing_order_subject',),
                ('after_success_closing_order_message',),
                ('after_ordering_order_subject',),
                ('after_ordering_order_message',),
                ('change_status_order_in_process_subject',),
                ('change_status_order_in_process_message',),
            ),
        }),
    )
@admin.register(Color, site=admin_site)
class ColorAdminModel(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('name',)
@admin.register(Material, site=admin_site)
class MaterialAdminModel(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('name',)
@admin.register(Combustibility, site=admin_site)
class CombustibilityAdminModel(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('name',)
@admin.register(Lightning, site=admin_site)
class LightningAdminModel(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('name',)
@admin.register(Edge, site=admin_site)
class EdgeAdminModel(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('name',)
@admin.register(Acoustics, site=admin_site)
class AcousticsAdminModel(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ('name',)




