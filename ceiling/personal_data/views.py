# -*- encoding: utf-8 -*-
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse
from .models import OrderedProduct
from catalog.models import Product
# Create your views here.


@csrf_exempt
def add(request):
    if request.method == 'POST':
        data = request.POST

        product = get_object_or_404(Product, uuid=data['uuid'])

        del data['uuid']

        ordered_product = OrderedProduct.objects.create(
            *data,
            product=product
        )

        ordered_product.save()

        return HttpResponse(True)
    return HttpResponse('Внутренняя ошибка сервера')

@csrf_exempt
def remove(request):
    if request.method == 'POST':
        data = request.POST

        ordered_product = get_object_or_404(OrderedProduct, uuid=data['uuid'])
        ordered_product.delete()

        return HttpResponse(True)
    return HttpResponse('Внутренняя ошибка сервера')

