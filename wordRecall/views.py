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

from django.views.decorators.csrf import csrf_protect

from django.http import HttpResponseRedirect
from django.http import HttpResponse

from django import forms

from django.shortcuts import render
from django.shortcuts import render_to_response

from django.template import RequestContext

from parser import get_html_word_repeated_info
from wordinfos import get_all_conversant_word_list
from wordinfos import change_word_status
from models import Word, WordRememberInfos

import wordinfos
import test
import models
import translate
from models import RequestUrl,RequestHistory
import UrlUtil
from UrlUtil import get_tran_url

class TransPageForm(forms.Form):
    tran_page = forms.CharField(label='请输入网址：', max_length=100)


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

class RegForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        widgets = {
            "password": forms.PasswordInput()
        }


def reg(request):
    """
    注册
    """
    if request.method == "POST":
        form = RegForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            email = form.cleaned_data['email']
            User.objects.create_user(username, email=email, password=password)
            return __redirect("word:page", if_reverse=True)

    else:
        form = RegForm()
    return render(request, 'recall/reg.html', {"form": form})

def login(request):
    """
    登陆
    """
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            next = request.GET.get('next', default='/')
            user = authenticate(username=username, password=password)
            if user is not None and user.is_active:
                lg(request, user)
                return __redirect(next)
    else:
        form = LoginForm()
    return render(request, 'recall/login.html', {"form": form, "action": request.get_full_path()})

def _logout(request):
    """
    注销
    """
    logout(request)
    return __redirect('word:login', if_reverse=True)

@login_required
def get_recall_word(request):
    return _get_words(request, models.CHOICE_REMEMBER_UNACQUAINTED)


def __redirect(url, if_reverse=False):
    if if_reverse:
        url = reverse(url)
    return HttpResponseRedirect(url)


@login_required
def set_word_status(request, words=None, status=None):
    """
    改变单词状态
    """
    status = WordRememberInfos.CHOICE_REMEMBER_CONVERSANT
    if request.method == "POST":
        word_id_list = request.POST.getlist('_selected_action')
        user = get_user(request)
        change_word_status(word_id_list, user, status)

    data = {}
    data['result'] = 'Success'
    return HttpResponse(json.dumps(data), content_type = "application/json")


def get_user(request):
    user = request.user
    return user


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
    return render(request, 'recall/frequency.html', {"words": words, "word_list": word_list, "next_page_url":next_page_url, "pre_page_url":pre_page_url, "url_frequency_filter_mine":url_frequency_filter_mine})

@login_required
def index(request):
    """
    主页面
    """
    if request.method == 'GET':
        form = TransPageForm()
        request_history = wordinfos.get_all_request_url_history_url(request.user)
        return render(request, 'recall/index.html', {"form": form, "user":request.user, "history_list":request_history, "HOST": request.get_host()} )

@login_required
def go_2_page(request):
    """
    翻译某网页
    """
    user = get_user(request)
    KEY = 'tran_page'
    if request.method == 'POST':
        trans_url = request.POST[KEY]
        return __redirect(get_tran_url(trans_url))

    elif request.method == 'GET':
        if request.GET.has_key(KEY):
            trans_url = request.GET[KEY]
            return __get_tran_page(trans_url, user)
        else:
            return __redirect("/")



def __get_tran_page(trans_url, user):
    print trans_url
    return HttpResponse(translate.get_translate_page(trans_url, user) )



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
    return render(request, 'recall/recall.html', {"form": form, "id":recall_word.pk} )

def translate_word(request, spelling=None):
    """
    网页上某一生单词的点击事件
    """
    cur_word = spelling
    from_page = request.GET['tran_page']
    print from_page
    user = get_user(request)
    hidden_word_list = get_all_conversant_word_list(user)
    word_map = get_html_word_repeated_info(from_page, hidden_word_list=hidden_word_list)
    word_sort_list = word_map.items()
    word_sort_list.sort(cmp=lambda x, y: cmp(y[1], x[1]))
    return render(request, 'recall/translateword.html', {"cur_word": cur_word, "word_sort_list": word_sort_list, "RecallInfoClz": WordRememberInfos})

def translate_word2(request, spelling=None):
    """
    网页上某一生单词的点击事件
    """

    from_page = request.GET['tran_page']

    filter_mine = request.GET.get('filter_mine', 1)
    page_num = request.GET.get('page', 1)
    page_num = int(page_num)
    limit = request.GET.get('limit', 20)


    page_word_map = get_html_word_repeated_info(from_page)
    word_list = wordinfos.get_all_word_sort_by_repeated(request, filter_mine=filter_mine, include_word_list=page_word_map.keys())
    top_word,created = Word.objects.get_or_create(spelling=spelling)
    pi = Paginator(word_list, limit)
    words = pi.page(page_num)
    url_frequency_filter_mine = UrlUtil.get_frequency_url(filter_mine=1)

    next_page_url = UrlUtil.get_frequency_url(filter_mine=filter_mine, limit=limit, page=page_num+1)
    pre_page_url = UrlUtil.get_frequency_url(filter_mine=filter_mine, limit=limit, page=page_num-1)
    return render(request, 'recall/page_word_info.html', {"words": words, "top_word":top_word, "next_page_url":next_page_url, "pre_page_url":pre_page_url, "url_frequency_filter_mine":url_frequency_filter_mine})


def handler404(request):
    response = render_to_response('404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response('500.html', {}, context_instance=RequestContext(request))
    response.status_code = 500
    return response

def call(request):
    if request.method:
        callMethod = request.GET['call']

        if callMethod == 'init':
            init()
        if callMethod == 'init2':
            init2()
        if callMethod == 'init3':
            init3()
        if callMethod == 'init4':
            init4()
        if callMethod == 'init5':
            init5()
        if callMethod == 'init6':
            init6()
        return HttpResponse(callMethod)


def init():

    Word.objects.all().delete()
    resultFile = r'/Users/lxzMac/pycharmProjects/mycode/python/wordRemember/result.txt'

    lines = open(resultFile).readlines()
    need2create = []
    for line in lines:
        line = line.strip()
        strs = line.split(' ')
        w = Word()
        w.spelling = strs[0]
        w.repeated = strs[1]
        need2create.append(w)
        # w.save()
    Word.objects.bulk_create(need2create)


def init2():
    need2create = []
    WordRememberInfos.objects.all().delete()
    user = User.objects.all()[0]

    for word in Word.objects.all():
        info = WordRememberInfos()
        info.user = user
        info.word = word
        need2create.append(info)
        # info.save()
        # print info.pk
    WordRememberInfos.objects.bulk_create(need2create)


def init3():

    for recall in WordRememberInfos.objects.all():
        recall.word_spelling = recall.word.spelling
        recall.repeated = recall.word.repeated
        recall.save()

def init4():

    for word in Word.objects.all():
        word.meaning = test.get_meaning_of_word(word.spelling)
        print word.meaning
        word.save()

def init5():
    for word in Word.objects.all():
        print word.spelling
        word.type = test.is_complex(word.spelling, word.meaning)
        word.save()

def init6():
    for word in Word.objects.all():

        if word.repeated == 1 and word.type == models.WORD_TYPE_INVALID:
            print word.spelling
            word.delete()
