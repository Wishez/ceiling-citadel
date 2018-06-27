# -*- encoding: utf-8 -*-
from django.contrib import admin
from myadmin.admin import admin_site
from .models import *

base_description = ('Базовое описание', {
    'fields': (
        ('page_title',),
        ('meta',),
        ('name', 'slug',),
        ('slogan',),
        ('description',),
        ('preview',),
        ('is_shown',),
    ),
})

base_product_characteristics = ('Характеристики продукта', {
    'fields': (
        ('combustibility', 'acoustics',),
        ('lightning', 'edges',),
        ('material', 'colors',),
        ('proportions',),
        ('width', 'height',),
        ('length', 'thickness',),
        ('step_between_panels', 'angle_of_bend',),
        ('diameter', 'ceil_size',),
    ),
})

base_product_characteristics_fields = (
    'combustibility',
    'acoustics',
    'lightning',
    'edges',
    'material',
    'colors',
    'width',
    'height',
    'length',
    'thickness',
    'step_between_panels',
    'angle_of_bend',
    'diameter',
    'ceil_size',
    'proportions',
)

class CategoryBaseAdminModel(admin.ModelAdmin):
    list_per_page = 7
    list_display = ('name', 'slug', 'preview', 'created', 'modified',)
    list_filter = ('created', 'modified','name',)
    search_fields = ('name', 'created', 'modified',)
    ordering = ('-created',)
    date_hierarchy = 'created'
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = [base_description,]



@admin.register(Brand, site=admin_site)
class BrandAdmin(CategoryBaseAdminModel):

    fieldsets = [base_description,
        ('Категории и коллекции бренда', {
            'fields': (
                ('categories',),
                ('collections',),
                ('products',),
            ),
        })
    ]

@admin.register(CategorySection, site=admin_site)
class CategorySectionAdmin(admin.ModelAdmin):
    list_per_page = 7
    search_fields = ('section_name', 'created', 'modified',)
    list_filter = ('section_name', 'created', 'modified',)
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_display = ('section_name', 'created', 'modified',)


@admin.register(Category, site=admin_site)
class CategoryAdmin(CategoryBaseAdminModel):
    fieldsets = [base_description,
         ('Секции и бренды категории', {
             'fields': (
                 ('section',),
                 ('brands',),
                 ('collections',),
                 ('products',),
             ),
         })
    ]

@admin.register(Collection, site=admin_site)
class CollectionAdmin(CategoryBaseAdminModel):
    fieldsets = [base_description,
         ('Предметы и бренд коллекции', {
             'fields': (
                 ('collection_items',),
                 ('brand', 'category',),
             ),
         })
     ]


@admin.register(Product, site=admin_site)
class ProductAdmin(CategoryBaseAdminModel):
    list_display = ('name', 'slug', 'preview', 'created', 'modified',)
    list_filter = ('name', 'created', 'modified',) + base_product_characteristics_fields
    search_fields = ('name', 'created', 'modified',) + base_product_characteristics_fields
    fieldsets = [
        ('Страница продукта', {
            'fields': (
                ('page_title',),
                ('meta',)
            ),
        }),
        base_description,
        base_product_characteristics,
        ('Стоимость продукта', {
            'fields': (
                ('price', 'currency',),
            ),
        }),
        ('Принадлежность продукта', {
            'fields': (
                ('brand', 'section',),
            ),
        }),
        ('Дополинтельные медиа и контент', {
            'fields': (
                ('visualisation', 'album',),
                ('content',),
            ),
        })
     ]
