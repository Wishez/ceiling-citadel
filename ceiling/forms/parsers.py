# -*- encoding: utf-8 -*-
from django.core.mail import EmailMessage
from home.settings import Settings
from django.conf import settings
from django.contrib.sites.models import Site
import os, time

class MessageParser():
    def __init__(
        self,
        consultant=None,
        message='',
        subject='',
        isMessageKey=True,
        additionalVariables=[]
    ):
        self.consultant = consultant
        # Проверка на обычноое ообщение
        if isMessageKey:
            self.email_setting  = Settings.objects.get()
            setting = self.email_setting
            self.message = getattr(setting, message, '')
            self.subject = getattr(setting, subject, '')
        else:
            self.message = message
            self.subject = subject



        self.variables = [
            'middle_name',
            'first_name',
            'last_name',
        ] + additionalVariables

        self.full_name = '%s %s %s' % (
            getattr(consultant, 'last_name', ''),
            getattr(consultant, 'first_name', ''),
            getattr(consultant, 'middle_name', ''),
        )


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

        consultant = self.consultant
        # Замена дополнительных переменных.
        message = self.parse_extra_variables(message)
        subject = self.parse_extra_variables(subject)
        # Замена найденных переменных.
        for variable in self.variables:
            pattern = '{{%s}}' % variable
            fill_variable = getattr(consultant, variable, None)

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
        if hasattr(self.consultant, 'email'):
            EmailMessage(
                self.subject,
                self.message,
                getattr(settings, "DEFAULT_FROM_EMAIL", 'support@cosmeticsyou.ru'),
                [self.consultant.email]
            ).send()


