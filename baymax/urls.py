# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^login', 'baymax.views.login'),
    (r'^reg', 'baymax.views.reg'),
)
