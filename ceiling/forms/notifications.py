# -*- encoding: utf-8 -*-

from forms.parsers import MessageParser
from home.models import Settings
from .models import *
from django.utils.translation import gettext_lazy as _
from twilio.rest import Client
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver


def get_text_from_locale_or_settings(text_variable, instance, settings):
    text = getattr(
        instance,
        text_variable,
        ''
    )
    if not text:
        text = getattr(
            settings,
            text_variable,
            ''
        )

    return text
@receiver(pre_save, sender=Order)
def send_notification_about_changed_status_of_order_to_consumer(sender, instance, **kwargs):
    isChanged = False
    message, subject = '', ''
    settings, created = Settings.objects.get_or_create()

    if created:
        settings.save()

    if instance.status == _('В процессе'):
        message = get_text_from_locale_or_settings(
            'change_status_order_in_process_message',
            instance,
            settings
        )
        subject = get_text_from_locale_or_settings(
            'change_status_order_in_process_subject',
            instance,
            settings
        )

        isChanged = True
    elif instance.status == _('Успешно завершён'):
        message = get_text_from_locale_or_settings(
            'after_success_closing_order_message',
            instance,
            settings
        )
        subject = get_text_from_locale_or_settings(
            'after_success_closing_order_subject',
            instance,
            settings
        )

        isChanged = True

    if isChanged:
        consumer = instance.consumer
        MessageParser(
            [instance, consumer],
            message,
            subject,
            isMessageKey=False,
            receiver=consumer
        )()

    return isChanged

def save_instance_and_notify_about(
        instance,
        phone_message,
        callback=None,
        additional_vocabulary=[]
):
    instance.save()
    consumer = instance.consumer
    if callback is not None:
        callback()
    # From Settings get info about sender, receivers,
    # service data, and the message.
    send_sms_notification(
        Settings.objects.get(),
        [consumer, instance],
        phone_message,
        additional_vocabulary,
        receiver=consumer
    )

def save_question_and_notify_about(question):
    save_instance_and_notify_about(
        question,
        'question_asked_message',
        additional_vocabulary=['question']
    )

def save_callback_and_notify_about(callback):
    save_instance_and_notify_about(
        callback,
        'callback_called_message'
    )

def save_order_and_notify_about(order):
    consumer = order.consumer

    save_instance_and_notify_about(
        order,
        'order_ordered_message',
        lambda: MessageParser(
                [consumer, order],
                'after_ordering_order_message',
                'after_ordering_order_subject',
                receiver=consumer,
                order=order
        )()
    )


def send_sms_notification(
        settings,
        instances,
        message_type,
        additional_vocabulary,
        receiver
):

    phone_from = settings.phone_from
    phones_to = settings.phones_to.replace(' ', '').split(',')
    account_sid = settings.account_sid
    auth_token = settings.auth_token

    parser = MessageParser(
        instances,
        message=message_type,
        additional_vocabulary=additional_vocabulary,
        receiver=receiver
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
            [consumer, instance],
            answer,
            subject,
            receiver=consumer,
            isMessageKey=False,
            additional_vocabulary=['answer', 'question']
        )()
