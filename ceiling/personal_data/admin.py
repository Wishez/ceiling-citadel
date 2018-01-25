# -*- encoding: utf-8 -*-
from django.contrib import admin
from myadmin.admin import admin_site
from .models import *
from catalog.admin import base_product_characteristics, base_product_characteristics_fields

# class CategoryBaseAdminModel(admin.ModelAdmin):
#     list_per_page = 7
#     prepopulated_fields = {'slug': ('name',)}
#     fieldsets = [base_description,]
#     ordering = ('-created',)
#     date_hierarchy = 'created'
#     list_display = ('name', 'slug', 'preview', 'created', 'modified',)
#     filter_fields = ('name',  'created', 'modified',)
#     search_fields = ('name', 'created', 'modified',)

@admin.register(Consumer, site=admin_site)
class ConsumerAdmin(admin.ModelAdmin):
    list_per_page = 7
    search_fields = (
        'last_name',
        'first_name',
        'middle_name',
        'email',
        'phone_number',
        'requisites',
        'created',
    )
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_display = ('last_name', 'first_name', 'middle_name', 'requisites', 'phone_number', 'email', 'created', 'modified')
    list_filter = ('last_name', 'first_name', 'middle_name','requisites', 'created', 'modified')
    fieldsets = [
        ('Контактные данные заказчика', {
            'fields': (
                ('first_name', 'last_name',),
                ('middle_name',),
                ('email', 'phone_number',),
            ),
        }),
        ('Дополнительные данные', {
            'fields': (
                ('requisites', 'uuid',),
            ),
        })
    ]

@admin.register(OrderedProduct, site=admin_site)
class OrderedProductAdmin(admin.ModelAdmin):
    list_per_page = 7
    search_fields = (
        'product',
        'quantity',
        'full_price'
    ) + base_product_characteristics_fields
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_display = ('product', 'created', 'modified',) + base_product_characteristics_fields
    list_filter = ('full_price', 'product', 'created', 'modified',) + base_product_characteristics_fields
    fieldsets = [
        ('Продукт', {
            'fields': (
                ('product', 'quantity',),
                ('full_price',),
            ),
        }),
        base_product_characteristics
    ]