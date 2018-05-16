# -*- encoding: utf-8 -*-
from django.conf.urls import url
from .api.views import *
from .api.viewsets import *
from .views import retrieve_catalog, get_album

urlpatterns = [
    url(
        r'^api/current/categories/$',
        CategoriesView.as_view(),
        name='categories_list'
    ),
    url(
        r'^api/current/catalog/$',
        retrieve_catalog,
        name="catalog_entities"
    ),
    url(
        r'^api/current/album/(?P<slug>[-\w_]+)/$',
        get_album,
        name="get_album"
    ),
    url(
        r'^api/current/category/(?P<uuid>[-\w]+)/$',
        CategoryView.as_view(),
        name='category'
    ),
    url(
        r'^api/current/brands/$',
        BrandsView.as_view(),
        name='brands_list'
    ),
    url(
        r'^api/current/brand/(?P<uuid>[-\w]+)/$',
        BrandView.as_view(),
        name='brand'
    ),
    url(
        r'^api/current/collections/$',
        CollectionsView.as_view(),
        name='collections_list'
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
    url(
        r'^api/next/product/(?P<slug>[-\w]+)/$',
        ProductViewBySlug.as_view(),
        name='next_product'
    ),
]
