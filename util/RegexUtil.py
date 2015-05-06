__author__ = 'hanzhao'
# -*- coding=utf-8 -*-

import re

def is_word(text):
    patstr = '^[a-zA-Z]+$'
    return re.match(patstr, text)
if __name__== '__main__':
    print is_word("Hehe")

