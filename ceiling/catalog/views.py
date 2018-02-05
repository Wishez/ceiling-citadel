from django.http import JsonResponse, HttpResponse, HttpRequest
from pages.models import CatalogPage
from django.contrib.auth.models import AnonymousUser
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import requests
import json
from django.contrib.sites.models import Site
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

