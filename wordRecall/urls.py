# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.conf.urls import patterns, url
from django.contrib import admin
import views
admin.autodiscover()

regex_word = '(?P<words>[\w]+)'

urlpatterns =[
    url(r'^$', views.index, name='index'),
    url(r'^contact/?', views.contact, name='contact'),
    url(r'^go/?', views.go_2_page, name='go'),
    # url(r'^call/?', views.call),
    url(r'^reg/?', views.reg, name='reg'),
    url(r'^jsonp/?', views.jsonp, name='jsonp'),
    url(r'^login/?', views.login, name='login'),
    url(r'^logout/?', views._logout, name='logout'),
    url(r'^translate/$', views.translate_, name='translate'),
    url(r'^translate_p/?', views.translate_p, name='translate_p'),
    url(r'^recall/?', views.get_recall_word, name='recall'),
    url(r'^get_words/?', views.get_words, name='get_words'),
    url(r'^get_words/(?P<words>)/$', views.get_words, name='get_words_info'),
    url(r'^get_word_detail$', views.get_word_detail, name='get_word_detail'),
    url(r'^get_word_detail/%s$' % regex_word, views.get_word_detail, name='get_word_detail'),
    url(r'^frequency_charts/?', views.frequency_charts, name='frequency'),
    url(r'^word_info/(?P<spelling>[\w\-]+)/', views.translate_word2, name='word_info'),
    url(r'^set_word_status/$', views.set_word_status, name='set_word_status'),
    url(r'^set_word_status/(?P<words>[\w\,\-]+)/(?P<status>[\d]{1})$', views.set_word_status, name='set_word_status'),
]

handler404 = 'wordRecall.views.handler404'

# import logging
# l = logging.getLogger('django.db.backends')
# l.setLevel(logging.DEBUG)
# l.addHandler(logging.StreamHandler())