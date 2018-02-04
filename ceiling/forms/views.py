# -*- encoding: utf-8 -*-
from django.views.decorators.csrf import csrf_exempt

from .models import *
from django.http import HttpResponse
from .help_functions import get_or_create_consumer
from .notifications import \
    save_order_and_notify_about, \
    save_callback_and_notify_about, \
    save_question_and_notify_about
import json
from threading import Thread
@csrf_exempt
def order_callback(request):
    if request.method == 'POST':
        data = json.loads(request._body)
        consumer = get_or_create_consumer(data)
        print('go to next')

        callback = Callback.objects.create(
            consumer=consumer
        )
        if not 'isTest' in data:
            Thread(
                target=save_callback_and_notify_about,
                args=(callback,)
            ).start()

        return HttpResponse('Наша команда-по-обработки-запросов-консультации получила запрос на консультацию! В скором времени, она свяжется с вами <pre>ʕ •́؈•̀ ₎.</pre>')
    return HttpResponse('Внутренняя ошибка сервера')

@csrf_exempt
def make_order(request):
    print(request)
    if request.method == 'POST':

        data = json.loads(request._body)
        isNotTest = not 'isTest' in data
        consumer = get_or_create_consumer(data)

        order = Order.objects.create(
            consumer=consumer
        )
        # List of ordered products.
        products = data.get('products')

        for product in products:
            uuid = product.get('uuid')

            del product['uuid']

            Order.objects.create_and_put_ordered_product_to_order(
                order,
                uuid,
                product
            )
        if isNotTest:
            Thread(
                target=save_order_and_notify_about,
                args=(order,)
            ).start()

        return HttpResponse('Мы выслали на почту задокументированную версию заказа. В скором времени, мы сяжемся с вами!')
    return HttpResponse('Внутренняя ошибка сервера')

@csrf_exempt
def ask_question(request):
    if request.method == 'POST':
        data = json.loads(request._body)

        consumer = get_or_create_consumer(data)
        question = data['question']

        question = Question.objects.create(
            consumer=consumer,
            question=question
        )

        if not 'isTest' in data:
            # save_question_and_notify_about(question)
            # else:
            Thread(
                target=save_question_and_notify_about,
                args=(question,)
            ).start()

        return HttpResponse('Маша в процессе обработки вашего вопроса. Мы сообщим вам ответ, когда она его успешно сгенирирует!')
    return HttpResponse('Внутренняя ошибка сервера')