# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
admin.autodiscover()
import views
urlpatterns = [
    url(r'^$', views.index),
    url(r'^login', views.login, name='login'),
    url(r'^reg', views.reg, name='reg'),
    url(r'^eat', views.eat, name='eat'),
    url(r'^stool', views.stool, name='stool'),
]
