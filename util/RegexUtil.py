__author__ = 'hanzhao'
# -*- coding=utf-8 -*-

import re

def is_word(text):
    patstr = r'^[a-zA-Z-]{2,50}$'
    return re.match(patstr, text)


def is_email(text):
    #todo
    return False


def is_url(text):
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return regex.match(text)


if __name__== '__main__':
    print is_word("a")
    print is_url("http://baidu.com")

