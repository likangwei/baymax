# -*- coding: utf-8 -*-
import json

from django.forms import ModelForm

from django.core.urlresolvers import reverse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.auth import login as lg
from django.contrib.auth import authenticate
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from django.http import HttpResponseRedirect
from django.http import HttpResponse

from django import forms

from django.shortcuts import render
from django.shortcuts import render_to_response

from django.template import RequestContext
import calendar

from parser import get_html_word_repeated_info_cleaned
from wordinfos import get_all_changed_words
from wordinfos import change_word_status
from models import Word, WordRememberInfos
from translate import get_translate_from_raw_str

import wordinfos
import models
import translate
import UrlUtil
from UrlUtil import get_tran_url
from util import RegexUtil
from django.utils import timezone


class TransPageForm(forms.Form):
    tran_page = forms.CharField(label='请输入网址', max_length=100)

    def clean(self):

        cleaned_data = self.cleaned_data
        tran_page = cleaned_data['tran_page']
        if not RegexUtil.is_url(tran_page):
            self.add_error('tran_page', '请输入有效的网址')


class RecallWordForm(ModelForm):
    class Meta:
        model = WordRememberInfos
        fields = ['word_spelling', 'weight', 'remember', 'recall_counts', 'repeated', 'remarks']
        # fields = '__all__'
        widgets = {
            "remember": forms.RadioSelect()
        }


class LoginForm(forms.Form):
    username = forms.CharField(label='用户名：', max_length=100)
    password = forms.CharField(label='密码：', max_length=100, widget=forms.PasswordInput())


class RegForm(forms.Form):
    username = forms.CharField(label='用户名：', max_length=100, required=True)
    email = forms.CharField(label='邮箱：', max_length=100)
    password1 = forms.CharField(label='密码：', max_length=100, widget=forms.PasswordInput())

    def clean(self):
        cleaned_data = super(forms.Form, self).clean()
        username = cleaned_data.get('username', None)
        password = cleaned_data.get('password1', None)

        if User.objects.filter(username=username).count() != 0:
            self.add_error('username', '用户已存在')

        if username is None:
            self.add_error('username', '用户不能为空')

        if password is None:
            self.add_error('password1', '密码不能为空')

        return cleaned_data


class TranslateForm(forms.Form):
    gt_src = forms.CharField(label='', widget=forms.Textarea)


def reg(request):
    """
    注册
    """
    if request.method == "POST":
        form = RegForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            email = form.cleaned_data['email']
            user = User.objects.create_user(username, email=email, password=password)
            user = authenticate(username=username, password=password)
            lg(request, user)
            return __redirect("word:index", if_reverse=True)

    else:
        form = RegForm()
    return render(request, 'recall/reg.html', {"form": form})

def get_sleep(request):
    import time
    time.sleep(10)
    return HttpResponse("hello sleep")

def login(request):
    """
    登陆
    """
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            _next = request.GET.get('next', default='/')
            user = authenticate(username=username, password=password)
            if user is not None and user.is_active:
                lg(request, user)
                return __redirect(_next)
            else:
                form.add_error('password', '用户名或密码不正确！')
    else:
        form = LoginForm()
    return render(request, 'recall/login.html', {"form": form, "action": request.get_full_path()})


@login_required
def _logout(request):
    """
    注销
    """
    logout(request)
    return __redirect('word:login', if_reverse=True)


@login_required
def get_recall_word(request):
    return _get_words(request, models.REMEMBER_UNKNOW)


def check_user(request):
    """检查用户
    :param request:
    :return:
    """
    user = get_user(request);

    if user is None:
        result = "fail"
    else:
        result = "ok"

    result = json.dumps({"result": result})
    response = HttpResponse(json.dumps(result), 'application/json')
    response['Access-Control-Allow-Origin'] = "*"
    return response



def get_words(request, status=None):
    """
    获取所有熟单词，以逗号分隔
    """
    user = get_user(request)
    last_get_time = request.GET.get("last_get_timetamp", None)
    if last_get_time:
        import datetime
        import pytz
        last_get_time = datetime.datetime.fromtimestamp(float(last_get_time), tz=pytz.utc)
    if user is None:
        result = json.dumps({"status": "fail", "result": "userName or pwd invalid"})
        response = HttpResponse(json.dumps(result), 'application/json')
    else:
        now = timezone.now()
        now_tstamp = calendar.timegm(now.timetuple())
        now_tstamp = "%s.%d" % (now_tstamp, now.microsecond)
        old_word_list = get_all_changed_words(user, last_get_time, now)
        result = []
        for word in old_word_list:
            cur_data = word.to_dict()
            result.append(cur_data)
        result = json.dumps({"status": "ok", "timestamp": now_tstamp, "result": result})
        response = HttpResponse(json.dumps(result), 'application/json')

    response['Access-Control-Allow-Origin'] = "*"
    return response

