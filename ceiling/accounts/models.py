# -*- encoding: utf-8 -*-
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.db.models.signals import pre_save
from django.dispatch import receiver
from model_utils import FieldTracker
from django.contrib.sites.models import Site
# from .parsers import MessageParser


class ConsultantManager(models.Manager):
    use_for_related_fields = True

    def is_consultant(self, consultant_num, **kwargs):
        return self.filter(consultant_num=consultant_num, **kwargs)


class ConsultantBase(models.Model):
    last_name = models.CharField(_('Фамилия'), max_length=36)
    first_name = models.CharField(_('Имя'), max_length=32)
    middle_name = models.CharField(_('Отчество'), max_length=32, blank=True, null=True)
    empty_middle_name = models.BooleanField(_('Нет отчества.'), default=False)
    consultant_num = models.CharField(_('Номер консультанта'), max_length=40, blank=True, null=True)
    url_to_personal_room = models.CharField(
        _('Ссылка в личный кабинет'),
        max_length=200,
        blank=True,
        null=True
    )

    refferal_url =  models.CharField(
        _('Реферальная ссылка'),
        max_length=200,
        blank=True,
        null=True
    )
    user_led = models.ForeignKey(
        "self",
        verbose_name=_('Пригласивший консультант'),
        blank=True,
        null=True
    )
    user_lead = models.ManyToManyField(
        "self",
        verbose_name=_("Приглашённые консультантом"),
        blank=True
    )

    registered_date = models.DateTimeField(_('Дата регистрации'), default=timezone.now)
    modified = models.DateTimeField(auto_now=True)
    register_statuses = (
        (_('Новый'), 'Новый'),
        (_('Зарегистрированный А'), 'Зарегистрированный А'),
        (_('Зарегистрированный Б'), 'Зарегистрированный Б'),
        (_('Пустой'), 'Пустой'),
    )

    status = models.CharField(
        _('Статус регистрации'),
        max_length=20,
        choices=register_statuses,
        default='Новый'
    )
    objects = ConsultantManager()
    class Meta:
        abstract = True
        ordering = ['-registered_date']

    def get_full_name(self):
        middle_name = getattr(self, "middle_name", "")
        if not middle_name:
            middle_name = ''
        return '%s %s %s' % (getattr(self, "last_name", ""), getattr(self, "first_name", ""), middle_name)
    def __str__(self):
        return '%s %s' % (self.last_name, self.first_name)


class FullConsultant(ConsultantBase):

    birthday = models.DateTimeField(_('День рождения'))
    citizenship = models.BooleanField(_('Не гражданин РФ'), default=False)
    passport_data = models.CharField(
        _('Серия и номер паспорта'),
        max_length=26
    )
    phone_number = models.CharField(_('Номер телефона'), max_length=26)
    email = models.EmailField(_('E-mail'))

    city = models.CharField(_('Город'), max_length=50)
    region = models.CharField(_('Область'), max_length=50, blank=True, null=True)

    street = models.CharField(_('Улица'), max_length=50)
    num_home = models.CharField(_('Дом'), max_length=5)
    num_apartment = models.DecimalField(_('Квартира'), max_digits=999, decimal_places=1)


    class Meta:
        abstract = True
    def __str__(self):
        return '%s %s | Статус: %s' % (self.last_name, self.first_name, self.status)

class RefferalConsultantTableRelations(FullConsultant):
    class Meta:
        verbose_name=_('Consultant')
    pass
class RelatedConsultantTableRelations(ConsultantBase):
    pass

class User(FullConsultant):

    user_led_1 = models.ForeignKey(
        RelatedConsultantTableRelations,
        verbose_name=_('Пригласивший консультант(Сторонний)'),
        blank=True,
        null=True
    )
    user_led_2 = models.ForeignKey(
        RefferalConsultantTableRelations,
        verbose_name=_('Пригласивший консультант(Реферальный)'),
        blank=True,
        null=True
    )
    user_lead_1 = models.ManyToManyField(
        RelatedConsultantTableRelations,
        verbose_name=_("Приглашённые консультантом(Сторонние)"),
        related_name="related_consultants_of_consultant",
        blank=True
    )
    user_lead_2 = models.ManyToManyField(
        RefferalConsultantTableRelations,
        verbose_name=_("Приглашённые консультантом(Реферальные)"),
        related_name="refferal_consultants_of_consultant",
        blank=True
    )

    tracker = FieldTracker(fields=['consultant_num'])
    class Meta:
        verbose_name = _('Консультант')
        verbose_name_plural = _('Консультанты')

