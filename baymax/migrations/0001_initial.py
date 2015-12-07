# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eat_time', models.DateTimeField(verbose_name=b'\xe6\x97\xb6\xe9\x97\xb4')),
            ],
        ),
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food_name', models.CharField(max_length=50, verbose_name=b'\xe9\xa3\x9f\xe7\x89\xa9\xe5\x90\x8d\xe7\xa7\xb0')),
                ('weight', models.FloatField(verbose_name=b'\xe9\x87\x8d\xe9\x87\x8f')),
                ('cook', models.ForeignKey(to='baymax.Cook')),
            ],
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('material_name', models.CharField(max_length=50, verbose_name=b'\xe9\xa3\x9f\xe6\x9d\x90\xe5\x90\x8d\xe7\xa7\xb0')),
            ],
        ),
        migrations.CreateModel(
            name='Stool',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('do_time', models.DateTimeField(auto_now=True, verbose_name=b'\xe6\x97\xb6\xe9\x97\xb4')),
                ('health_degree', models.CharField(choices=[(b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa61', b'HEALTH_1'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa62', b'HEALTH_2'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa63', b'HEALTH_3'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa64', b'HEALTH_4'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa65', b'HEALTH_5'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa66', b'HEALTH_6'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa67', b'HEALTH_7'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa68', b'HEALTH_8'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa69', b'HEALTH_9'), (b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa610', b'HEALTH_10')], max_length=10, verbose_name=b'\xe5\x81\xa5\xe5\xba\xb7\xe5\xba\xa6')),
            ],
        ),
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
