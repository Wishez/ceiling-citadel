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
                ('meta',)
            ),
        },),
        ('Настройка контактной информации', {
            'fields': (
                ('email', 'phone',),
                ('city', 'address',),
                ('addressHref',),
            ),
        },),
    )
@admin.register(Color, site=admin_site)
class ColorAdminModel(admin.ModelAdmin):
    per_page = 10
@admin.register(Material, site=admin_site)
class MaterialAdminModel(admin.ModelAdmin):
    per_page = 10
@admin.register(Combustibility, site=admin_site)
class CombustibilityAdminModel(admin.ModelAdmin):
    per_page = 10
@admin.register(Lightning, site=admin_site)
class LightningAdminModel(admin.ModelAdmin):
    per_page = 10
@admin.register(Edge, site=admin_site)
class EdgeAdminModel(admin.ModelAdmin):
    per_page = 10
@admin.register(Acoustics, site=admin_site)
class AcousticsAdminModel(admin.ModelAdmin):
    per_page = 10


# class EmailAdmin(admin.ModelAdmin):
#     list_per_page = 10
#     list_display = ('is_active',)
#     fieldsets = (
#         ('Статус регисрации консультанта', {
#             'fields': (
#                 ('change_registration_status_subject'),
#                 ('registered_a'),
#                 ('registered_b'),
#             ),
#         }),
#         ('Номер консультанта', {
#             'fields': (
#                 ('set_number_consultant_subject'),
#                 ('set_number_consultant_message'),
#                 ('change_number_consultant_subject'),
#                 ('change_number_consultant_message'),
#             ),
#         }),
#         ('Регистрации консультанта', {
#             'fields': (
#                 ('after_register_subject'),
#                 ('after_register_message'),
#             ),
#         }),
#     )


