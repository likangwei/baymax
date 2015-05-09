from django.conf.urls import patterns, include, url
from django.contrib import admin


admin.autodiscover()

urlpatterns = [
    url(r'^$', include('wordRecall.urls', namespace='word')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^baymax', include('baymax.urls', namespace='baymax')),

]
