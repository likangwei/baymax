# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wordRecall', '0015_auto_20160720_0144'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSetting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('auto_change_page', models.BooleanField(default=False, verbose_name=b'\xe8\x87\xaa\xe5\x8a\xa8\xe7\xbf\xbb\xe8\xaf\x91\xe6\x89\x80\xe6\x9c\x89\xe9\xa1\xb5\xe9\x9d\xa2')),
                ('user', models.OneToOneField(related_name='setting', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterModelOptions(
            name='myword',
            options={'verbose_name': 'myword'},
        ),
        migrations.RemoveField(
            model_name='myword',
            name='recall_counts',
        ),
        migrations.RemoveField(
            model_name='myword',
            name='remarks',
        ),
        migrations.RemoveField(
            model_name='myword',
            name='repeated',
        ),
        migrations.RemoveField(
            model_name='myword',
            name='status',
        ),
        migrations.RemoveField(
            model_name='myword',
            name='weight',
        ),
        migrations.AddField(
            model_name='ignoreurl',
            name='type',
            field=models.IntegerField(default=1, choices=[(0, b'\xe6\x80\xbb\xe6\x98\xaf\xe7\xbf\xbb\xe8\xaf\x91'), (1, b'\xe4\xb8\x8d\xe5\x86\x8d\xe7\xbf\xbb\xe8\xaf\x91')]),
        ),
        migrations.AlterModelTable(
            name='myword',
            table='wordRecall_myword',
        ),
    ]
