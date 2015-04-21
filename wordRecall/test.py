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

print get_meaning_of_word("name")