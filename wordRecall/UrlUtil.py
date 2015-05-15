__author__ = 'hanzhao'
#-*- coding=utf-8 -*-
from django.core.urlresolvers import reverse
from urllib import urlencode
import operator
def get_tran_url(raw_url):
    """

    :param raw_url:
    :return:翻译的链接
    """

    if operator.contains(raw_url, "#"):
        idx = raw_url.index("#")
        end_tag = raw_url[idx:]
        raw_url = raw_url[:idx]
        return _get_url('word:go', tran_page=raw_url) + end_tag
    else:
        return _get_url('word:go', tran_page=raw_url)



def get_frequency_url(**kwargs):
    """
    :return: 过滤掉我的熟词的词频链接
    """
    return _get_url('word:frequency',**kwargs)


def _get_url(reverse_str, **kwargs):

    if kwargs:
        params = urlencode(kwargs)
        return '%s?%s' %(reverse(reverse_str), params)
    else:
        return '%s' %(reverse(reverse_str))