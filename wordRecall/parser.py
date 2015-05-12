__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from util import StringUtil
from loader import get_html_element
import translate


def get_html_word_repeated_info(page_url, hidden_word_list=[]):
    """
    获取网页的词频数据
    """
    html_element = get_html_element(page_url)
    body_element = html_element.xpath('/html/body')
    all_element = []
    all_element.extend(body_element)
    result = {}

    while all_element:
        p = all_element[0]
        __add_word_repeated_count(p.text, result)
        __add_word_repeated_count(p.tail, result)
        del all_element[0]
        all_element.extend(p.getchildren())


    for hidden_word in hidden_word_list:
        if result.has_key(hidden_word):
            del result[hidden_word]
    return result

def __add_word_repeated_count(text, result):
    if text:
        word_list = StringUtil.get_split_words(text, word_only=True, lower=True)

        for word in word_list:
            if result.has_key(word):
                result[word] = result[word] + 1
            else:
                result[word] = 1

    return result