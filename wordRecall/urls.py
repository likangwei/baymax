# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
import views
admin.autodiscover()

urlpatterns =[
    url(r'^call/?', views.call),
    url(r'^recall/?', views.get_recall_word, name='recall'),
]

import logging
l = logging.getLogger('django.db.backends')
l.setLevel(logging.DEBUG)
l.addHandler(logging.StreamHandler())