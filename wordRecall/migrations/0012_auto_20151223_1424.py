# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0011_auto_20151223_1417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setting',
            name='ignore_urls',
            field=models.TextField(default=b'', null=True),
        ),
    ]
