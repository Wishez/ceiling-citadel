# -*- encoding: utf-8 -*-
from django import forms

from .models import User, RefferalConsultant
# Create your models here.
class BaseRegistrationForm(forms.ModelForm):
    class Meta:
        fields = ('last_name', 'first_name', 'middle_name',
                  'birthday',
                  'passport_data', 'phone_number', 'email',
                  'city', 'region', 'street', 'num_home',
                  'num_apartment')
        widgets = {
            'last_name': forms.TextInput(attrs={
                'placeholder': 'Иванов',
                'pattern': '\D+',
                'autofocus': 'true',
                'class': 'controller__input controller__input_purple child',
            }),
            'first_name': forms.TextInput(attrs={
                'placeholder': 'Иван',
                'pattern': '([А-Я]|[A-Z])([а-я]+|[a-z]+)(([-\s])([А-Я]|[A-Z])?([а-я]+|[a-z]+))?',
                'class': 'controller__input controller__input_purple child',
            }),
            'middle_name': forms.TextInput(attrs={
                'placeholder': 'Иванович',
                'pattern': '([А-Я]|[A-Z])([а-я]+|[a-z]+)',
                'class': 'controller__input controller__input_purple child',
            }),
            'birthday': forms.DateInput(attrs={
                'placeholder': '01/01/1900',
                'type': 'date',
                'class': 'controller__input controller__input_purple child',
            }),
            'passport_data': forms.TextInput(attrs={
                'placeholder': '0000-000000',
                'class': 'controller__input controller__input_purple child',
            }),
            'phone_number': forms.TextInput(attrs={
                'placeholder': '+7 (555) 555-35-55',
                'type': 'tel',
                'class': 'controller__input controller__input_purple child',
                "maxlength": "30"
            }),
            'city': forms.TextInput(attrs={
                'placeholder': 'Москва; Стамбул; Лондон',
                'pattern': '\D+',
                'class': 'controller__input controller__input_purple child',
            }),
            'region': forms.TextInput(attrs={
                'placeholder': 'Московская; Тульская',
                'pattern': '\D+',
                'class': 'controller__input controller__input_purple child',
            }),
            'street': forms.TextInput(attrs={
                'placeholder': 'Тисовая; Бейкер-стрит',
                'pattern': '\D+',
                'class': 'controller__input controller__input_purple child',
            }),
            'num_home': forms.TextInput(attrs={
                'placeholder': '10A; 11',
                'class': 'controller__input controller__input_small controller__input_purple child',
            }),
            'num_apartment': forms.NumberInput(attrs={
                'placeholder': '322',
                'max': 999,
                'min': 1,
                'value': 1,
                'step': 1,
                'class': 'controller__input controller__input_small controller__input_purple child',
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'your_email@mail.ru',
                'class': 'controller__input controller__input_purple child',
            })
        }

class RegistrationConsultantForm(BaseRegistrationForm):
    class Meta(BaseRegistrationForm.Meta):
        model = User


class RegistrationRefferalConsultantForm(forms.ModelForm):
    class Meta(BaseRegistrationForm.Meta):
        model = RefferalConsultant
