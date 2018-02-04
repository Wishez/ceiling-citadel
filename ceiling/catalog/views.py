from django.http import JsonResponse, HttpResponse
from pages.models import CatalogPage

def extract_entities(m2m):
    return [entity for entity in m2m if entity in m2m]

def retrieve_catalog(request):
    if request.GET:
        catalog = CatalogPage.objects.get()

        data = {
            "brands": extract_entities(catalog.brands),
            "categories": extract_entities(catalog.categories)
        }

        return JsonResponse(data)
    return HttpResponse(False)

