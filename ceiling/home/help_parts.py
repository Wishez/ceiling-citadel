# -*- encoding: utf-8 -*-
node_parts = {
    "help": '<span class="helpText">',
    "variable": '<span class="variable">',
    "close": '</span>',
    "br": '<br/>',
    "dash": "&mdash;"
}
help_parts = {
    "main_variables": '%(variable)s{{first_name}}%(close)s %(dash)s %(help)sИван%(close)s%(br)s'
                      '%(variable)s{{last_name}}%(close)s %(dash)s %(help)sИванович%(close)s%(br)s'
                      '%(variable)s{{middle_name}}%(close)s %(dash)s %(help)sИванов%(close)s%(br)s'
                      '%(variable)s{{full_name}}%(close)s %(dash)s %(help)sИван Иванович%(close)s%(br)s'
                      '%(variable)s{{status}}%(close)s %(dash)s %(help)sЗарегистрированный "А"/Новый%(close)s%(br)s'
                      '%(variable)s{{site}}%(close)s %(dash)s %(help)scosmeticsyou.ru.%(close)s%(br)s' % node_parts,
    "additional_variables": '%(variable)s{{consultant_num}}%(close)s %(dash)s %(help)s123456789%(close)s%(br)s'
                            '%(variable)s{{refferal_ur}}%(close)s %(dash)s %(help)scosmeticsyou.ru/registration/123456789%(close)s%(br)s'
                            '%(variable)s{{url_to_personal_room}}%(close)s %(dash)s %(help)spcosmeticsyou.ru/personal_room/123456789%(close)s%(br)s' % node_parts
}
variables_text_1 = '<div class="variablesHint">Доступные переменные:<br/><br/>' \
                   '%(main_variables)s %(additional_variables)s</div>' % help_parts

variables_text_2 = '<div class="variablesHint">Доступные переменные:<br/><br/>' \
                   '%(main_variables)s<div>' % help_parts