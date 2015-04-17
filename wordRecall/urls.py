# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
admin.autodiscover()
urlpatterns = patterns('',
    (r'^$', 'wordRecall.views.index'),
    (r'^call', 'baymax.views.call'),
)

print urlpatterns
