# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0013_auto_20151223_1458'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='wordrememberinfos',
            options={'verbose_name': '\u6211\u7684\u5355\u8bcd'},
        ),
        migrations.AlterField(
            model_name='ignoreurl',
            name='user',
            field=models.ForeignKey(related_name='ignore_urls', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='wordrememberinfos',
            name='remember',
            field=models.IntegerField(default=4, verbose_name=b'\xe8\xae\xb0\xe4\xbd\x8f\xe7\xa8\x8b\xe5\xba\xa6', choices=[(1, b'\xe7\x86\x9f\xe8\xaf\x8d'), (3, b'\xe7\x94\x9f\xe8\xaf\x8d')]),
        ),
        migrations.AlterUniqueTogether(
            name='ignoreurl',
            unique_together=set([('user', 'url')]),
        ),
    ]
