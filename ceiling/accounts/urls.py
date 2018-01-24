# -*- coding: utf-8 -*-
from django.conf.urls import  url
from .views import *

urlpatterns = [
    url(r'^$', RegistrationView.as_view(), name='registration'),
    url(r'^success/$', SuccessView.as_view(), name='success'),
    url(r'^(?P<consultant_num>[0-9]+)/$', RefferalRegistrationView.as_view(), name='refferal_register'),
    url(r'^room_(?P<consultant_num>[0-9]+)/$', PersonalRoomPage.as_view(), name='personal_room'),
]