from django.views.decorators.csrf import csrf_exempt

def get_google_meanings(words):
    """获取google 翻译"""
    words = list(words)
    import requests
    while words:
        cur_words = []
        while words and sum([len(word.spelling) for word in cur_words]) < 700:
            cur_words.append(words.pop())
        params = {
            'key': 'AIzaSyBh5ETQW4x_rat4PoOcyuGrTni17xexWlc',
             'q': [w.spelling for w in cur_words],
             'target': 'zh-CN',
             'source': 'en'
        }
        try:
            response = requests.get('https://www.googleapis.com/language/translate/v2', params=params)
        except:
            break
        print response.url
        data = response.json().get("data", None)
        if not data:
            print response.json()
            return

        translations = data['translations']
        print translations
        assert len(cur_words) == len(translations)
        for idx, translate in enumerate(translations):
            word = cur_words[idx]
            word.google_meaning = translate['translatedText']
            word.save()


@csrf_exempt
def get_words_meaning(request):
    user = request.POST.get("user")
    pwd = request.POST.get("pwd")
    print user, pwd
    user = get_user_by_pwd(user, pwd)

    if user is None:
        response = json.dumps({"status": "fail"})
    else:
        word_list = request.POST.getlist("words[]")
        print word_list
        for spelling in word_list:
            created, word = Word.objects.get_or_create(spelling=spelling)

        # no_meaning_words = Word.objects.filter(spelling__in=word_list, google_meaning='')
        # get_google_meanings(no_meaning_words)
        words = Word.objects.filter(spelling__in=word_list)
        result = {}
        for word in words:
            result[word.spelling] = word.get_meaning()

        print result
        response = json.dumps({"status": "ok", "result": result})

    response = HttpResponse(response, 'application/json')
    response['Access-Control-Allow-Origin'] = "*"
    return response


def get_word_detail(request, words=None):
    """
    获取某一个单词的详情
    """
    from wordinfos import get_format_meaning
    response = HttpResponse("%s" % json.dumps(get_format_meaning(words)))

    response['Access-Control-Allow-Origin'] = "*"
    return response


# @login_required
def set_word_status(request, words=None, status=None):
    """
    改变单词状态
    """
    if status is None:
        status = WordRememberInfos.CHOICE_REMEMBER_CONVERSANT

    if request.method == "GET":
        word, created = Word.objects.get_or_create(spelling=words)
        user = get_user(request)
        if user is None:
            data = {'result': 'user invalid'}
        else:
            wi, created = WordRememberInfos.objects.get_or_create(user=user, word=word, word_spelling=words)
            change2what = -1
            if status == "change":
                if wi.remember == WordRememberInfos.CHOICE_REMEMBER_UNACQUAINTED:
                    change2what =  WordRememberInfos.CHOICE_REMEMBER_CONVERSANT
                else:
                    change2what = WordRememberInfos.CHOICE_REMEMBER_UNACQUAINTED

            status_map = {"old": WordRememberInfos.CHOICE_REMEMBER_CONVERSANT,
                          "new": WordRememberInfos.CHOICE_REMEMBER_UNACQUAINTED,
                          "change": change2what}

            wi.remember = status_map[status]
            wi.save()

            data = {'result': 'success', 'info': wi.to_dict()}

    elif request.method == "POST":
        word_id_list = request.POST.getlist('_selected_action')
        change_word_status(word_id_list, request.user, status)
        data = {'result': "Success"}

    data = json.dumps(data)
    response = HttpResponse(json.dumps(data), "application/json")
    response['Access-Control-Allow-Origin'] = "*"
    return response


def get_user(request):
    user_name = request.GET.get("user", None)
    pwd = request.GET.get("pwd", None)
    if user_name is None or pwd is None:
        return None
    return get_user_by_pwd(user_name, pwd)


def get_user_by_pwd(username, password):
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        return User.objects.get(username=username)



@login_required
def frequency_charts(request):
    """
    词频排行榜
    """
    filter_mine = request.GET.get('filter_mine', 1)
    page_num = request.GET.get('page', 1)
    page_num = int(page_num)
    limit = request.GET.get('limit', 20)
    word_list = wordinfos.get_all_word_sort_by_repeated(request, filter_mine=filter_mine)

    pi = Paginator(word_list, limit)
    words = pi.page(page_num)
    url_frequency_filter_mine = UrlUtil.get_frequency_url(filter_mine=1)

    next_page_url = UrlUtil.get_frequency_url(filter_mine=filter_mine, limit=limit, page=page_num+1)
    pre_page_url = UrlUtil.get_frequency_url(filter_mine=filter_mine, limit=limit, page=page_num-1)
    return render(request, 'recall/frequency.html', {"words": words, "word_list": word_list,
                                                     "next_page_url": next_page_url, "pre_page_url": pre_page_url,
                                                     "url_frequency_filter_mine": url_frequency_filter_mine})


