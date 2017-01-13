# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import django.contrib.auth.models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        ('wordRecall', '0009_word_google_meaning'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('user_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('ignore_urls', models.TextField(default=None, null=True)),
            ],
            options={
                'abstract': False,
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='word',
            name='google_meaning',
            field=models.CharField(default=b'', max_length=1024, verbose_name=b'Google\xe7\xbf\xbb\xe8\xaf\x91'),
        ),
    ]
