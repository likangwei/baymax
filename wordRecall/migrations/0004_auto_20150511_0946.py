# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0003_auto_20150511_0936'),
    ]

    operations = [
        migrations.AddField(
            model_name='requesthistory',
            name='url_info',
            field=models.CharField(default='', max_length=500, verbose_name=b'\xe8\xae\xbf\xe9\x97\xae\xe9\x93\xbe\xe6\x8e\xa5'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='requesthistory',
            name='request_number',
            field=models.IntegerField(default=0, verbose_name=b'\xe8\xaf\xb7\xe6\xb1\x82\xe6\xac\xa1\xe6\x95\xb0'),
        ),
    ]
