# -*- coding: utf-8 -*-
from django.conf.urls import url
from .views import *

urlpatterns = [
    url('^$', HomeView.as_view(), name='index'),

    url(
        r'^catalog/category/(?P<categorySlug>[-\w_]+)/sample/(?P<productSlug>[-\w_]+)/$',
        CategorySampleView.as_view(),
        name='category_sample_product'),
    url(
        r'^catalog/category/(?P<categorySlug>[-\w_]+)/(?P<collectionSlug>[-\w_]+)/(?P<productSlug>[-\w_]+)/$',
        CategoryProductView.as_view(),
        name='category_product'),
    url(
        r'^catalog/category/(?P<categorySlug>[-\w_]+)/(?P<collectionSlug>[-\w_]+)/$',
        CategoryCollectionView.as_view(),
        name='category_collection'),
    url(
        r'^catalog/category/(?P<categorySlug>[-\w_]+)/$',
        CategoryView.as_view(),
        name='category'),

    url(
        r'^catalog/brand/(?P<brandSlug>[-\w_]+)/sample/(?P<productSlug>[-\w_]+)/$',
        BrandSampleView.as_view(),
        name='brand_sample_product'),
    url(
        r'^catalog/brand/(?P<brandSlug>[-\w_]+)/(?P<collectionSlug>[-\w_]+)/(?P<productSlug>[-\w_]+)/$',
        BrandProductView.as_view(),
        name='brand_product'),
    url(
        r'^catalog/brand/(?P<brandSlug>[-\w_]+)/(?P<collectionSlug>[-\w_]+)/$',
        BrandCollectionView.as_view(),
        name='brand_collection'),
    url(
        r'^catalog/brand/(?P<brandSlug>[-\w_]+)/$',
        BrandView.as_view(),
        name='brand'
    ),
    url('^catalog/$', CatalogView.as_view(), name='catalog'),

    url('^service/$', ServiceView.as_view(), name='business'),
    url('^contacts/$', ContactsView.as_view(), name='contacts'),
]
