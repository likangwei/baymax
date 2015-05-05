__author__ = 'hanzhao'

import urllib
import lxml.html
from lxml.html.soupparser import fromstring
from util import md5util
import os
from lxml.html import HtmlElement

def change_url(pre_url):
    un_change_patterns = ['css', 'png', 'js', 'ico']
    for un_change_pattern in un_change_patterns:
        if pre_url.endswith(un_change_pattern):
            return pre_url
    params = urllib.urlencode({'tran_page': pre_url})
    return "http://127.0.0.1:8888/word/tran?%s" % params


def get_html_str(tran_page_url):
    url_md5 = md5util.get_md5_value(tran_page_url)
    html_tmp_file_name = "tmp/%s.html" %url_md5
    print os.path.abspath(html_tmp_file_name)

    if os.path.exists(html_tmp_file_name):
        return open(html_tmp_file_name).read()
    else:
        f = urllib.urlopen(tran_page_url)
        htmlStr = f.read()
        open(html_tmp_file_name, 'w').write(htmlStr)
        return htmlStr


def change_p(html):
    for p in html.xpath("//p"):
        if p.text:
            print lxml.html.tostring(p)
            uu = lxml.etree.SubElement(p, "u")
            uu.text = p.text
            p.insert(0, uu)
            print "===>", lxml.html.tostring(p)
            print p.getchildren()
            # p.text = "<u>%s</u>" %p.text


def get_translate_page(tran_page_url):
    htmlStr = get_html_str(tran_page_url)
    html = lxml.html.fromstring(htmlStr)
    html.rewrite_links(change_url, base_href=tran_page_url)
    change_p(html)
    return lxml.html.tostring(html)

