# -*- encoding: utf-8 -*-
from django.core.mail import EmailMessage
from home.models import Settings
from django.conf import settings
from django.contrib.sites.models import Site
from personal_data.models import Consumer
import os, time

class MessageParser():
    def __init__(
            self,
            instances=None,
            message='',
            subject='',
            isMessageKey=True,
            receiver=None,
            additional_vocabulary=[],
            order=None
    ):
        self.instances = instances
        self.receiver = receiver

        # Проверка на обычноое ообщение
        if isMessageKey:
            self.email_setting  = Settings.objects.get()
            settings = self.email_setting
            self.message = getattr(settings, message, '')
            self.subject = getattr(settings, subject, '')
        else:
            self.message = message
            self.subject = subject

        self.variables = [
             'middle_name',
             'first_name',
             'last_name',
             'phone_number',
             'email',
         ] + additional_vocabulary

        if receiver is not None:
            self.full_name = Consumer.objects.get_full_name(receiver)
        else:
            self.full_name = ''

        self.order = order

    def __call__(self):
        self.parse_text()
        self.send_parsed_text_to_email()

    def parse_extra_variables(self, text):
        text = text.replace(
            '{{site}}',
            Site.objects.get_current().domain
        )

        text = text.replace(
            '{{full_name}}',
            self.full_name
        )

        return text
    def parse_text(self):
        message = self.message
        subject = self.subject
        variables = self.variables

        # Замена дополнительных переменных.
        message = self.parse_extra_variables(message)
        subject = self.parse_extra_variables(subject)
        order = self.order
        if order is not None:
            ordered_products = [
                ordered_product for ordered_product in order.ordered_products.all()
            ]
            ordered_products_variable = ''


            if len(ordered_products):
                for ordered_product in ordered_products:
                    ordered_products_variable += '\n%s %sшт' % (
                        ordered_product.product.name,
                        ordered_product.quantity
                    )
            else:
                ordered_products_variable = 'Вы ничего не заказали.'
            message = message.replace(
                '{{ordered_products}}',
                ordered_products_variable
            )

        # Замена найденных переменных.
        # Есть несколько объектов, из которых извлекаются данные
        instances = self.instances

        for variable in variables:
            for instance in instances:
                pattern = '{{%s}}' % variable
                fill_variable = getattr(instance, variable, None)

                if fill_variable:
                    message = message.replace(
                        pattern,
                        fill_variable
                    )
                    subject = subject.replace(
                        pattern,
                        fill_variable
                    )

        self.message = message
        self.subject = subject


    def send_parsed_text_to_email(self):
        receiver = getattr(self, 'receiver')

        if hasattr(receiver, 'email'):
            EmailMessage(
                self.subject,
                self.message,
                getattr(settings, "DEFAULT_FROM_EMAIL"),
                [receiver.email]
            ).send()


