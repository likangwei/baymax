__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from models import WordRememberInfos
from models import Word
from util import StringUtil
from django.core.cache import cache
from util import TimeUtil
from models import RequestHistory
import UrlUtil
import urllib
import json
KEY = 'all_conversant_word_list'


def change_word_status(word_id_list, user, status):
    _change_word_remember_status(word_id_list, status, user, change_catch=True)


def _change_word_remember_status(word_id_list, remember_status, user, change_catch=False):
    """
    更改用户 单词的状    :param word_list:
    :param remember_status:
    :param user:
    :param change_catch:
    :return:
    """
    for word_id in word_id_list:
        word, created = Word.objects.get_or_create(pk=word_id)
        recall_info, created = WordRememberInfos.objects.get_or_create(word=word, user=user)
        recall_info.remember = remember_status
        recall_info.word_spelling = word.spelling
        recall_info.save()
        if change_catch :
            pass



def get_all_conversant_word_list(user):
    """
    获取所有的熟单词
    """
    print 'reload cache %s' %TimeUtil.get_now_time()
    conversant_words = WordRememberInfos.objects.filter(user=user, remember=WordRememberInfos.CHOICE_REMEMBER_CONVERSANT)
    all_conversant_word_list = {}
    for info in conversant_words:
        word_spelling = info.word.spelling
        all_conversant_word_list[word_spelling] = None

    for split_word in StringUtil.SPLIT_STR_LIST:
        all_conversant_word_list[split_word] = None

    # set_cache(all_conversant_word_list)
    return all_conversant_word_list


def get_all_request_url_history_url(user):
    """
    获取此用户的访问历史记录
    :return: 返回一个列表  [(tie, raw_url, tran_url, request_number),(),...]
    """
    request_url_list = RequestHistory.objects.filter(user=user).order_by('-request_number')
    result = []
    for request_url in request_url_list:
        raw_url = request_url.url_info
        tran_url = UrlUtil.get_tran_url(raw_url)
        title = request_url.url.title
        request_number = request_url.request_number
        result.append((title, raw_url, tran_url, request_number))

    return result

def get_word_id_list_from_spelling(word_list):
    """
    根据单词的拼写，返回其Word.id
    :param word_list:
    :return:
    """
    return Word.objects.filter(spelling__in=word_list).values_list('id', flat=True)

def get_all_word_sort_by_repeated(request, filter_mine=False, include_word_list=[], exclude_word_list=[],order_by=None):
    """
    返回词频排行榜
    ::param filter_mine 是否过滤掉当前用户的所有熟单词
    ::param include_word_list 包含在这些单词里面的所有单词
    ::param filter_word_list 需要过滤掉的所有单词
    :return:
    """
    if order_by is None:
        order_by = '-repeated'
    if include_word_list:
        include_word_id_list = get_word_id_list_from_spelling(include_word_list)

    if filter_mine:
        exclude_word_id_list = WordRememberInfos.objects.filter(user=request.user).values_list('word_id', flat=True)

        if include_word_list:
            word_queryset = Word.objects.filter(id__in=include_word_id_list).exclude(id__in=exclude_word_id_list).order_by(order_by)
        else:
            word_queryset = Word.objects.exclude(id__in=exclude_word_id_list).order_by(order_by)
    else:
        word_queryset = Word.objects.all().order_by(order_by)
    return word_queryset


def get_format_meaning(word_spelling):
    word, created = Word.objects.get_or_create(spelling=word_spelling)
    if not word.meaning:
        word.meaning = get_meaning_of_word(word_spelling)
        word.save()
    jo = json.loads(word.meaning)
    try:
        pts_meaning = jo.get('retData').get('dict_result').get('symbols')[0].get('parts')
        result = ''
        for pt in pts_meaning:
            part = pt.get('part')
            means = pt.get('means')
            result = result + part + '\n'
            for mean in means:
                result = result + ' ' * 3 + mean + '\n'
        return result
    except:
        return 'error'

def get_meaning_of_word(word_spelling):
    try:
        params = urllib.urlencode({'query': word_spelling, 'from': 'en', 'to': 'zh'})
        f = urllib.urlopen("http://apistore.baidu.com/microservice/dictionary?%s" % params)
        str = f.read()
        return str
    except:
        return ""

if __name__ == '__main__':
    get_format_meaning('word')