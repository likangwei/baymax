# -*- coding: utf-8 -*-
__author__ = 'likangwei'
import urllib
import urlparse

print urlparse.urljoin("http://baidu.com/xxx/yyy?ddd=4", "abc")

url = u'/word_info/integers/?tran_page=https%3A%2F%2Fleetcode.com%2Fproblems%2Fcontains-duplicate%2F&ab=1'
usplit_result = urlparse.urlsplit(url)
query = usplit_result.query
# url = u'tran_page=https%3A%2F%2Fleetcode.com%2Fproblems%2Fcontains-duplicate%2F'
raw_query = urllib.unquote(query)
print raw_query

# for tmp in