# -*- encoding: utf-8 -*-
from django import template
from django.utils import formats
register = template.Library()


def get_prop(referral, prop):
    return getattr(referral, prop, 'ー')

def create_referrals_list(related_referrals):
    referrals = related_referrals.all()
    if not referrals.count(): return ''

    html = ''
    count = 0
    for ref in referrals:
        email = get_prop(ref, "email")
        phone = get_prop(ref, "phone_number")
        data = {
            "full_name": ref.get_full_name(),
            "email": '<a href="mailto:%s">%s</a>' % (email, email),
            "phone": '<a href="tel:%s">%s</a>' % (phone, phone),
            "registered_date": formats.date_format(ref.registered_date, "DATE_FORMAT"),
            "id": 'referral_%s' % count
        }
        html += '<div class="referral showPopup parent" data-popup-id="#%(id)s" title="Нажмите, чтобы узнать подробности">' \
                    '<div class="imageContainer imageContainer_referral">' \
                        '<figure class="imageContainer__image imageContainer__image_referral referral__image"></figure>' \
                    '</div>' \
                    '<h3 class="referral__title">%(full_name)s</h3>' \
                    '<div class="description description_inline  visible-hidden description_black description_right referral__description" id="%(id)s">' \
                        '<h4 class="description__title parent">' \
                            '%(full_name)s' \
                            '<button class="closeButton child" data-popup-id="#%(id)s">' \
                                '<i class="fa fa-close"></i>' \
                            '</button>' \
                        '</h4> ' \
                        '<div class="descriptionContent referralContent">' \
                            '<p class="referralContent__email">' \
                                '<span class="referralContent_gray">Email:</span><br/>' \
                                    '%(email)s' \
                                '</p>' \
                            '<p class="referralContent__phone">' \
                                '<span class="referralContent_gray">Телефон:</span><br/>' \
                                '%(phone)s' \
                            '</p>' \
                            '<p class="referralContent__registeredDate">' \
                                '<span class="referralContent_gray">Дата регистрации:</span><br/>' \
                                    '%(registered_date)s' \
                            '</p>' \
                        '</div>' \
                    '</div>' \
                '</div>' % data
        count += 1

    return html

def count_referrals(referrals):
    return referrals.all().count()


register.filter('make_referrals_data', create_referrals_list)
register.filter('count', count_referrals)