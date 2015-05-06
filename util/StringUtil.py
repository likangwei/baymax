__author__ = 'hanzhao'
# -*- coding=utf-8 -*-

SPLIT_STR_LIST = [' ', '\n', '.']

def get_split_words(lines, with_blank_space=True):
    if isinstance(lines, str):
        result = [lines]
    else:
        result = lines

    for split_word in SPLIT_STR_LIST:
        result = get_split_word(result, split_word)

    return result

def get_split_word(lines, split_word):
    """
    分词   get_split_words(" a  b \n")　return [' ', 'a', ' ', ' ', 'b', ' ', '\n']
    :param lines:
    :param split_word:
    :return:
    """
    if isinstance(lines, str):
        lines = [lines]
    result = []
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

print get_split_words(" a  b \n")