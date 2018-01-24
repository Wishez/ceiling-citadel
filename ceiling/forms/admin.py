# -*- encoding: utf-8 -*-
from myadmin.admin import admin_site
from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Callback, site=admin_site)
class CallbackAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ('status', 'created',)
    ordering=('-created',)
    date_hierarchy = 'created'
    filter_fields = ('status', 'created',)
    search_fields = (
        'status', 'created',
    )