__author__ = 'hanzhao'
# -*- coding: utf-8 -*-
import urllib
import lxml.html
from lxml.html.soupparser import fromstring
from util import md5util, StringUtil
import os
from lxml.html import HtmlElement
from models import WordRememberInfos
import urlparse
from healthPriceless.settings import HOST

def change_url(pre_url):
    un_change_patterns = ['css', 'png', 'js', 'ico']

    for un_change_pattern in un_change_patterns:
        if pre_url.endswith(un_change_pattern):
            return pre_url

    params = urllib.urlencode({'tran_page': pre_url})

    return "%sword/tran?%s" % (HOST, params)


def get_html_str(tran_page_url):
    url_md5 = md5util.get_md5_value(tran_page_url)
    html_tmp_file_name = "tmp/%s.html" %url_md5
    print os.path.abspath(html_tmp_file_name)

    if os.path.exists(html_tmp_file_name):
        return open(html_tmp_file_name).read()
    else:
        f = urllib.urlopen(tran_page_url)
        htmlStr = f.read()
        if f.getcode() == 200:
            open(html_tmp_file_name, 'w').write(htmlStr)
        return htmlStr

from util import RegexUtil


def get_translate_word_url(word_lower_case):
    return "%sword/word_translate?word=%s" %(HOST, word_lower_case)


def get_sub_element_by_text(p_text, parent):
    """
    进行 英文字符处理
    """
    result = []
    conversant_word_map = get_all_conversant_word_list()
    return_p_text = ''
    cur_u = None

    has_add_p_text = False
    for word in StringUtil.get_split_words(p_text):
            word_lower_case = word.lower()
            if_is_word = RegexUtil.is_word(word)

            if if_is_word:
                if not conversant_word_map.has_key(word_lower_case):
                    #没有在熟词列表内
                    result.append(return_p_text)
                    return_p_text = ''
                    has_add_p_text = True

                    cur_u = lxml.etree.SubElement(parent, "a")
                    cur_u.attrib['href'] = get_translate_word_url(word_lower_case)
                    # style="color:#DD4C53"
                    cur_u.attrib['style'] = r"color:#DD4CA0"
                    cur_u.attrib['target'] = r"_blank"
                    cur_u.text = word
                    cur_u.tail = ''
                    result.append(cur_u)
                else:
                    return_p_text = return_p_text + word
                    has_add_p_text = False
            else:
                return_p_text = return_p_text + word
                has_add_p_text = False

    if not has_add_p_text:
        result.append(return_p_text)

    return result

def get_sub_element(current_tag, parent, get_text=True, get_children=True, get_tail=True):
    """
    获取block tag的所有子集
    """
    result = []
    raw_children = current_tag.getchildren()
    if get_text:
        current_tag_text = current_tag.text
        current_tag.text = None
        result.extend(get_sub_element_by_text(current_tag_text, parent))

    if get_children:
        for children in raw_children:
            children_subs = get_sub_element_by_text(children.tail, parent)
            children.tail = None
            result.append(children)
            result.extend(children_subs)

    if get_tail:
        current_tag_tail = current_tag.tail
        current_tag.tail = None
        result.extend(get_sub_element_by_text(current_tag_tail, parent))


    return result


def modify_bolock_p(p):
    """
    变更<ｐ>标签的具体实现
    """
    # print lxml.html.tostring(p)
    # if not p.text.startswith('Django provides an abstraction'):
    #     return
    sub_element_list = get_sub_element(p, p)
    p._children = []
    p.text = p.tail = None
    # p.clear()
    cur_sub_element = None

    for idx, sub_element in enumerate(sub_element_list):
        # print idx, lxml.html.tostring(p)
        if isinstance(sub_element, str) or isinstance(sub_element, unicode):
            if p.text is None:
                p.text = sub_element

            elif cur_sub_element is not None:
                cur_sub_element.tail = sub_element
                cur_sub_element = None

            elif p.tail is None:
                p.tail = sub_element
        elif isinstance(sub_element, lxml.html.HtmlElement):
            cur_sub_element = sub_element
            try:
                p.append(sub_element)
            except Exception, e:
                print e
        else:
            print sub_element
            raise Exception("aa", "bb")

    # print '-' * 40
    # print lxml.html.tostring(p)


all_conversant_word_list = None

def get_all_conversant_word_list():
    """
    获取所有的熟单词
    """
    global all_conversant_word_list
    if all_conversant_word_list is not None:
        return all_conversant_word_list

    conversant_words = WordRememberInfos.objects.filter(remember=WordRememberInfos.CHOICE_REMEMBER_CONVERSANT)
    all_conversant_word_list = {}
    for word in conversant_words:
        all_conversant_word_list[word.word_spelling] = None

    for split_word in StringUtil.SPLIT_STR_LIST:
        all_conversant_word_list[split_word] = None
    return all_conversant_word_list


def change_p(html):
    """
    变更所有的<ｐ>标签
    """
    change_list = ["//p", "//h1", "//h2", "//li"]
    for change_tag in change_list:
        for p in html.xpath(change_tag):
            if p.text:
                # print lxml.html.tostring(p)
                modify_bolock_p(p)

def change_script_data_main_url(html, tran_page_url):
    scripts = html.xpath(u"//script")
    for script in scripts:
        if script.attrib.has_key('data-main'):
            script.attrib['data-main'] = urlparse.urljoin(tran_page_url, script.attrib['data-main'])

def get_translate_page(tran_page_url):
    htmlStr = get_html_str(tran_page_url)
    html = lxml.html.fromstring(htmlStr)
    html.rewrite_links(change_url, base_href=tran_page_url)
    change_script_data_main_url(html, tran_page_url)
    change_p(html)
    return lxml.html.tostring(html)

