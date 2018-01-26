# -*- encoding: utf-8 -*-
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView
from .serializers import *

# Create your views here.

class ProductView(RetrieveUpdateDestroyAPIView):
    queryset = OrderedProduct.objects.all()
    serializer_class = OrderedProductSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'uuid'


class CreateProductView(CreateAPIView):
    queryset = OrderedProduct.objects.all()
    serializer_class = OrderedProductSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'uuid'


