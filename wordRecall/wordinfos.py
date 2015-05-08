__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from models import WordRememberInfos
from models import Word
from util import StringUtil
from django.core.cache import cache
all_conversant_word_list = None
from util import TimeUtil
KEY = 'all_conversant_word_list'


def change_word_status(word_list, user, status):
    _change_word_remember_status(word_list, status, user, change_catch=True)


def _change_word_remember_status(word_list, remember_status, user, change_catch=False):
    for word_spelling in word_list:
        word_spelling = StringUtil.change_unicode_2_str(word_spelling)
        word, created = Word.objects.get_or_create(spelling=word_spelling)
        recall_info, created = WordRememberInfos.objects.get_or_create(word=word, user=user)
        recall_info.remember = remember_status
        recall_info.save()
        conversant_word_list = get_all_conversant_word_list()
        if change_catch :
            print 'add 2 cache %s' %word_spelling
            if conversant_word_list.has_key(word_spelling):
                print 'has have %s' %word_spelling
            conversant_word_list[word_spelling] = None

        conversant_word_list['change'] = TimeUtil.get_now_time()
        set_cache(conversant_word_list)
        print cache.get(KEY)['change']
        print conversant_word_list == cache.get(KEY)


def set_cache(data):
    cache.set(KEY, data, 15 * 60)

def get_all_conversant_word_list(user=None):
    print 'get_all_conversant_word_list'
    """
    获取所有的熟单词
    """

    result = cache.get(KEY)
    if result is not None:
        result['change'] = TimeUtil.get_now_time()
        print result['change']
        return result

    print 'reload cache %s' %TimeUtil.get_now_time()
    conversant_words = WordRememberInfos.objects.filter(remember=WordRememberInfos.CHOICE_REMEMBER_CONVERSANT)
    all_conversant_word_list = {}
    for word in conversant_words:
        all_conversant_word_list[word.word_spelling] = None

    for split_word in StringUtil.SPLIT_STR_LIST:
        all_conversant_word_list[split_word] = None

    set_cache(all_conversant_word_list)
    return all_conversant_word_list
