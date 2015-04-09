# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe5\x90\x8d\xe5\xad\x97')),
                ('age', models.IntegerField(verbose_name=b'\xe5\xb9\xb4\xe9\xbe\x84')),
                ('birthday', models.DateField(verbose_name=b'\xe7\x94\x9f\xe6\x97\xa5')),
            ],
        ),
    ]
