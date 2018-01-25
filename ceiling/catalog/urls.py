# -*- encoding: utf-8 -*-
from django.conf.urls import url
from .api.views import *
from .api.viewsets import *


urlpatterns = [
    url(
        r'^api/current/categories/$',
        CategoriesView.as_view({
            "get": "list"
        }),
        name='category_list'
    ),
    url(
        r'^api/current/category/(?P<uuid>[-\w]+)/$',
        CategoryView.as_view(),
        name='category'
    ),
    url(
        r'^api/current/brands/$',
        BrandsView.as_view({
            "get": "list"
        }),
        name='brand_list'
    ),
    url(
        r'^api/current/brand/(?P<uuid>[-\w]+)/$',
        BrandView.as_view(),
        name='brand'
    ),
    url(
        r'^api/current/collections/$',
        CollectionsView.as_view({
            "get": "list"
        }),
        name='collection_list'
    ),
    url(
        r'^api/current/collection/(?P<uuid>[-\w]+)/$',
        CollectionView.as_view(),
        name='collection'
    ),
    url(
        r'^api/current/product/(?P<uuid>[-\w]+)/$',
        ProductView.as_view(),
        name='product'
    ),
]# + router.urls