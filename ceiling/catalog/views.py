# -*- encoding: utf-8 -*-
import requests
from decouple import config

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse_lazy

from album.models import *

def extract_entities(m2m):
    array = m2m.all()
    return [entity for entity in array if entity in array]

current_domain = config('CURRENT_DOMAIN')

@csrf_exempt
def retrieve_catalog(request):
    if request.method == "GET":

        current_site = 'http://%s' % current_domain
        try:
            brands_response = requests.get("%s%s" % (current_site, reverse_lazy('brands_list')))
        except Exception:
            print('Не получилось запросить бренды')
            return HttpResponse(False)
        try:
            categories_response = requests.get("%s%s" % (current_site, reverse_lazy('categories_list')))
        except Exception:
            print('Не получилось запросить категории')
            return HttpResponse(False)

        data = {
            "brands": brands_response.json(),
            "categories": categories_response.json()
        }

        return JsonResponse(data)
    return HttpResponse(False)

@csrf_exempt
def get_album(request, slug):
    if request.method == "GET":
        album = Album.objects.get(slug=slug)
        current_site = 'https://%s' % current_domain

        images = [{
                "image":    '%s%s' % (current_site, image.image.url),
                "alt": image.alt
            } for image in AlbumImage.objects.filter(album=album)]

        return JsonResponse({
            "images": images
        })
    return HttpResponse(False)