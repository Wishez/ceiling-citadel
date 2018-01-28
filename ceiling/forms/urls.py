from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^order/$', make_order, name="order"),
    url(r'^question/$', ask_question, name="question"),
    url(r'^callback/$', order_callback, name="callback"),
]

