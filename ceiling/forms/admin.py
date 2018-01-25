# -*- encoding: utf-8 -*-
from myadmin.admin import admin_site
from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Callback, site=admin_site)
class CallbackAdmin(admin.ModelAdmin):
    list_per_page = 7
    list_display = ('consumer', 'status', 'created',)
    ordering=('-created',)
    date_hierarchy = 'created'
    list_filter = ('consumer', 'status', 'created',)
    search_fields = ('consumer', 'status', 'created',)

@admin.register(Question, site=admin_site)
class QuestionAdmin(admin.ModelAdmin):
    list_per_page = 7
    list_display = ('consumer', 'question', 'status', 'created',)
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_filter = ('consumer', 'status', 'created',)
    search_fields = ('consumer', 'status', 'created',)



@admin.register(Order, site=admin_site)
class OrderAdmin(admin.ModelAdmin):
    list_per_page = 7
    list_display = ('consumer', 'status', 'order_id', 'order_price', 'created', 'modified',)
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_filter = ('consumer', 'status', 'created', 'order_id', 'order_price',)
    search_fields = ('consumer', 'order_id', 'order_price', 'status', 'created',)
    fieldsets = [
        ('Данные заказа', {
            'fields': (
                ('consumer',),
                ('ordered_products',),
                ('price_will_be_counted', 'discount',),
                ('order_price',),
            )
        }),
        ('Статус и нормер заказа', {
            'fields': (
                ('order_id', 'status',),
            )
        }),
        ('Локальные сообщения при смене статуса', {
            'fields': (
                ('after_success_closing_order_subject',),
                ('after_success_closing_order_message',),
                ('change_status_order_in_process_subject',),
                ('change_status_order_in_process_message',),
            )
        }),
    ]