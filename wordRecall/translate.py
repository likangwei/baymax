__author__ = 'hanzhao'

import urllib
import lxml.html
from lxml.html.soupparser import fromstring
from lxml import etree

def change_url(pre_url):
    print pre_url
    params = urllib.urlencode({'tran_page': pre_url})
    return "http://127.0.0.1:8888/word/tran?%s" % params

def get_translate_page(tran_page_url):
    f = urllib.urlopen(tran_page_url)
    htmlStr = f.read()
    html = lxml.html.fromstring(htmlStr)

    # tran_page_url = "http://127.0.0.1:8888"
    html.make_links_absolute(tran_page_url)
    html.rewrite_links(change_url)
    # page = etree.HTML(htmlStr.lower().decode('utf-8'))
    # hrefs = page.xpath(u"//a")
    #
    # for href in hrefs:
    #     print href.attrib
    #     old_href = href.attrib['href']

        # if not old_href.startswith("http"):
        #     print "before", old_href
        #     old_href = tran_page_url + old_href
        #     print "after", old_href
        # href.attrib['href'] = old_href
    # return html
    return lxml.html.tostring(html)

