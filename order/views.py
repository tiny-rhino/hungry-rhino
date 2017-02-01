from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer