from django.db import models


class Product(models.Model):

    name = models.CharField(max_length=40)
    price = models.DecimalField(decimal_places=2, max_digits=8)

    def __str__(self):
        return self.name