# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-01 13:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='product_name',
            field=models.CharField(default='Bleh', max_length=40),
            preserve_default=False,
        ),
    ]
