# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-30 19:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20170422_1326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='g_id',
            field=models.CharField(max_length=200),
        ),
    ]
