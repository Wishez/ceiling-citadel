# -*- encoding: utf-8 -*-

from model_utils.models import TimeStampedModel
import uuid as uuid_lib
from django.db import models
from django.utils.translation import gettext_lazy as _
from home.models import \
    Combustibility, \
    Color, \
    Material, \
    Acoustics, \
    Lightning, \
    Edge, \
    Proportion
from pages.validators import validate_slug_field

class BaseDescriptionModel(TimeStampedModel):

    name = models.CharField(_('Наименование'), max_length=100)
    description = models.TextField(
        _('Описание'),
        max_length=650,
        null=True,
        blank=True
    )
    slogan = models.CharField(
        _('Слоган'),
        max_length=150,
        null=True,
        blank=True,
        help_text=_("Краткое описание особенностей. "
                    "К примеру, Наименование: 'Алюминий', Слоган: '13-й элемент таблицы менделеева'")
    )
    preview = models.ForeignKey(
        "album.albumimage",
        verbose_name=_('Обложка/Превью')
    )

    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    slug = models.SlugField(
        _('Ссылка'),
        help_text=_('К примеру, "new-awesome_collection-2018"'),
        max_length=150,
        validators=[validate_slug_field],
        unique=True,
        default=""
    )

    is_shown = models.BooleanField(
        _('Отобрзить в каталоге?'),
        default=True
    )

    def __str__(self):
        return self.name
    class Meta:
        abstract = True

class Brand(BaseDescriptionModel):
    categories = models.ManyToManyField(
        "catalog.category",
        verbose_name=_("Категории бренда"),
        related_name="categories_of_brand",
        help_text=_("Выбирете категории, которые будут отображаться на странице выбранного пользователем бренда."),
        blank=True
    )
    collections = models.ManyToManyField(
        "catalog.collection",
        verbose_name=_("Коллекции бренда"),
        related_name="collections_of_brand",
        help_text=_("Выбирете колекции, которые будут отображаться на странице выбранного пользователем бренда."),
        blank = True
    )

    class Meta:
        db_table = 'brands_of_catalog'
        verbose_name = _('Бренд')
        verbose_name_plural = _('Бренды')


class CategorySection(TimeStampedModel):
    section_name = models.CharField(_('Наименование'), max_length=150)


    def __str__(self):
        return self.section_name
    class Meta:
        db_table = 'section_of_category'
        verbose_name = _('Секция')
        verbose_name_plural = _('Секции')

class Category(BaseDescriptionModel):
    section = models.ForeignKey(
        CategorySection,
        verbose_name=_('Секция'),
        related_name="group_of_category",
        help_text=_('Принадлежность категории к одной из секций "Форма", "Системы", "Освящение" и т.п. <br/>Для страницы каталога.')
    )

    brands = models.ManyToManyField(
        "catalog.brand",
        verbose_name=_("Бренды категории"),
        related_name="brands_of_category",
        help_text=_("Выбирете бренды, которые будут отображаться на странице выбранной пользователем категории."),
        blank=True
    )

    collections = models.ManyToManyField(
        "catalog.collection",
        verbose_name=_("Коллекции категорий"),
        related_name="collections_of_category",
        help_text=_("Выбирете колекции, которые будут отображаться на странице выбранной пользователем категории."),
        blank=True
    )

    products = models.ManyToManyField(
        "catalog.product",
        verbose_name=_("Отдельные предметы"),
        related_name="products_of_category",
        help_text=_("Выбирете отдельные предметы относящиеся к этой категории, которые будут отображаться на странице выбранной пользователем категории в разделе 'Отдельные предметы'."),
        blank=True
    )

    class Meta:
        db_table = 'categories_of_catalog'
        verbose_name = _('Категория')
        verbose_name_plural = _('Категории')


class Collection(BaseDescriptionModel):
    collection_items = models.ManyToManyField(
        "catalog.product",
        verbose_name=_('Предметы коллекции'),
        related_name="collection_items"
    )

    brand = models.ForeignKey(
        Brand,
        verbose_name=_("Бренд коллекции"),
        related_name="brand_of_collection",
        help_text=_("Выбирете бренд, который относится к этой коллекции. Она может быть независимой."),
        blank=True,
        null=True
    )

    class Meta:
        db_table = 'collections_of_brand'
        verbose_name = _('Коллекция')
        verbose_name_plural = _('Коллекции')


