from django.contrib import admin

from .models import Order, OrderItem
from rhinorun.consumers import send_all


class ItemInline(admin.TabularInline):
    model = OrderItem
    fields = ['product', 'quantity']


class OrderAdmin(admin.ModelAdmin):
    model = Order
    inlines = [ItemInline]

    def save_model(self, *args, **kwargs):
        super().save_model(*args, **kwargs)
        send_all()


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)