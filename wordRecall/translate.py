
# -*- coding: utf-8 -*-
import urllib
import lxml.html
from util import md5util, StringUtil
from lxml.html import HtmlElement
from django.core.urlresolvers import reverse
import urlparse
from loader import get_html_str
from wordinfos import get_all_conversant_word_list, get_format_meaning
import UrlUtil
from django.template import loader


from tasks import add_all_page_word_to_repeated
from static import change_list

def change_url(pre_url):
    un_change_patterns = ['css', 'png', 'js', 'ico', 'tgz', 'zip', 'rar', 'pdf', 'gif', 'git']
    for un_change_pattern in un_change_patterns:
        if pre_url.endswith(un_change_pattern):
            return pre_url
    return UrlUtil.get_tran_page_url(pre_url)


from util import RegexUtil


def get_translate_word_url(spelling, translate_url):
    """
    获取翻译单词的网页网址
    """

    params = urllib.urlencode({'tran_page': translate_url})
    return "%s%s" %(reverse("word:word_info", args=(spelling,)), "?%s" % (params))


def add_to_word_repeated(html_url):
    """
    添加到词频
    :param request:
    :param word_lower_case:
    :return:
    """
    from tasks import add_all_page_word_to_repeated
    add_all_page_word_to_repeated.delay(html_url)
    # word_repeated_map = get_html_word_repeated_info(html_url)
    # add_all_page_word_to_repeated.delay(word_repeated_map)
    #
    # for word_spelling in word_repeated_map:
    #     word, created = Word.objects.get_or_create(spelling=word_spelling)
    #     word.add_repeated(word_repeated_map[word_spelling])


def get_sub_element_by_text(p_text, parent, translate_url, conversant_word_map, user=None):
    """
    进行 英文字符处理
    """
    result = []

    return_p_text = ''
    cur_u = None

    has_add_p_text = False

    for word in StringUtil.get_split_words(p_text):
            word_lower_case = word.lower()
            if_is_word = RegexUtil.is_word(word)

            if if_is_word:
                #添加到词频记录
                if not conversant_word_map.has_key(word_lower_case):
                    #没有在熟词列表内
                    result.append(return_p_text)
                    return_p_text = ''
                    has_add_p_text = True

                    cur_u = lxml.etree.SubElement(parent, "a")
                    jump_link = get_translate_word_url(word_lower_case, translate_url)
                    # cur_u.attrib['href'] = jump_link
                    # style="color:#DD4C53"

                    # cur_u.attrib['target'] = r"_blank"
                    # title_list = get_format_meaning(word_lower_case)

                    cur_u.attrib['class'] = 'recall_word'
                    cur_u.attrib['value'] = word_lower_case

                    # if not title_list:
                        # cur_u.attrib['style'] = r"color:#DD4CA0"
                        # cur_u.attrib['translate'] = u"未找到对应的翻译"
                    # else:
                        # cur_u.attrib['style'] = r"color:#FF0000"
                        # cur_u.attrib['translate'] = title_list

                    onclick = "return popitup2('%s')" %jump_link
                    # cur_u.attrib['onclick'] = onclick
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

def get_sub_element(current_tag, parent, translate_url, conversant_word_map, **kwargs):
    """
    获取block tag的所有子集
    """
    get_text = True
    get_children = True
    get_tail = True

    result = []
    raw_children = current_tag.getchildren()
    if get_text:
        current_tag_text = current_tag.text
        current_tag.text = None
        result.extend(get_sub_element_by_text(current_tag_text, parent, translate_url, conversant_word_map, **kwargs))

    if get_children:
        for children in raw_children:
            children_subs = get_sub_element_by_text(children.tail, parent, translate_url, conversant_word_map, **kwargs)
            children.tail = None
            result.append(children)
            result.extend(children_subs)

    if get_tail:
        current_tag_tail = current_tag.tail
        current_tag.tail = None
        result.extend(get_sub_element_by_text(current_tag_tail, parent, translate_url, conversant_word_map, **kwargs))
    return result


