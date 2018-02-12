from django.http import JsonResponse, HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import requests
from django.contrib.sites.models import Site
from album.models import *
import json
def extract_entities(m2m):
    array = m2m.all()
    return [entity for entity in array if entity in array]

@csrf_exempt
def retrieve_catalog(request):
    if request.method == "GET":
        
        current_site = 'http://%s' % Site.objects.get_current().domain
        brands_response = requests.get("%s%s" % (current_site, reverse('brands_list')))
        categories_response = requests.get("%s%s" % (current_site, reverse('categories_list')))
        
        data = {
            "brands": brands_response.json(), #extract_entities(catalog.brands),
            "categories": categories_response.json()#extract_entities(catalog.categories)
        }
        
        return JsonResponse(data)
    return HttpResponse(False)

@csrf_exempt
def get_album(request, slug):
    if request.method == "GET":
        album = Album.objects.get(slug=slug)
        current_site = 'http://%s' % Site.objects.get_current().domain

        images = [{
                "image": '%s%s' % (current_site, image.image.url),
                "alt": image.alt
            } for image in AlbumImage.objects.filter(album=album)]

        return JsonResponse({
            "images": images
        })
    return HttpResponse(False)