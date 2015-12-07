# -*- coding: utf-8 -*-
__author__ = 'likangwei'

import urllib

def get_meaning_of_word(word):
    try:
        params = urllib.urlencode({'query': word, 'from': 'en', 'to': 'zh'})
        f = urllib.urlopen("http://apistore.baidu.com/microservice/dictionary?%s" % params)
        str = f.read()
        return str
    except:
        return ""


def get_format_meaning(word_spelling):
    word_translate_str = get_meaning_of_word(word_spelling)
    jo = json.loads(word_translate_str)
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
    print get_format_meaning('word')