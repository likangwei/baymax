from django.conf.urls import patterns, include, url
from django.contrib import admin


admin.autodiscover()

urlpatterns = [

    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('baymax.urls', namespace='baymax')),
    url(r'^word/', include('wordRecall.urls', namespace='word')),
]
