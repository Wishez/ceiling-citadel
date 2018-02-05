from django.http import JsonResponse, HttpResponse, HttpRequest
from pages.models import CatalogPage
from django.contrib.auth.models import AnonymousUser
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.test import Client, RequestFactory
import json
def extract_entities(m2m):
    array = m2m.all()
    return [entity for entity in array if entity in array]

@csrf_exempt
def retrieve_catalog(request):
    if request.method == "GET":
        # catalog = CatalogPage.objects.get()
        print('make requests')
        client = Client()

        brands_response = client.get(reverse('brands_list'))
        categories_response = client.get(reverse('categories_list'))
        print(brands_response, categories_response.__dict__)
        data = {
            "brands": json.loads(brands_response.response), #extract_entities(catalog.brands),
            "categories": json.loads(categories_response.response)#extract_entities(catalog.categories)
        }
        print(data)
        return JsonResponse(data)
    return HttpResponse(False)

