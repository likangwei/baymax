# -*- coding: utf-8 -*-
__author__ = 'likangwei'
#!/usr/bin/env python
# -*- coding: cp936 -*-
import hashlib
def get_md5_value(src):
    myMd5 = hashlib.md5()
    myMd5.update(src)
    myMd5_Digest = myMd5.hexdigest()
    return myMd5_Digest

def get_sha1_value(src):
    mySha1 = hashlib.sha1()
    mySha1.update(src)
    mySha1_Digest = mySha1.hexdigest()
    return mySha1_Digest

if __name__== '__main__':
    src = 'aaa'
    result_md5_value = get_md5_value(src)
    result_sha1_value = get_sha1_value(src)
    print 'source string: ', src
    print 'MD5: ', result_md5_value
    print 'SHA1: ', result_sha1_value