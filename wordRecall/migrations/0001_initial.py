# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RecallInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recall_time', models.DateTimeField()),
                ('remember', models.IntegerField(choices=[(0, b'\xe8\xae\xb0\xe4\xbd\x8f0\xe6\x88\x90'), (1, b'\xe8\xae\xb0\xe4\xbd\x8f1\xe6\x88\x90'), (2, b'\xe8\xae\xb0\xe4\xbd\x8f2\xe6\x88\x90'), (3, b'\xe8\xae\xb0\xe4\xbd\x8f3\xe6\x88\x90'), (4, b'\xe8\xae\xb0\xe4\xbd\x8f4\xe6\x88\x90'), (5, b'\xe8\xae\xb0\xe4\xbd\x8f5\xe6\x88\x90'), (6, b'\xe8\xae\xb0\xe4\xbd\x8f6\xe6\x88\x90'), (7, b'\xe8\xae\xb0\xe4\xbd\x8f7\xe6\x88\x90'), (8, b'\xe8\xae\xb0\xe4\xbd\x8f8\xe6\x88\x90'), (9, b'\xe8\xae\xb0\xe4\xbd\x8f9\xe6\x88\x90'), (10, b'\xe8\xae\xb0\xe4\xbd\x8f10\xe6\x88\x90')], default=0, verbose_name=b'\xe8\xae\xb0\xe4\xbd\x8f\xe7\xa8\x8b\xe5\xba\xa6')),
            ],
        ),
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
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spelling', models.CharField(max_length=100, verbose_name=b'\xe6\x8b\xbc\xe5\x86\x99')),
                ('repeated', models.IntegerField(default=0, verbose_name=b'\xe5\xa4\x8d\xe7\x8e\xb0\xe7\x8e\x87')),
                ('type', models.IntegerField(choices=[(0, b'\xe6\x99\xae\xe9\x80\x9a'), (500, b'\xe6\x97\xa0\xe6\x95\x88')], default=0, verbose_name=b'\xe7\xb1\xbb\xe5\x9e\x8b')),
                ('meaning', models.CharField(max_length=8192, verbose_name=b'\xe7\xbf\xbb\xe8\xaf\x91')),
            ],
        ),
        migrations.CreateModel(
            name='WordRememberInfos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word_spelling', models.CharField(max_length=100, verbose_name=b'\xe6\x8b\xbc\xe5\x86\x99')),
                ('weight', models.IntegerField(choices=[(1, b'\xe9\x9d\x9e\xe5\xb8\xb8\xe9\x87\x8d\xe8\xa6\x81'), (2, b'\xe6\xaf\x94\xe8\xbe\x83\xe9\x87\x8d\xe8\xa6\x81'), (3, b'\xe4\xb8\x80\xe8\x88\xac'), (4, b'\xe4\xb8\x8d\xe9\x87\x8d\xe8\xa6\x81'), (5, b'\xe5\xae\x8c\xe5\x85\xa8\xe4\xb8\x8d\xe7\x94\xa8\xe8\xae\xb0')], default=3, verbose_name=b'\xe9\x87\x8d\xe8\xa6\x81\xe5\xba\xa6')),
                ('remember', models.IntegerField(choices=[(1, b'\xe7\x86\x9f\xe8\xaf\x8d,\xe4\xb8\x8d\xe5\x86\x8d\xe5\xa4\x8d\xe7\x8e\xb0'), (2, b'\xe4\xbc\xbc\xe6\x9b\xbe\xe7\x9b\xb8\xe8\xaf\x86\xef\xbc\x8c\xe4\xb8\x8b\xe6\xac\xa1\xe8\xbf\x98\xe8\xa6\x81\xe6\x8f\x90\xe9\x97\xae'), (3, b'\xe7\x94\x9f\xe8\xaf\x8d\xef\xbc\x8c\xe6\x9c\xaa\xe6\x8e\x8c\xe6\x8f\xa1'), (4, b'\xe6\x9c\xaa\xe5\x88\x86\xe7\xb1\xbb')], default=4, verbose_name=b'\xe8\xae\xb0\xe4\xbd\x8f\xe7\xa8\x8b\xe5\xba\xa6')),
                ('recall_counts', models.IntegerField(default=0, verbose_name=b'\xe8\xae\xb0\xe5\xbf\x86\xe6\xac\xa1\xe6\x95\xb0')),
                ('repeated', models.IntegerField(default=0, verbose_name=b'\xe5\xa4\x8d\xe7\x8e\xb0\xe7\x8e\x87')),
                ('remarks', models.CharField(max_length=100, null=True, verbose_name=b'\xe5\xa4\x87\xe6\xb3\xa8')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('word', models.ForeignKey(to='wordRecall.Word')),
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
        migrations.AddField(
            model_name='recallinfo',
            name='word_recall',
            field=models.ForeignKey(to='wordRecall.WordRememberInfos'),
        ),
    ]
