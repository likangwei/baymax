__author__ = 'hanzhao'
from django.core.urlresolvers import reverse


def get_tran_url(raw_url):
    return '%s?%s' %(reverse('word:go'), 'tran_page=%s' %raw_url)