def modify_bolock_p(p, translate_url, conversant_word_map, **kwargs):
    """
    变更<ｐ>标签的具体实现
    """
    # print lxml.html.tostring(p)
    # if not p.text.startswith('is a Python package that parses broken HTML, just like lxm'):
    #     return
    sub_element_list = get_sub_element(p, p, translate_url, conversant_word_map, **kwargs)
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
        elif isinstance(sub_element, lxml.html.HtmlComment):
            pass
        else:
            print sub_element, type(sub_element)
            raise Exception("aa", "bb")

    # print '-' * 40
    # print lxml.html.tostring(p)


def add_script_to_html_element(html_element):
    """
    添加弹出界面的Script
    :param html_element:
    :return:
    """
    script_html = """<script language="javascript" type="text/javascript">
    <!--
        function popitup(url) {
            newwindow=window.open(url,'name','height=700,width=500');
            if (window.focus) {newwindow.focus()}
            return false;
        }
        function popitup2(url) {
            newwindow=window.open(url,'name','height=700,width=500');
            return false;
        }

    // -->
    </script>"""
    script_element = lxml.html.fromstring(script_html)
    html_element.append(script_element)



def change_all_element(html, user, translate_url, **kwargs):
    """
    变更所有的<ｐ>标签
    """

    add_script_to_html_element(html)
    conversant_word_map = get_all_conversant_word_list(user)
    # add_to_word_repeated(translate_url)
    for change_tag in change_list:
        for p in html.xpath(change_tag):
            modify_bolock_p(p, translate_url, conversant_word_map, user=user)


def change_script_data_main_url(html, tran_page_url):

    scripts = html.xpath(u"//script")
    for script in scripts:
        if script.attrib.has_key('data-main'):
            script.attrib['data-main'] = urlparse.urljoin(tran_page_url, script.attrib['data-main'])

from models import RequestUrl, RequestHistory
from util import lxmlUtil

def add_to_request_history(html_element, tran_page_url, user):
    """
    添加到网页访问历史记录
    :param tran_page_url:
    :param user:
    :return:
    """
    request_url, created = RequestUrl.objects.get_or_create(url=tran_page_url)
    if not request_url.title:
        request_url.title = lxmlUtil.get_title(html_element)
        request_url.save()

    request_history, created = RequestHistory.objects.get_or_create(url=request_url, url_info=tran_page_url, user=user)
    request_history.request_number = request_history.request_number + 1
    request_history.save()

def add_css_js(html):

    head_sub_elements = [
        #css
        r'<link rel="stylesheet" href="/static/css/word-recall.css" type="text/css">',
        r'<link rel="stylesheet" href="/static/css/popbox.css" type="text/css" media="screen" charset="utf-8">',
        #js
        r'<script type="text/javascript" src="/static/js/jquery.min.js"></script>',
    ]


    body_sub_elements = [
        #js
        r'<script type="text/javascript" src="/static/js/recall-word.js"></script>',
        #html
        loader.render_to_string('recall/box.html'),
    ]


    add_elements_map = {'body': body_sub_elements, 'head': head_sub_elements}
    for add_tag in add_elements_map:
        element = html.find(add_tag)
        if element:
            for raw_html in add_elements_map[add_tag]:
                element.append(lxml.html.fromstring(raw_html))



def get_translate_page(tran_page_url, user):
    htmlStr = get_html_str(tran_page_url)
    html = lxml.html.fromstring(htmlStr)

    #重写链接
    html.rewrite_links(change_url, base_href=tran_page_url)

    add_to_request_history(html, tran_page_url, user)
    change_script_data_main_url(html, tran_page_url)
    #变更所有标签
    change_all_element(html, user, tran_page_url)

    #添加 css
    add_css_js(html)
    return lxml.html.tostring(html)


def get_translate_from_raw_str(request, tran_src):
    p = lxml.html.fromstring('<p>%s</p>' %tran_src)
    user = request.user
    translate_url = ''
    conversant_word_map = get_all_conversant_word_list(user)
    modify_bolock_p(p, translate_url, conversant_word_map, user=user)
    return lxml.html.tostring(p)