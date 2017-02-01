from django.shortcuts import render
from django.views.generic import View
from .models import Product

class ProductListView(View):
    template_name = 'home.html'

    def get(self, request, *args, **kwargs):
        context = {
        	'products': Product.objects.all()
        }

        return render(request, self.template_name, context)