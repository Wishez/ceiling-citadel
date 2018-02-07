from rest_framework import serializers

from ..models import Category, Brand, Product, Collection
from home.models import Color
from album.models import AlbumImage, Album

base_list_fields = [
    'uuid',
    'name',
    'description',
    'preview',
    'slug'
]

base_fields = [
    'uuid',
    'name',
    'description',
    'slug',
    'slogan',
]
# Base
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumImage
        fields = [
            'image',
            'alt'
        ]

class AlbumSerializer(serializers.ModelSerializer):
    albumimage = ImageSerializer(
        read_only=True,
        many=True
    )
    class Meta:
        model = Album
        fields = [
            'albumimage'
        ]
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = [
            'name',
            'color'
        ]

# Product
class ProductsListSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(
        many=True,
        read_only=True,
    )
    preview = ImageSerializer(
        read_only=True
    )

    class Meta:
        model = Product
        fields = base_list_fields + [
            'colors',
            'width',
            'height',
            'length',
            'thickness',
        ]

class ProductSerializer(serializers.ModelSerializer):
    combustibility = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    acoustics = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    lightning = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    edges = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    visualisation = ImageSerializer(
        read_only=True
    )
    material = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    colors = ColorSerializer(
        many=True,
        read_only=True,
    )

    album = AlbumSerializer(
        read_only=True
    )

    class Meta:
        model = Product
        fields = base_list_fields + [
            'combustibility',
            'acoustics',
            'lightning',
            'edges',
            'material',
            'colors',
            'width',
            'height',
            'length',
            'thickness',
            'visualisation',
            'album',
            'content'
        ]

# Category
class CategoryListSerializer(serializers.ModelSerializer):
    preview = ImageSerializer(
        read_only=True
    )
    section = serializers.SlugRelatedField(
        read_only=True,
        slug_field='section_name'
    )
    class Meta:
        model = Category
        fields = base_list_fields + ['section']


# !Brand
class BrandListSerializer(serializers.ModelSerializer):
    preview = ImageSerializer(
        read_only=True
    )
    class Meta:
        model = Brand
        fields = base_list_fields


# !Collection
class CollectionListSerializer(serializers.ModelSerializer):
    preview = ImageSerializer(
        read_only=True
    )
    class Meta:
        model = Collection
        fields = base_list_fields

# !Category
class CategorySerializer(serializers.ModelSerializer):
    section = serializers.SlugRelatedField(
        read_only=True,
        slug_field='section_name'
    )
    brands = BrandListSerializer(
        many=True,
        read_only=True
    )
    collections = CollectionListSerializer(
        many=True,
        read_only=True
    )
    products = ProductsListSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Category
        fields = base_fields + ['section', 'brands', 'collections', 'products']
# !Brand
class BrandSerializer(serializers.ModelSerializer):
    categories = CategoryListSerializer(
        many=True,
        read_only=True
    )

    collections = CollectionListSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Brand
        fields = base_fields + ['categories', 'collections']

# !Collection
class CollectionSerializer(serializers.ModelSerializer):
    collection_items = ProductsListSerializer(
        many=True,
        read_only=True
    )
    brand = BrandListSerializer(
        read_only=True
    )
    class Meta:
        model = Collection
        fields = base_fields + ['collection_items', 'brand']