def index(request):
    """
    主页面
    """
    key = 'tran_page'
    if request.method == 'POST':
        form = TransPageForm(request.POST)
        if form.is_valid():
            trans_url = request.POST[key]
            return __redirect(get_tran_url(trans_url))
    else:
        form = TransPageForm()
    # request_history = wordinfos.get_all_request_url_history_url(request.user)
    return render(request, 'recall/index.html', {"user": request.user, "HOST": request.get_host()})


def contact(request):
    return render(request, 'recall/contact.html')


@login_required
def go_2_page(request):
    """
    翻译某网页
    """
    user = get_user(request)
    key = 'tran_page'

    if request.method == 'GET':
        if key in request.GET:
            trans_url = request.GET[key]
            return __get_tran_page(request, trans_url, user)
        else:
            return __redirect("/")
    elif request.method == 'POST':
        form = TransPageForm(request.POST)
        if form.is_valid():
            trans_url = request.POST[key]
            return __redirect(get_tran_url(trans_url))


def __get_tran_page(request, trans_url, user):
    """
    获取解析某网页的结果
    """
    print '>' * 10, trans_url
    tran_page_url = UrlUtil.get_tran_page_url(trans_url)
    form = TransPageForm(initial={'tran_page': trans_url})
    return render(request, 'recall/tran_page_result.html', {'tran_page_url': tran_page_url, 'form': form})


def translate_p(request):
    """
    获取解析某网页的结果, 显示在iframe里面的
    """
    if request.method == "GET":
        trans_url = request.GET['tran_page']
        print '>' * 10, trans_url
        return HttpResponse(translate.get_translate_page(trans_url, request.user))


@login_required
def _get_words(request, filter):
    if request.method == 'POST':
        recall_id = request.POST['xid']
        recall_word = WordRememberInfos.objects.get(pk=recall_id)
        form = RecallWordForm(request.POST, instance=recall_word)
        if form.is_valid():
            if request.POST['commitType'] == '1':
                recall_word.remember = 1
            recall_word.recall_once()
            form.save()

    recall_word = WordRememberInfos.objects.filter(remember=filter).order_by('-word__repeated')[0]
    form = RecallWordForm(instance=recall_word)
    return render(request, 'recall/recall.html', {"form": form, "id": recall_word.pk} )


@login_required
def translate_word2(request, spelling=None):
    """
    网页上某一生单词的点击事件
    """
    from_page = request.GET.get('tran_page', None)
    filter_mine = request.GET.get('filter_mine', 1)
    page_num = request.GET.get('page', 1)
    page_num = int(page_num)
    limit = request.GET.get('limit', 2000)
    request.get_full_path()

    if from_page:
        page_word_map = get_html_word_repeated_info_cleaned(from_page)
        include_word_list = page_word_map.keys()
    else:
        include_word_list = []
    word_list = wordinfos.get_all_word_sort_by_repeated(request, filter_mine=filter_mine,
                                                        include_word_list=include_word_list)
    top_word, created = Word.objects.get_or_create(spelling=spelling)
    pi = Paginator(word_list, limit)
    words = pi.page(page_num)
    url_frequency_filter_mine = UrlUtil.get_frequency_url(filter_mine=1)

    next_page_url = UrlUtil.get_full_path_and_change_request_param(request, {"page": page_num+1})
    pre_page_url = UrlUtil.get_full_path_and_change_request_param(request, {"page": page_num-1})
    return render(request, 'recall/page_word_info.html', {"pi": pi, "words": words, "top_word": top_word,
                                                          "next_page_url": next_page_url, "pre_page_url": pre_page_url,
                                                          "url_frequency_filter_mine": url_frequency_filter_mine})

@login_required
def translate_(request):
    """
    翻译某一段文字
    """
    tran_result = ""
    if request.method == "POST":
        form = TranslateForm(request.POST)
        if form.is_valid():
            tran_src = form.cleaned_data['gt_src']
            tran_result = get_translate_from_raw_str(request, tran_src)
    else:
        form = TranslateForm()
    print tran_result
    return render(request, 'recall/translate.html', {"tran_from": form, "tran_result": tran_result})

def handler404(request):
    response = render_to_response('404.html', {}, context_instance=RequestContext(request))
    response.status_code = 404
    return response

def handler500(request):
    response = render_to_response('500.html', {}, context_instance=RequestContext(request))
    response.status_code = 500
    return response

def __redirect(url, if_reverse=False):
    if if_reverse:
        url = reverse(url)
    return HttpResponseRedirect(url)
