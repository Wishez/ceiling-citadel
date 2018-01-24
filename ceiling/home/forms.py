# -*- encoding: utf-8 -*-
from django import forms

from .models import Callback


class CallbackForm(forms.ModelForm):
    class Meta:
        model = Callback
        fields = ('callback_name', 'callback_phone',)
        widgets = {
            'callback_name': forms.TextInput(attrs={
                'class': 'controller__input controller__input_red child',
                'placeholder': 'Иван Иванович Иванов'
                # 'pattern': '([А-Я]|[A-Z])([а-я]+|[a-z]+)(([-\s])([А-Я]|[A-Z])?([а-я]+|[a-z]+))?'
            }),
            'callback_phone': forms.TextInput(attrs={
                'class': 'controller__input controller__input_red child',
                'type': 'tel',
                'placeholder': '+7 (985) 905-12-51',
                "maxlength": "30"
            }),
        }
