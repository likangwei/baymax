# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', 'baymax.views.index'),
    (r'^login', 'baymax.views.login'),
    (r'^reg', 'baymax.views.reg'),
    (r'^eat', 'baymax.views.eat'),
    (r'^stool', 'baymax.views.stool'),
)
