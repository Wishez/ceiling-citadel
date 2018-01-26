# -*- encoding: utf-8 -*-
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import *

class CategoriesView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    permission_classes = (IsAuthenticated, )
    lookup_field = 'uuid'
class BrandsView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandListSerializer
    permission_classes = (IsAuthenticated, )
    lookup_field = 'uuid'
class CollectionsView(ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'uuid'

class CategoryView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'uuid'

class BrandView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'uuid'

class CollectionView(RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionListSerializer
    permission_classes = (IsAuthenticated, )
    lookup_field = 'uuid'

class ProductView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = 'uuid'

