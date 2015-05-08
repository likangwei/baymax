__author__ = 'hanzhao'
# -*- coding=utf-8 -*-
import sys
reload(sys)
import re

from RegexUtil import is_word
sys.setdefaultencoding('utf-8')
SPLIT_STR_LIST = [' ',
                  '\n',
                  '.',
                  '?',
                  '!',
                  ':',
                  ','
    ]
UNICODE_SPLIT_STR_LIST = []

for word in SPLIT_STR_LIST:
    UNICODE_SPLIT_STR_LIST.append(word.decode())

def get_split_words(lines, word_only=False, lower=False):
    all_words = get_split_word_with_blank(lines)

    result = []
    for word in all_words:
        if lower:
            word = word.lower()

        if word_only:
            if is_word(word):
                result.append(word)
        else:
            result.append(word)

    return result
    # if isinstance(lines, str):
    #     result = [lines]
    # elif isinstance(lines, unicode):
    #     result = lines
    # elif lines is None:
    #     return []
    # else:
    #     raise Exception(lines)
    # for split_word in SPLIT_STR_LIST:
    #     result = get_split_word(result, split_word, word_only=word_only, if_check_word=if_check_word, lower=lower)

    # return result

def get_split_word_with_blank(line):
    if line is None:
        return []
    try:
        result = re.split('(\W+)', line)
        return result
    except Exception,e:
        print line
        print e

def change_unicode_2_str(unicode_str):
    if isinstance(unicode_str, unicode):
        return unicode_str.encode()
    elif isinstance(unicode_str, str):
        return unicode_str
    else:
        raise Exception("a")

def get_split_word(lines, split_word, word_only=False, if_check_word=False, lower=False):
    """
    分词   get_split_words(" a  b \n")　return [' ', 'a', ' ', ' ', 'b', ' ', '\n']
    :param lines:
    :param split_word:
    :return:
    """
    if isinstance(lines, str) or isinstance(lines, unicode):
        lines = [lines]
    result = []
    # print lines
    for line in lines:
        from_idx = 0
        end_idx = 0
        while end_idx < len(line):
            find_idx = line.find(split_word, end_idx)
            if find_idx != -1:
                if from_idx < find_idx:
                    end_idx = find_idx
                    unchecked_word = line[from_idx:end_idx]
                    if lower:
                        unchecked_word = unchecked_word.lower()
                    if if_check_word:
                        if is_word(unchecked_word):
                            result.append(unchecked_word)
                    else:
                        result.append(unchecked_word)
                from_idx = find_idx
                end_idx = from_idx + len(split_word)
                if not word_only:
                    result.append(line[from_idx:end_idx])
                from_idx = end_idx
            else:
                result.append(line[end_idx:len(line)])
                break

    return result

if __name__== '__main__':
    v = u' perspective, than your standard'
    print get_split_words(v, word_only=True)