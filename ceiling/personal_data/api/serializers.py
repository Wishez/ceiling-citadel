from rest_framework import serializers

from ..models import OrderedProduct



# Base


class OrderedProductSerializer(serializers.ModelSerializer):
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
    material = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = OrderedProduct
        fields = [
            'uuid',
            'name',
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
            'product',
            'quantity',
        ]