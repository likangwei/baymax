__author__ = 'hanzhao'

tag_soup = '<meta><head><title>Hello</head><body onload=crash()>Hi all<p>'
import urllib
from lxml.html.soupparser import fromstring
from lxml import etree
if __name__ == "__main__":
    f = urllib.urlopen("http://127.0.0.1:8888/word/tran?tran_page=https%3A%2F%2Fdocs.djangoproject.com%2Fhowto%2Fdeployment%2Ffastcgi%2F")
    html = f.read()
    root = fromstring(html)
    page = etree.HTML(html.lower().decode('utf-8'))
    hrefs = page.xpath(u"//script")
    hrefs = page.xpath(u"//a")
    base_url = ""
    for href in hrefs:
        print href.attrib
        if href.attrib.has_key('data-main'):
            href.attrib['data-main'] = base_url + href.attrib['data-main']
