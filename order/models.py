from django.db import models
from django.db.models import Sum, F
from django.db.models.signals import post_save

STATE = (
    ('new', 'new'),
    ('processing', 'processing'),
    ('done', 'done'),
    ('removed', 'removed'),
)


class OrderManager(models.Manager):

    def update_state(self, pk, state):
        self.filter(pk=pk).update(state=state)

    def dashboard(self):
        import json
        from order.serializers import OrderSerializer as OS
        qs = self.exclude(state='removed')
        return json.dumps([OS(x).data for x in qs])


class Order(models.Model):
    state = models.CharField(choices=STATE, default='new', max_length=10)
    total = models.DecimalField(
        decimal_places=2, max_digits=8, null=True, blank=True
    )

    user = models.CharField(max_length=40)

    objects = OrderManager()

    def __str__(self):
        return "Order: {}".format(self.pk)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items')
    product = models.ForeignKey('product.Product')

    product_name = models.CharField(max_length=40)
    quantity = models.IntegerField(default=1)
    item_price = models.DecimalField(decimal_places=2, max_digits=8)
    sub_total = models.DecimalField(decimal_places=2, max_digits=8)

    def __str__(self):
        return "{} - item {}".format(self.order, self.pk)

    def save(self, *args, **kwargs):
        self.product_name = self.product.name
        self.item_price = self.product.price
        self.sub_total = self.item_price * int(self.quantity)
        return super().save(*args, **kwargs)


def update_total(sender, instance, **kwargs):
    total = OrderItem.objects.filter(
        order_id=instance.order_id
    ).aggregate(total=Sum('sub_total'))['total']
    Order.objects.filter(pk=instance.order_id).update(total=total)


post_save.connect(update_total, sender=OrderItem)
