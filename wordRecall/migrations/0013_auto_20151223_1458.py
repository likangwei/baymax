# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('admin', '0001_initial'),
        ('wordRecall', '0012_auto_20151223_1424'),
    ]

    operations = [
        migrations.CreateModel(
            name='IgnoreUrl',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.CharField(default=b'', max_length=100, null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='setting',
            name='user_ptr',
        ),
        migrations.DeleteModel(
            name='Setting',
        ),
    ]
