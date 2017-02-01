from rest_framework import serializers
from order import models

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
