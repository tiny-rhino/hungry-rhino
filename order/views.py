from django.shortcuts import render
from rest_framework import viewsets
from django.views.generic import View
from .models import Order, OrderItem
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderView(View):
	template_name = 'order.html'

	def get(self, request, *args, **kwargs):
		context = {
			'order': Order.objects.get(id=self.kwargs.get('id')),
			'order_items': OrderItem.objects.filter(order=self.kwargs.get('id'))
		}
		return render(request, self.template_name, context)