from rest_framework import serializers
from order import models
from django.db import transaction
from product.models import Product
from rhinorun.consumers import send_all


class OrderItemSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='product_name')

    class Meta:
        model = models.OrderItem
        fields = ('id', 'quantity', 'name')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.Order
        fields = ('id', 'state', 'user', 'items', 'total')

    def create(self, validated_data):

        items = self.initial_data.pop('items', None)

        with transaction.atomic():
            obj = super().create(validated_data)

            for item in items:
                name = item.pop('name')
                quantity = item.pop('quantity')

                # Hah, such programming.
                prod = Product.objects.get(name__iexact=name)
                obj.items.create(product=prod, quantity=quantity)

        send_all()

        return obj
