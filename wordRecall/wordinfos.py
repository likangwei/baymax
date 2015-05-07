__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from models import WordRememberInfos
from util import StringUtil

all_conversant_word_list = None
def get_all_conversant_word_list():
    """
    获取所有的熟单词
    """
    global all_conversant_word_list
    if all_conversant_word_list is not None:
        return all_conversant_word_list

    conversant_words = WordRememberInfos.objects.filter(remember=WordRememberInfos.CHOICE_REMEMBER_CONVERSANT)
    all_conversant_word_list = {}
    for word in conversant_words:
        all_conversant_word_list[word.word_spelling] = None

    for split_word in StringUtil.SPLIT_STR_LIST:
        all_conversant_word_list[split_word] = None
    return all_conversant_word_list
