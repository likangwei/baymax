__author__ = 'hanzhao'
# -*- coding=utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
SPLIT_STR_LIST = [' ', '\n', '.']
UNICODE_SPLIT_STR_LIST = []

for word in SPLIT_STR_LIST:
    UNICODE_SPLIT_STR_LIST.append(word.decode())


def get_split_words(lines, with_blank_space=True):
    if isinstance(lines, str):
        result = [lines]
    elif isinstance(lines, unicode):
        result = lines
    elif lines is None:
        return []
    else:
        raise Exception(lines)
    for split_word in SPLIT_STR_LIST:
        result = get_split_word(result, split_word)

    return result

def change_unicode_2_str(unicode_str):
    if isinstance(unicode_str, unicode):
        return unicode_str.encode()
    elif isinstance(unicode_str, str):
        return unicode_str
    else:
        raise Exception("a")

def get_split_word(lines, split_word):
    """
    分词   get_split_words(" a  b \n")　return [' ', 'a', ' ', ' ', 'b', ' ', '\n']
    :param lines:
    :param split_word:
    :return:
    """
    if isinstance(lines, str) or isinstance(lines, unicode):
        lines = [lines]
    result = []
    print lines
    for line in lines:
        from_idx = 0
        end_idx = 0
        while end_idx < len(line):
            find_idx = line.find(split_word, end_idx)
            if find_idx != -1:
                if from_idx < find_idx:
                    end_idx = find_idx
                    result.append(line[from_idx:end_idx])
                from_idx = find_idx
                end_idx = from_idx + len(split_word)
                result.append(line[from_idx:end_idx])
                from_idx = end_idx
            else:
                result.append(line[end_idx:len(line)])
                break

    return result

if __name__== '__main__':
    v = u'Django provides an abstraction layer (the “models”) for structuring and\nmanipulating the data of your Web application. Learn more about it below:'
    print get_split_words(v)