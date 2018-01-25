# -*- encoding: utf-8 -*-
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework.viewsets import ReadOnlyModelViewSet

class CategoriesView(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    permission_classes = (IsAuthenticated, )
class BrandsView(ReadOnlyModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandListSerializer
    permission_classes = (IsAuthenticated, )
class CollectionsView(ReadOnlyModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = (IsAuthenticated,)