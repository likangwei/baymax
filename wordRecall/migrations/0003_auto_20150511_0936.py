# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wordRecall', '0002_auto_20150511_0936'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_number', models.IntegerField(verbose_name=b'\xe8\xaf\xb7\xe6\xb1\x82\xe6\xac\xa1\xe6\x95\xb0')),
            ],
        ),
        migrations.CreateModel(
            name='RequestUrl',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=500, verbose_name=b'\xe8\xae\xbf\xe9\x97\xae\xe9\x93\xbe\xe6\x8e\xa5')),
            ],
        ),
        migrations.AddField(
            model_name='requesthistory',
            name='url',
            field=models.ForeignKey(to='wordRecall.RequestUrl'),
        ),
        migrations.AddField(
            model_name='requesthistory',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
