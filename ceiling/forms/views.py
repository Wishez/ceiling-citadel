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

DEFAULT_MESSAGE = 'Внутренняя ошибка сервера'

@csrf_exempt
def order_callback(request):
    responseMessage = DEFAULT_MESSAGE

    if request.method == 'POST':
        data = json.loads(request._body)
        consumer = get_or_create_consumer(data)


        callback = Callback.objects.create(
            consumer=consumer
        )

        if not 'isTest' in data:
            Thread(
                target=save_callback_and_notify_about,
                args=(callback,)
            ).start()

        responseMessage = 'Наша команда-по-обработки-запросов-консультации получила запрос на консультацию! В скором времени, она свяжется с вами <pre>ʕ •́؈•̀ ₎.</pre>'

    return HttpResponse(responseMessage)

@csrf_exempt
def make_order(request):
    responseMessage = DEFAULT_MESSAGE

    if request.method == 'POST':
        data = json.loads(request._body)

        isNotTest = not 'isTest' in data
        consumer = get_or_create_consumer(data)

        try:
            order = Order.objects.create(
                consumer=consumer
            )
        except Exception:
            print('Заказ не создался')


        # List of ordered products.
        try:
            products = data.get('products')
        except Exception:
            print('Не получилось получить образцы из списка.')


        for product in products:
            uuid = product.get('uuid')

            Order.objects.create_and_put_ordered_product_to_order(
                order,
                uuid,
                product
            )

        if isNotTest:
            try:
                Thread(
                    target=save_order_and_notify_about,
                    args=(order,)
                ).start()
            except Exception:
                print('Не получилось запустить сохранить заказ и сообщить о нём в отдельном потоке.')

        responseMessage = 'Мы выслали на почту задокументированную версию заказа. В скором времени, мы сяжемся с вами!'

    return HttpResponse(responseMessage)

@csrf_exempt
def ask_question(request):
    responseMessage = DEFAULT_MESSAGE

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

        responseMessage = 'Маша в процессе обработки вашего вопроса. Мы сообщим вам ответ, когда она его успешно сгенирирует!'

    return HttpResponse(responseMessage)