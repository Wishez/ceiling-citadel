# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from .models import *
from django.contrib.sites.models import Site
from home.models import *
from catalog.models import Product, Brand, Category, Collection
from home.models import Settings

def get_single_model(Model):
    return Model.objects.get()


class BaseView(TemplateView):
    template_name = 'index.html'
    def __init__(self):
        self.page_model = None
        self.page = None
        self.settings = get_single_model(Settings)
        self.meta = self.settings.meta
        self.active_page = ''
        self.is_single_model = True

    # Дополняет контекст свойствами нужной страницы, если нужно
    def set_additional_context(self, context):
        return context
    def get_page(self):
        self.page = self.page_model.objects.get()

    def get_context_data(self, **kwargs):
        context = super(BaseView, self).get_context_data(**kwargs)

        if self.is_single_model:
            self.get_page()

        is_page_set = self.page is not None

        if is_page_set:
            page = self.page
            context['title'] = page.page_title
            context['page'] = page
            # Установка мета-описания для текущей страницы
            if page.meta != '':
                self.meta = page.meta

        context['site'] = Site.objects.get_current().domain
        context['meta'] = self.meta
        context['settings'] = self.settings

        return self.set_additional_context(context)

class BaseProductView(BaseView):
    def __init__(self):
        super(BaseProductView, self).__init__()
        self.page_model = Product
        self.is_single_model = False

    def get_page(self, productSlug):
        self.page = self.page_model.objects.get(slug=productSlug)


class CategorySampleView(BaseProductView):

    def get(
        self,
        request,
        categorySlug,
        productSlug
    ):
        self.get_page(productSlug)

        return super(CategorySampleView, self).get(request)

class CategoryProductView(BaseProductView):

    def get(
        self,
        request,
        categorySlug,
        collectionSlug,
        productSlug
    ):
        self.get_page(productSlug)

        return super(CategoryProductView, self).get(request)


class BrandSampleView(BaseProductView):

    def get(
        self,
        request,
        brandSlug,
        productSlug
    ):
        self.get_page(productSlug)

        return super(BrandSampleView, self).get(request)

class BrandProductView(BaseProductView):

    def get(
        self,
        request,
        brandSlug,
        collectionSlug,
        productSlug
    ):
        self.get_page(productSlug)

        return super(BrandProductView, self).get(request)


class HomeView(BaseView):
    def __init__(self):
        super(HomeView, self).__init__()
        self.page_model = HomePage


class ServiceView(BaseView):

    def __init__(self):
        super(ServiceView, self).__init__()
        self.page_model = ServicePage

class ContactsView(BaseView):
    def __init__(self):
        super(ContactsView, self).__init__()
        self.page_model = ContactsPage

class CatalogView(BaseView):
    def __init__(self):
        super(CatalogView, self).__init__()
        self.page_model = CatalogPage

class BrandView(CatalogView):
    def get(
        self,
        request,
        brandSlug,
    ):
        return super(BrandView, self).get(request)
class CategoryView(CatalogView):
    def get(
        self,
        request,
        categorySlug,
    ):
        return super(CategoryView, self).get(request)

class BrandCollectionView(CatalogView):
    def get(
        self,
        request,
        brandSlug,
        collectionSlug,
    ):
        return super(BrandCollectionView, self).get(request)

class CategoryCollectionView(CatalogView):
    def get(
        self,
        request,
        categorySlug,
        collectionSlug,
    ):
        return super(CategoryCollectionView, self).get(request)

