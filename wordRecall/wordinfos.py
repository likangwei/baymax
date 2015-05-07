__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from models import WordRememberInfos
from models import Word
from util import StringUtil

all_conversant_word_list = None

def change_word_to_conversant(word_list, user=None):
    _change_word_remember_status(word_list,WordRememberInfos.CHOICE_REMEMBER_CONVERSANT)

def _change_word_remember_status(word_list, remember_status, change_catch=False, user=None):
    for word_spelling in word_list:
        word, created = Word.objects.get_or_create(spelling=word_spelling)
        recall_info, created = WordRememberInfos.objects.get_or_create(word=word)
        recall_info.remember = remember_status
        recall_info.save()
        if change_catch:
            all_conversant_word_list[word] = None



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
