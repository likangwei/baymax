# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0019_auto_20160729_2256'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ignoreurl',
            name='type',
            field=models.IntegerField(default=1, verbose_name=b'\xe7\xb1\xbb\xe5\x9e\x8b', choices=[(0, b'\xe6\x80\xbb\xe6\x98\xaf\xe7\xbf\xbb\xe8\xaf\x91'), (1, b'\xe4\xb8\x8d\xe5\x86\x8d\xe7\xbf\xbb\xe8\xaf\x91')]),
        ),
        migrations.AlterField(
            model_name='word',
            name='google_meaning',
            field=models.CharField(default=None, max_length=1024, null=True, verbose_name=b'Google\xe7\xbf\xbb\xe8\xaf\x91'),
        ),
        migrations.AlterField(
            model_name='word',
            name='repeated',
            field=models.IntegerField(default=0, verbose_name=b'\xe7\xbd\xae\xe4\xb8\xba\xe7\x86\x9f\xe8\xaf\x8d\xe7\x9a\x84\xe7\x94\xa8\xe6\x88\xb7\xe6\x95\xb0'),
        ),
    ]
