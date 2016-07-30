# -*- coding: utf-8 -*-
__author__ = 'likang'
from django.contrib import admin
import views
from django.conf.urls import url, include
from rest_framework import routers
from restview import IgnoreUrlViewSet
from restview import MyWordViewSet
from restview import UserViewSet
from restview import WordViewSet
from rest_framework import urls
from django.views.decorators.csrf import csrf_exempt
# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'settings', IgnoreUrlViewSet)
router.register(r'users', UserViewSet)
router.register(r'words', WordViewSet)
router.register(r'mywords', MyWordViewSet)
regex_word = '(?P<words>[\w]+)'
admin.autodiscover()
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^rest/', include(router.urls), name='rest'),
    url(r'^$', views.index, name='index'),
    url(r'^contact/?', views.contact, name='contact'),
    url(r'^settings/?', views.settings, name='settings'),
    url(r'^mywords/?', views.mywords, name='mywords'),
    url(r'^urls/?', views.myurls, name='mywords'),
    url(r'^download/?', views.download, name='download'),
    url(r'^about/?', views.about, name='about'),
    url(r'^get-start/?', views.get_start, name='start'),
    url(r'^reg/?', views.reg, name='reg'),
    url(r'^login/?', views.login, name='login'),
    url(r'^template/?', views.template, name='template'),
    url(r'^pop_login/?', views.pop_login, name='pop_login'),
    url(r'^logout/?', views._logout, name='logout'),
]

handler404 = 'wordRecall.views.handler404'

