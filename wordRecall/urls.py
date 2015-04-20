# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    (r'^call/?', 'wordRecall.views.call'),
    url(r'^recall/?', 'wordRecall.views.get_recall_word', name='recall'),
)

import logging
l = logging.getLogger('django.db.backends')
l.setLevel(logging.DEBUG)
l.addHandler(logging.StreamHandler())