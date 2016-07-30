# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0016_auto_20160726_2318'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='word',
            name='type',
        ),
        migrations.AlterField(
            model_name='usersetting',
            name='user',
            field=models.OneToOneField(related_name='mysettings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='word',
            name='meaning',
            field=models.CharField(max_length=1024, verbose_name=b'\xe7\xbf\xbb\xe8\xaf\x91'),
        ),
    ]
