# -*- encoding: utf-8 -*-
from django.contrib.sites.models import Site

node_parts = {
    "help": '<span class="helpText">',
    "variable": '<span class="variable">',
    "close": '</span>',
    "br": '<br/>',
    "dash": "&mdash;",
    "site": Site.objects.get_current().domain
}
help_parts = {
    "main_variables": '%(variable)s{{first_name}}%(close)s %(dash)s %(help)sИван%(close)s%(br)s'
                      '%(variable)s{{last_name}}%(close)s %(dash)s %(help)sИванович%(close)s%(br)s'
                      '%(variable)s{{middle_name}}%(close)s %(dash)s %(help)sИванов%(close)s%(br)s'
                      '%(variable)s{{full_name}}%(close)s %(dash)s %(help)sИван Иванович%(close)s%(br)s'
                      '%(variable)s{{site}}%(close)s %(dash)s %(help)s%(site)s.%(close)s%(br)s'
                      '%(variable)s{{phone_number}}%(close)s %(dash)s %(help)sТелефон заказчика(Может отсутствовать)%(close)s%(br)s'
                      '%(variable)s{{email}}%(close)s %(dash)s %(help)sEmail заказчика(Может отсутствовать)%(close)s%(br)s'% node_parts,
    "question": '%(variable)s{{question}}%(close)s %(dash)s %(help)sВопрос заказчика%(close)s%(br)s' % node_parts,
    "answer": '%(variable)s{{question}}%(close)s %(dash)s %(help)sВопрос заказчика%(close)s%(br)s' 
                '%(variable)s{{answer}}%(close)s %(dash)s %(help)sВаш ответ.%(close)s%(br)s' % node_parts,
    "ordered_products": '%(variable)s{{ordered_products}}%(close)s %(dash)s %(help)sЗаказанные прдеметы%(close)s%(br)s' % node_parts,
}


simple_hint = '<div class="variablesHint">Доступные переменные:<br/><br/>' \
                   '%(main_variables)s<div>' % help_parts
question_hint = '<div class="variablesHint">Доступные переменные:<br/><br/>' \
                   '%(main_variables)s%(question)s<div>' % help_parts
answer_hint = '<div class="variablesHint">Доступные переменные:<br/><br/>' \
                   '%(main_variables)s%(answer)s<div>' % help_parts
ordered_products_hint = '<div class="variablesHint">Доступные переменные:<br/><br/>' \
                   '%(main_variables)s%(ordered_products)s<div>' % help_parts