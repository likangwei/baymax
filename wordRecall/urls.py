# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.contrib import admin
import views
from django.conf.urls import url, include
from rest_framework import routers
from restview import IgnoreUrlViewSet
from restview import UserViewSet
from restview import WordViewSet
from rest_framework import urls
from django.views.decorators.csrf import csrf_exempt
# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'settings', IgnoreUrlViewSet)
router.register(r'users', UserViewSet)
router.register(r'words', WordViewSet)
regex_word = '(?P<words>[\w]+)'
admin.autodiscover()
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^rest/', include(router.urls), name='rest'),
    url(r'^$', views.index, name='index'),
    url(r'^contact/?', views.contact, name='contact'),
    url(r'^go/?', views.go_2_page, name='go'),
    # url(r'^call/?', views.call),
    url(r'^reg/?', views.reg, name='reg'),
    url(r'^login/?', views.login, name='login'),
    url(r'^checkUser/?', views.check_user, name='checkUser'),
    url(r'^logout/?', views._logout, name='logout'),
    url(r'^translate/$', views.translate_, name='translate'),
    url(r'^get_words_meaning/?$', views.get_words_meaning, name='get_words_meaning'),
    url(r'^translate_p/?', views.translate_p, name='translate_p'),
    url(r'^recall/?', views.get_recall_word, name='recall'),
    url(r'^get_words/?', views.get_words, name='get_words'),
    url(r'^get_words/(?P<words>)/$', views.get_words, name='get_words_info'),
    url(r'^get_word_detail$', views.get_word_detail, name='get_word_detail'),
    url(r'^get_word_detail/%s$' % regex_word, views.get_word_detail, name='get_word_detail'),
    url(r'^frequency_charts/?', views.frequency_charts, name='frequency'),
    url(r'^word_info/(?P<spelling>[\w\-]+)/', views.translate_word2, name='word_info'),
    url(r'^set_word_status/$', views.set_word_status, name='set_word_status'),
    url(r'^set_word_status/(?P<words>[\w\,\-]+)/(?P<status>[\w]+)/?', views.set_word_status, name='set_word_status'),
    url(r'^sleep', views.get_sleep, name='get_sleep'),
]

handler404 = 'wordRecall.views.handler404'

