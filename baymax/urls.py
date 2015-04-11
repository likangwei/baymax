# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
admin.autodiscover()
import django.core.cache
urlpatterns = patterns('',
    (r'^$', 'baymax.views.index'),
    (r'^login', 'baymax.views.login', 'login'),
    url(r'^reg', 'baymax.views.reg', name='reg'),
    url(r'^eat', 'baymax.views.eat', name='eat'),
    url(r'^stool', 'baymax.views.stool', name='stool'),
)

print urlpatterns
