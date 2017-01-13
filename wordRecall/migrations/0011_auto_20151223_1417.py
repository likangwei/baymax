# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordRecall', '0010_auto_20151223_1358'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Account',
            new_name='Setting',
        ),
    ]
