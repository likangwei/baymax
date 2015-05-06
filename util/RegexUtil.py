__author__ = 'hanzhao'
# -*- coding=utf-8 -*-

import re

def is_word(text):
    patstr = r'^[a-zA-Z-]{2,50}$'
    return re.match(patstr, text)
if __name__== '__main__':
    print is_word("a")

