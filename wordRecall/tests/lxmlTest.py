__author__ = 'hanzhao'

tag_soup = '<meta><head><title>Hello</head><body onload=crash()>Hi all<p>'
import urllib
from lxml.html.soupparser import fromstring
from lxml import etree
if __name__ == "__main__":
    f = urllib.urlopen("http://passport.cnblogs.com/user/signin?ReturnUrl=http://m.cnblogs.com")
    html = f.read()
    root = fromstring(html)
    from lxml.etree import tostring
    # print(tostring(root, pretty_print=True).strip())
    page = etree.HTML(html.lower().decode('utf-8'))

    hrefs = page.xpath(u"//a")

    for href in hrefs:
        print href.attrib
        href.attrib['href'] = '/baiduxxx'

    print etree.tostring(page)