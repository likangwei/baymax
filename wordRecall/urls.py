# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
import views
admin.autodiscover()

urlpatterns =[
    url(r'^', views.get_tran_page, name='page'),

    url(r'^call/?', views.call),
    url(r'^reg/?', views.reg, name='reg'),
    url(r'^login/?', views.login, name='login'),
    url(r'^recall/?', views.get_recall_word, name='recall'),
    url(r'^word_info/(?P<spelling>[\w\-]+)/', views.translate_word, name='word_info'),
    url(r'^set_word_status/(?P<words>[\w\,\-]+)/(?P<status>[\d]{1})$', views.get_word_infos, name='set_word_status'),
]

#import logging
#l = logging.getLogger('django.db.backends')
#l.setLevel(logging.DEBUG)
#l.addHandler(logging.StreamHandler())