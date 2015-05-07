# -*- coding: utf-8 -*-
__author__ = 'likangwei'

import urllib
import models
def get_meaning_of_word(word):
    try:
        params = urllib.urlencode({'query': word, 'from': 'en', 'to': 'zh'})
        f = urllib.urlopen("http://apistore.baidu.com/microservice/dictionary?%s" % params)
        str = f.read()
        return str
    except:
        return ""

import operator
import json
def is_complex(word_spelling, wordJson):

    j = json.loads(wordJson)
    dict_result = j['retData']['dict_result']
    if dict_result:
        # ['symbols'][0]['parts'][0]['means'][0]
        return models.WORD_TYPE_COMMON
    else:
        return models.WORD_TYPE_INVALID


if __name__ == "__main__":
    word = "names"
    jsonx = get_meaning_of_word(word)
    print jsonx
    result = is_complex(word, jsonx)
    print result