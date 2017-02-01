from django.contrib import admin

from .models import Order, OrderItem


class ItemInline(admin.TabularInline):
    model = OrderItem
    fields = ['product', 'quantity']

class OrderAdmin(admin.ModelAdmin):
    model = Order
    inlines = [ItemInline]



admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)