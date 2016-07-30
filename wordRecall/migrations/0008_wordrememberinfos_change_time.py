# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0007_requesturl_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='wordrememberinfos',
            name='change_time',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 16, 5, 57, 8, 336177, tzinfo=utc), verbose_name=b'\xe4\xb8\x8a\xe6\xac\xa1\xe4\xbf\xae\xe6\x94\xb9\xe6\x97\xb6\xe9\x97\xb4'),
            preserve_default=False,
        ),
    ]
