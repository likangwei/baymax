__author__ = 'hanzhao'
# -*- coding: utf-8 -*-

from util import StringUtil
from loader import get_html_element

change_list = ["//p", "//h1", "//h2", "//li"]


def get_html_word_repeated_info(page_url):
    html_element = get_html_element(page_url)
    """
    获取网页的词频数据
    """
    result = {}
    for change_tag in change_list:
        for p in html_element.xpath(change_tag):
            __add_word_repeated_count(p.text, result)
            __add_word_repeated_count(p.tail, result)

    return result

def __add_word_repeated_count(text, result):
    if text:
        word_list = StringUtil.get_split_words(text, word_only=True, if_check_word=True)

        for word in word_list:
            if result.has_key(word):
                result[word] = result[word] + 1
            else:
                result[word] = 1

    return result