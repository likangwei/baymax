# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0008_wordrememberinfos_change_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='word',
            name='google_meaning',
            field=models.CharField(default='', max_length=1024, verbose_name=b'Google\xe7\xbf\xbb\xe8\xaf\x91'),
            preserve_default=False,
        ),
    ]
