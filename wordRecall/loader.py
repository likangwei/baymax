__author__ = 'hanzhao'
import urllib
import lxml
import lxml.html
from util import md5util
import os
import urllib2
from urlparse import urlsplit


def get_html_str(tran_page_url):
    if not tran_page_url:
        return ''
    url_md5 = md5util.get_md5_value(tran_page_url)
    html_tmp_file_name = "tmp/%s.html" %url_md5
    print os.path.abspath(html_tmp_file_name)

    if os.path.exists(html_tmp_file_name):
        return open(html_tmp_file_name).read()
    else:
        uss = urlsplit(tran_page_url)
        refer = '%s://%s' %(uss.scheme, uss.netloc)
        req = urllib2.Request(tran_page_url)
        req.add_header('Referer', refer)
        try:
            r = urllib2.urlopen(req)
            html_str = r.read()
            open(html_tmp_file_name, 'w').write(html_str)
            return html_str
        except:
            print 'load url error ===>%s' % tran_page_url
            return "Load url %s error." %tran_page_url



def get_html_element(tran_page_url):
    html_str = get_html_str(tran_page_url)
    html_element = lxml.html.fromstring(html_str)
    return html_element


if __name__ == '__main__':

    import urllib2
    req = urllib2.Request('https://docs.djangoproject.com/en/1.8/topics/db/models/')
    req.add_header('Referer', 'https://docs.djangoproject.com')
    r = urllib2.urlopen(req)
    print r.read()