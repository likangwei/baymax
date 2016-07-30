# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wordRecall', '0014_auto_20160720_0047'),
    ]

    operations = [
        migrations.RunSQL("delete from `wordrecall_wordrememberinfos` where remember=3"),
        migrations.RenameModel("WordRememberInfos", "MyWord"),
        migrations.RenameField("myword", "word_spelling", "spelling"),
        migrations.RenameField("myword", "remember", "status"),
    ]
