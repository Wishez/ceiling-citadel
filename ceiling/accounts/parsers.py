# # -*- encoding: utf-8 -*-
# from django.core.mail import EmailMessage
# from home.models import EmailMessagesSetting
# from django.conf import settings
# from django.contrib.sites.models import Site
# from twilio.rest import Client
# import os, time
#
# class MessageParser():
#     def __init__(
#         self,
#         consultant=None,
#         message='',
#         subject='',
#         isMessageKey=True
#     ):
#         self.consultant = consultant
#         # Проверка на обычноое ообщение
#         if isMessageKey:
#             print(isMessageKey, message)
#             self.email_setting  = EmailMessagesSetting.objects.get(is_active='Активная группа')
#             setting = self.email_setting
#             self.message = getattr(setting, message, '')
#             self.subject = getattr(setting, subject, '')
#         else:
#             self.message = message
#             self.subject = subject
#
#
#
#         self.variables = [
#             'refferal_url',
#             'consultant_num',
#             'url_to_personal_room',
#             'middle_name',
#             'first_name',
#             'last_name',
#             'status',
#         ]
#
#         self.full_name = '%s %s' % (
#             getattr(consultant, 'first_name', None),
#             getattr(consultant, 'last_name', None)
#         )
#
#     def __call__(self):
#         self.parse_text()
#         self.send_parsed_text_to_email()
#
#     def parse_extra_variables(self, text):
#         text = text.replace(
#             '{{site}}',
#             Site.objects.get_current().domain
#         )
#
#         text = text.replace(
#             '{{full_name}}',
#             self.full_name
#         )
#         return text
#     def parse_text(self):
#         message = self.message
#         subject = self.subject
#
#         consultant = self.consultant
#         # Замена дополнительных переменных.
#         message = self.parse_extra_variables(message)
#         subject = self.parse_extra_variables(subject)
#         # Замена найденных переменных.
#         for variable in self.variables:
#             pattern = '{{%s}}' % variable
#             fill_variable = getattr(consultant, variable, None)
#
#             if fill_variable:
#                 message = message.replace(
#                     pattern,
#                     fill_variable
#                 )
#
#                 subject = subject.replace(
#                     pattern,
#                     fill_variable
#                 )
#
#         self.message = message
#         self.subject = subject
#
#
#     def send_parsed_text_to_email(self):
#         if hasattr(self.consultant, 'email'):
#             EmailMessage(
#                 self.subject,
#                 self.message,
#                 getattr(settings, "DEFAULT_FROM_EMAIL", 'support@cosmeticsyou.ru'),
#                 [self.consultant.email]
#             ).send()
#
#
# def create_user_and_notify_about(user, page):
#     user.save()
#     MessageParser(
#         user,
#         'after_register_message',
#         'after_register_subject',
#         isMessageKey=True
#     )
#
#     send_sms_notification(page, user)
#
# def send_sms_notification(page, consultant):
#
#     phone_from = page.phone_from
#     phones_to = page.phones_to.replace(' ', '').split(',')
#     account_sid = page.account_sid
#     auth_token = page.auth_token
#
#     parser = MessageParser(
#         consultant,
#         message=page.message,
#         isMessageKey=False
#     )
#     parser.parse_text()
#     message = parser.message
#     client = Client(account_sid, auth_token)
#
#     for phone_to in phones_to:
#         time.sleep(4)
#         client.messages.create(
#             phone_to,
#             body=message,
#             from_=phone_from
#         )
#
#
#         # api.send_sms(
#         #     body=message,
#         #     from_phone=phone_from,
#         #     to=phones_to
#         # )