class RelatedConsultant(RelatedConsultantTableRelations):
    user_led_1 = models.ForeignKey(
        User,
        verbose_name=_('Пригласивший консультант(Обычный)'),
        blank=True,
        null=True
    )
    user_led_2 = models.ForeignKey(
        "RefferalConsultantTableRelations",
        verbose_name=_('Пригласивший консультант(Реферальный)'),
        blank = True,
        null=True
    )
    user_lead_1 = models.ManyToManyField(
        User,
        verbose_name=_("Приглашённые консультантом(Обычные)"),
        related_name="consultants_of_related_consultant",
        blank=True
    )
    user_lead_2 = models.ManyToManyField(
        "RefferalConsultantTableRelations",
        verbose_name=_("Приглашённые консультантом(Реферальные)"),
        related_name="refferal_consultants_of_related_consultant",
        blank=True
    )
    email = models.EmailField(_('E-mail'), blank=True, null=True)

    tracker = FieldTracker(fields=['consultant_num'])
    class Meta:
        verbose_name = _('Сторонний консультант')
        verbose_name_plural = _('Сторонний консультанты')
    def __str__(self):
        return '%s %s' % (self.last_name, self.first_name)
class RefferalConsultant(FullConsultant):
    user_led_1 = models.ForeignKey(
        "RelatedConsultant",
        verbose_name=_('Пригласивший консультант(Сторонний)'),
        blank=True,
        null=True
    )
    user_led_2 = models.ForeignKey(
        User,
        verbose_name=_('Пригласивший консультант(Обычный)'),
        blank=True,
        null=True
    )
    user_lead_1 = models.ManyToManyField(
        "RelatedConsultant",
        verbose_name=_("Приглашённые консультантом(Сторонние)"),
        related_name = "consultants_of_refferal_consultant",
        blank = True
    )
    user_lead_2 = models.ManyToManyField(
        User,
        verbose_name=_("Приглашённые консультантом(Обычные)"),
        related_name="consultants_of_refferal_consultant",
        blank=True
    )

    tracker = FieldTracker(fields=['consultant_num'])
    class Meta:
        verbose_name = _('Реферальный консультант')
        verbose_name_plural = _('Реферальные консультанты')




# def set_refferal_data(instance, **kwargs):
#     consultant_num = instance.consultant_num
#     if consultant_num:
#         current_site = Site.objects.get_current().domain
#         instance.url_to_personal_room = '%s/personal_room/room_%s' % (current_site, consultant_num)
#         instance.refferal_url = '%s/registration/%s' % (current_site, consultant_num)
#     else:
#         instance.url_to_personal_room = ""
#         instance.refferal_url = ""
#
#
#
# def send_notification_to_registered_consultant(instance):
#     isRegistered = False
#     messages = EmailMessagesSetting.objects.get(is_active=_('Активная группа'))
#
#
#     if instance.status == _('Зарегистрированный А'):
#         message = messages.registered_a
#         isRegistered = True
#     elif instance.status == _('Зарегистрированный Б'):
#         message = messages.registered_b
#         isRegistered = True
#
#     if isRegistered:
#         MessageParser(
#             instance,
#             message,
#             'change_registration_status_subject',
#             False
#         )()
#
#
# def send_notification_about_set_consultant_number_if_needed(instance):
#     before = instance.tracker.changed().get('consultant_num')
#     after = instance.consultant_num
#
#     if before is None and after is not None:
#         MessageParser(
#             instance,
#             'set_number_consultant_message',
#             'set_number_consultant_subject'
#         )()
# def send_notification_about_updated_consultant_number_if_needed(instance):
#     before = instance.tracker.changed().get('consultant_num')
#     after = instance.consultant_num
#
#     if before != after:
#         MessageParser(
#             instance,
#             'change_number_consultant_message',
#             'change_number_consultant_subject'
#         )()
#
#
# @receiver(pre_save, sender=User)
# def pre_save_consultant(sender, instance, **kwargs):
#     set_refferal_data(instance, **kwargs)
#     send_notification_to_registered_consultant(instance)
#     send_notification_about_set_consultant_number_if_needed(instance)
#     send_notification_about_updated_consultant_number_if_needed(instance)
# @receiver(pre_save, sender=RefferalConsultant)
# def pre_save_referral_consultant(sender, instance, **kwargs):
#     set_refferal_data(instance, **kwargs)
#     send_notification_to_registered_consultant(instance)
#     send_notification_about_set_consultant_number_if_needed(instance)
#     send_notification_about_updated_consultant_number_if_needed(instance)
#
# @receiver(pre_save, sender=RelatedConsultant)
# def pre_save_related_consultant(sender, instance, **kwargs):
#     set_refferal_data(instance, **kwargs)
#     #send_notification_to_registered_consultant(instance)
#     send_notification_about_set_consultant_number_if_needed(instance)
#     send_notification_about_updated_consultant_number_if_needed(instance)