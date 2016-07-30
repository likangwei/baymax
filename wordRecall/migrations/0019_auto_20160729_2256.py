# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0018_auto_20160728_0142'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='spelling',
            field=models.CharField(unique=True, max_length=100, verbose_name=b'\xe6\x8b\xbc\xe5\x86\x99'),
        ),
    ]
