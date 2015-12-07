# -*- coding: utf-8 -*-
__author__ = 'likangwei'
import os
doc_dir = r"D:\code\python\django\docs"


from path import Path
dd = Path(doc_dir)

import operator
result = {}
import re
p = re.compile(r'[a-zA-Z]+')
for txt_file in  dd.walk("*.txt"):
    for line in open(txt_file).readlines():
        for word in p.findall(line):
            word = word.lower()
            if operator.contains(result, word):
                result[word] = result[word] + 1
            else:
                result[word] = 1

# print result
sortList = sorted(result.items(), key=lambda d: d[1], reverse=True)
with open("result.txt", 'wb') as result_file:
    for str,count in sortList:
        if len(str) > 1:
            result_file.write('%s %s\n' %(str, count))