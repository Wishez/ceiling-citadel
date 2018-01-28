# -*- encoding: utf-8 -*-

from forms.parsers import MessageParser
from home.models import Settings
from .models import *
from django.utils.translation import gettext_lazy as _
from twilio.rest import Client
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver



@receiver(pre_save, sender=Order)
def send_notification_about_changed_status_of_order_to_consumer(sender, instance, **kwargs):
    isChanged = False
    message, subject = '', ''
    messages, created = Settings.objects.get_or_create()

    if created:
        messages.save()

    if instance.status == _('В процессе'):

        message = getattr(
            instance,
            'change_status_order_in_process_message',
            messages.change_status_order_in_process_message
        )
        subject = getattr(
            instance,
            'change_status_order_in_process_subject',
            messages.change_status_order_in_process_subject
        )
        isChanged = True
    elif instance.status == _('Успешно завершён'):
        message = getattr(
            instance,
            'after_success_closing_order_message',
            messages.after_success_closing_order_message
        )
        subject = getattr(
            instance,
            'after_success_closing_order_subject',
            messages.after_success_closing_order_subject
        )
        isChanged = True

    if isChanged:
        MessageParser(
            instance,
            message,
            subject,
            False
        )()

    return isChanged

def save_instance_and_notify_about(
        instance,
        phone_message,
        callback=None
):
    instance.save()

    consumer = instance.consumer

    if callback is not None:
        callback()
    # From Settings get info about sender, receivers,
    # service data, and the message.
    send_sms_notification(
        Settings.objects.get(),
        consumer,
        phone_message
    )
def save_question_and_notify_about(question):
    save_instance_and_notify_about(
        question,
        'question_asked_message'
    )

def save_callback_and_notify_about(callback):
    save_instance_and_notify_about(
        callback,
        'callback_called_message'
    )

def save_order_and_notify_about(order):
    save_instance_and_notify_about(
        order,
        'order_ordered_message',
        lambda:
            MessageParser(
                order.consumer,
                'after_ordering_order_message',
                'after_register_subject'
            )
    )


def send_sms_notification(settings, consumer, message_type):

    phone_from = settings.phone_from
    phones_to = settings.phones_to.replace(' ', '').split(',')
    account_sid = settings.account_sid
    auth_token = settings.auth_token

    parser = MessageParser(
        consumer,
        message=message_type
    )

    parser.parse_text()

    message = parser.message
    client = Client(account_sid, auth_token)

    for phone_to in phones_to:
        client.messages.create(
            phone_to,
            body=message,
            from_=phone_from
        )

@receiver(post_save, sender=Question)
def change_question_status(sender, instance, **kwargs):
    answer = instance.answer
    status = instance.status

    if status == _('Сгенерирован')  and answer != '':
        consumer = instance.consumer
        subject = instance.answer_subject

        MessageParser(
            consumer,
            answer,
            subject,
            False
        )()
