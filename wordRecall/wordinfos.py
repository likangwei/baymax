__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from models import WordRememberInfos
from models import Word
from util import StringUtil
from django.core.cache import cache
from util import TimeUtil
from models import RequestHistory
import UrlUtil

KEY = 'all_conversant_word_list'


def change_word_status(word_list, user, status):
    _change_word_remember_status(word_list, status, user, change_catch=True)


def _change_word_remember_status(word_list, remember_status, user, change_catch=False):
    """
    更改用户 单词的状    :param word_list:
    :param remember_status:
    :param user:
    :param change_catch:
    :return:
    """
    for word_spelling in word_list:
        word_spelling = StringUtil.change_unicode_2_str(word_spelling)
        word, created = Word.objects.get_or_create(spelling=word_spelling)
        recall_info, created = WordRememberInfos.objects.get_or_create(word=word, user=user)
        recall_info.remember = remember_status
        recall_info.word_spelling = word_spelling
        recall_info.save()
        conversant_word_list = get_all_conversant_word_list(user)
        if change_catch :
            print 'add 2 cache %s' %word_spelling
            if conversant_word_list.has_key(word_spelling):
                print 'has have %s' %word_spelling
            conversant_word_list[word_spelling] = None

        conversant_word_list['change'] = TimeUtil.get_now_time()
        print cache.get(KEY)['change']
        print conversant_word_list == cache.get(KEY)


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