class BaseProductModel(TimeStampedModel):

    # Dropdown Lists

    width = models.CharField(
        _('Ширина'),
        max_length=100,
        help_text=_('Пример: От 10 мм до 250 мм'),
        blank=True,
        null=True
    )
    height = models.CharField(
        _('Высота'),
        max_length=100,
        help_text=_('Пример: 8мм'),
        blank=True,
        null=True
    )
    length = models.CharField(
        _('Длина'),
        max_length=100,
        help_text=_('Пример: от 1м до 10м'),
        blank=True,
        null=True
    )
    thickness = models.CharField(
        _('Толщина'),
        max_length=100,
        help_text=_('Пример: от 1 мм до 1,5 мм'),
        blank=True,
        null=True
    )

    step_between_panels = models.CharField(
        _('Шаг между панелями'),
        max_length=100,
        help_text=_('Пример: от 100 мм до 1000 мм'),
        blank=True,
        null=True
    )

    angle_of_bend = models.IntegerField(
        _('Минимальный угол загиба'),
        help_text=_('Целочисленное значение, к примеру: 30'),
        blank=True,
        null=True
    )

    diameter = models.CharField(
        _('Диаметр окружности'),
        max_length=100,
        help_text=_('Пример: от 50 мм до 150 мм'),
        blank=True,
        null=True
    )
    ceil_size = models.CharField(
        _('Размер ячеек'),
        max_length=100,
        help_text=_('Пример: от 5мм до 50 мм'),
        blank=True,
        null=True
    )


    class Meta:
        abstract = True


class Product(BaseProductModel):
    page_title = models.CharField(
        _('Заголовок'),
        help_text=_('Название страницы во вкладке'),
        max_length=100,
        blank=True,
        null=True
    )
    is_shown = models.BooleanField(
        _('Отобрзить в каталоге?'),
        default=True
    )

    meta = models.TextField(
        _('META-описание страницы'),
        max_length=350,
        blank=True,
        null=True
    )
    name = models.CharField(_('Наименование'), max_length=100)
    description = models.TextField(
        _('Описание'),
        max_length=650,
        null=True,
        blank=True
    )
    slogan = models.CharField(
        _('Слоган'),
        max_length=150,
        null=True,
        blank=True,
        help_text=_("Краткое описание особенностей. "
                    "К примеру, Наименование: 'Алюминий', Слоган: '13-й элемент таблицы менделеева'")
    )
    price = models.DecimalField(
        _('Цена за штуку'),
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
    )
    choices = (
        ('₽', '₽'),
        ('€', '€'),
        ('$', '$'),
    )
    currency = models.CharField(
        _('Валюта'),
        max_length=20,
        choices=choices,
        null=True,
        blank=True,
        default="₽"
    )

    uuid = models.UUIDField(
        _('Идентификатор'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    slug = models.SlugField(
        _('Ссылка'),
        help_text=_('К примеру, "new-awesome_collection-2018"'),
        max_length=150,
        validators=[validate_slug_field],
        unique=True,
        default=""
    )
    combustibility = models.ManyToManyField(
        Combustibility,
        verbose_name=_("Горючесть"),
        blank=True
    )
    acoustics = models.ManyToManyField(
        Acoustics,
        verbose_name=_("Акустика"),
        blank=True
    )
    lightning = models.ManyToManyField(
        Lightning,
        verbose_name=_("Освящение"),
        blank=True
    )
    edges = models.ManyToManyField(
        Edge,
        verbose_name=_("Кромки"),
        blank=True
    )
    material = models.ManyToManyField(
        Material,
        verbose_name=_("Материал"),
        blank=True
    )
    colors = models.ManyToManyField(
        Color,
        verbose_name=_("Цвет"),
        blank=True
    )
    proportions = models.ManyToManyField(
        Proportion,
        verbose_name=_("Пропорции"),
        blank=True
    )
    preview = models.ForeignKey(
        "album.albumimage",
        verbose_name=_('Обложка/Превью')
    )

    visualisation = models.ForeignKey(
        "album.albumimage",
        verbose_name=_('Изображение визуализирующие продукт'),
        related_name='product_visualisation',
        blank=True,
        null=True
    )
    album = models.ForeignKey(
        "album.album",
        verbose_name=_('Презентационный альбом'),
        help_text=_("Альбом для слайдов."),
        blank=True,
        null=True
    )

    content = models.TextField(
        _('Дополнительный контент'),
        max_length=8164,
        blank=True,
        null=True
    )
    brand = models.ForeignKey(
        Brand,
        verbose_name=_("Бренд образца"),
        related_name="brand_of_product",
        help_text=_("Выбирете бренд, который относится к этому образцу."),
        blank=True,
        null=True
    )

    section = models.ForeignKey(
        CategorySection,
        verbose_name=_("Категория продукта"),
        related_name="section_of_product",
        help_text=_("Выбирете категорию образца.."),
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name
    class Meta:
            db_table = 'collection_products'
            verbose_name = _('Продукт')
            verbose_name_plural = _('Продукт')

