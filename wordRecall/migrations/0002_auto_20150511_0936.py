# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='requesthistory',
            name='url',
        ),
        migrations.RemoveField(
            model_name='requesthistory',
            name='user',
        ),
        migrations.DeleteModel(
            name='RequestHistory',
        ),
        migrations.DeleteModel(
            name='RequestUrl',
        ),
    ]
