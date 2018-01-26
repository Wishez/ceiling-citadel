# -*- encoding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import *
from django.http import HttpResponse
from personal_data.models import Consumer, OrderedProduct

# Create your views here.

def get_or_create_consumer(data):
    full_name = data['full_name']
    shared_name = full_name.split(' ')
    # Return query set with filtered consultants.
    consumer = Consumer.objects.is_consumer(
        shared_name[1],
        shared_name[0]
    )
    if not consumer.exist():
        consumer = Consumer()

        if 'phone' in data:
            consumer.phone_number = data['phone']
        if 'email' in data:
            consumer.email = data['email']

        Consumer.objects.fill_name_by_fields_and_save(
            consumer,
            full_name
        )
    else:
        consumer = consumer[0]
    return consumer
@csrf_exempt
def order_callback(request):
    if request.method == 'POST':
        data = request.POST

        consumer = get_or_create_consumer(data)

        callback = Callback.objects.create(
            consumer=consumer
        )

        callback.save()

        return HttpResponse('В скором времени, мы сяжемся с вами!')
    return HttpResponse('Внутренняя ошибка сервера')

@csrf_exempt
def make_order(request):
    if request.method == 'POST':
        data = request.POST

        consumer = get_or_create_consumer(data)

        order = Order.objects.create(
            consumer=consumer
        )

        products = data['products']
        for product in products:
            uuid = product['uuid']
            quantity = product['quantity']
            Order.objects.add_quantity_to_ordered_product_and_put_it_to_order(
                order,
                uuid,
                quantity
            )

        order.save()

        return HttpResponse('Мы выслали на почту задокументированную версию заказа. В скором времени, мы сяжемся с вами!')
    return HttpResponse('Внутренняя ошибка сервера')

@csrf_exempt
def ask_question(request):
    if request.method == 'POST':
        data = request.POST

        consumer = get_or_create_consumer(data)
        question = data['question']

        question = Question.objects.create(
            consumer=consumer,
            question=question
        )

        question.save()

        return HttpResponse('Маша в процессе обработки вашего вопроса. Мы сообщим вам ответ, когда она его успешно сгенирирует!')
    return HttpResponse('Внутренняя ошибка сервера')