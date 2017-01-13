# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0017_auto_20160727_2154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myword',
            name='change_time',
            field=models.DateTimeField(auto_now=True, verbose_name=b'\xe4\xb8\x8a\xe6\xac\xa1\xe4\xbf\xae\xe6\x94\xb9\xe6\x97\xb6\xe9\x97\xb4'),
        ),
        migrations.AlterField(
            model_name='myword',
            name='user',
            field=models.ForeignKey(related_name='words', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='myword',
            unique_together=set([('user', 'word')]),
        ),
    ]
