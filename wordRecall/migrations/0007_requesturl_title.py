# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0006_requesthistory'),
    ]

    operations = [
        migrations.AddField(
            model_name='requesturl',
            name='title',
            field=models.CharField(default=b'', max_length=500, verbose_name=b'\xe6\xa0\x87\xe9\xa2\x98'),
        ),
    ]
