
#-*- coding=utf-8 -*-
from django.core.urlresolvers import reverse
from urllib import urlencode
import operator
import urllib

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
    return _get_url('word:frequency', **kwargs)


def get_tran_page_url(raw_url):

    if operator.contains(raw_url, "#"):
        idx = raw_url.index("#")
        end_tag = raw_url[idx:]
        raw_url = raw_url[:idx]
        return _get_url('word:translate_p', tran_page=raw_url) + end_tag
    else:
        return _get_url('word:translate_p', tran_page=raw_url)


def _get_url(reverse_str, **kwargs):

    if kwargs:
        params = urlencode(kwargs)
        return '%s?%s' %(reverse(reverse_str), params)
    else:
        return '%s' %(reverse(reverse_str))


def get_full_path_and_change_request_param(request, change_data):
    """
    更改链接参数
    """
    for get_param in request.GET:
        if get_param not in change_data:
            change_data[get_param] = request.GET.get(get_param)
    params = urllib.urlencode(change_data)
    return "%s?%s" % (request.path, params)

