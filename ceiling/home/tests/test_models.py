# -*- coding: utf-8 -*-
from django.test import TestCase
from home.models import *
from model_mommy import mommy
from django.utils.timezone import now
from home.models import Settings

class OrderTestModel(TestCase):
    def setUp(self):
        self.settings = mommy.make(
            "home.Settings",
            _fill_optional=True,
            created=now(),
            modified=now()
        )
        models = [
            "combustibility",
            "acoustics",
            "lightning",
            "edge",
            "material",
            "color",
        ]
        def get_white_color():
            return '#ffffff'
        mommy.generators.add("colorfield.fields.ColorField", get_white_color)
        for model in models:
            setattr(self, model, mommy.make(
                'home.%s' % model,
                _fill_optional=True,
                created=now(),
                modified=now())
            )

    def create_home_models_test(self):
        self.assertEquals(self.combustibility.id, 1)
        self.assertEquals(self.acoustics.id, 1)
        self.assertEquals(self.lightning.id, 1)
        self.assertEquals(self.edge.id, 1)
        self.assertEquals(self.color.id, 1)
        self.assertEquals(self.material.id, 1)
        self.assertEquals(self.settings.id, 1)

    def delete_home_models_test(self):
        self.combustibility.delete()
        self.acoustics.delete()
        self.lightning.delete()
        self.edge.delete()
        self.material.delete()
        self.color.delete()
        self.settings.delete()
