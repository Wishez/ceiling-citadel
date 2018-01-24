# -*- encoding: utf-8 -*-
from django.shortcuts import render, redirect
from .forms import RegistrationConsultantForm, RegistrationRefferalConsultantForm
from home.forms import CallbackForm
from .models import User, RefferalConsultant, RelatedConsultant
# from django.views.generic import TemplateView
from pages.views import BaseView
from pages.models import RegistrationPage
from django.http import Http404
from .parsers import *
from threading import Thread


# Create your views here.

class BaseRegistrationView(BaseView):
    template_name = 'registration.html'

    def __init__(self):
        super(BaseRegistrationView, self).__init__()
        self.consultant_num = ''
        self.is_refferal_form = False
        self.form_data = None
        self.active_page = 'registration'
        self.page_model = RegistrationPage

    def post(self, request, **kwargs):
        data = extract_data(request.POST)
        self.form_data = request.POST
        consultant_num = data["user_led"]
        del data["checkReady"]
        del data["user_led"]

        if "empty_middle_name" in data  and data["empty_middle_name"] == 'on':
            data["empty_middle_name"] = True
        else:
            data["empty_middle_name"] = False

        # Check of a refferal user.
        if self.is_refferal_form or consultant_num:

            form = RegistrationRefferalConsultantForm(
                data or None,
                request.FILES or None
            )
        else:
            form = RegistrationConsultantForm(
                data or None,
                request.FILES or None
            )

        if form.is_valid():
            user = form.save(commit=False)

            if self.is_refferal_form or consultant_num:

                led_consultant_data = set_led_consultant(
                    consultant_num,
                    ["user_led", "user_led_1", "user_led_2"],
                    [RefferalConsultant, RelatedConsultant, User]
                )

                if led_consultant_data and led_consultant_data["instance"]:
                    setattr(user, led_consultant_data["type"], led_consultant_data["instance"])

            Thread(
                target=create_user_and_notify_about,
                args=(
                    user,
                    RegistrationPage.objects.get(),
                )
            ).start()

            return redirect('success')
        else:
            return render(
                request,
                self.template_name,
                self.get_context_data()
            )
    def set_additional_context(self, context):
        if self.is_refferal_form:
            form = RegistrationConsultantForm(data=self.form_data)
        else:
            form = RegistrationRefferalConsultantForm(data=self.form_data)

        context["form"] = form
        context["consultant_num"] = self.consultant_num

        return context


def set_led_consultant(consultant_num, consultant_categories, consultants_models):
    index = 0

    for Model in consultants_models:
        consultant = Model.objects.is_consultant(consultant_num)
        if consultant.exists():
            return {
                "type": consultant_categories[index],
                "instance": consultant[0]
            }
        index = index + 1

    return False

class RegistrationView(BaseRegistrationView):
    def __init__(self):
        super(RegistrationView, self).__init__()


class RefferalRegistrationView(BaseRegistrationView):
    def __init__(self):
        super(RefferalRegistrationView, self).__init__()
        self.is_refferal_form = True

    def get(self, request, consultant_num):
        self.consultant_num = consultant_num
        return super(RefferalRegistrationView, self).get(request)

class SuccessView(BaseRegistrationView):
    template_name = 'success.html'

    def __init__(self):
        super(SuccessView, self).__init__()



def get_consultant(models, consultant_num):
    is_found = None

    for Model in models:
        consultant = Model.objects.filter(consultant_num=consultant_num)
        if consultant.exists():
            return consultant[0]

    return is_found

class PersonalRoomPage(BaseView):
    template_name = 'personal_room.html'

    def __init__(self):
        super(PersonalRoomPage, self).__init__()
        self.is_single_model = False
        self.consultant = None

    def set_additional_context(self, context):
        context['title'] = '%s | Персональная комната' % self.consultant.get_full_name()

        context['consultant'] = self.consultant

        return context

    def get(self, request, consultant_num):
        self.consultant = get_consultant(
            [User, RefferalConsultant, RelatedConsultant],
            consultant_num
        )


        if self.consultant is None:
            raise Http404('')

        return render(
            request,
            self.template_name,
            super(PersonalRoomPage, self).get_context_data()
        )

def personal_room(request, consultant_num):
    if request.method == 'GET':
        callback = CallbackForm()
        consultant = get_consultant(
            [User, RefferalConsultant, RelatedConsultant],
            consultant_num
        )

        if consultant:
            return render(
                request,
                'personal_room.html',
                {
                    "consultant": consultant,
                    "callback": callback

                }
            )
        else:
            raise Http404('')

def extract_data(data):
    new_data = {}
    for key in data:
       new_data[key] = data[key]
    return new_data
new_data = {'last_name': 'Журавлёв', 'first_name': 'Филипп', 'middle_name': '', 'empty_middle_name': 'on', 'birthday': '2017-11-03', 'passport_data': '9705 - 455421', 'phone_number': '+7 (213) 123 12 31', 'city': 'Moscow','region': 'Moscow', 'street': 'Igralnaya', 'num_home': '1', 'num_apartment': '1', 'email': 'rory_mercury@list.ru', 'checkReady': 'on'}
