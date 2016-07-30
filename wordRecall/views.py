# -*- coding: utf-8 -*-
import json
from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth import login as lg
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import Context
from django.template import loader
from django.template import RequestContext
from healthPriceless.settings import LOGIN_URL
from healthPriceless.settings import LOGOUT_URL
from healthPriceless.settings import CONFIG_URL
from wordRecall.models import Word
from wordRecall.models import MyWord

from wordRecall.forms import RegForm
from wordRecall.forms import IgnoreUrlForm
from wordRecall.forms import UserSettingForm
from wordRecall.forms import LoginForm
from wordRecall.forms import AddNewWordsForm

from django.core.paginator import Paginator
from django.core.paginator import Page

MENU_NAME_INDEX = "主页"
MENU_NAME_START = "快速开始"
MENU_NAME_DOWNLOAD = "下载"
MENU_NAME_ABOUT = "关于"
MENU_MANAGE = "我的管理页面"

SIDE_NEW_VERSION = "最新版本2.1   (16年7月30号更新)"
SIDE_MANAGE_MY_WORDS = "管理我的词库"
SIDE_MANAGE_URLS = "管理翻译网站"
SIDE_NAME_SETTING = "设置"

MENU_SIDEBARS = [
    {
        "name": MENU_NAME_INDEX,
        "url": "/",
        "id": "head_index",
        "sides": [
            {"name": SIDE_NEW_VERSION, "url": "/"},
        ],
    },
    {
        "name": MENU_NAME_START,
        "url": "/get-start",
        "sides": [],
        "id": "head_start",
    },
    {
        "name": MENU_NAME_DOWNLOAD,
        "url": "/download",
        "sides": [],
        "id": "head_download",
    },
    {
        "name": MENU_NAME_ABOUT,
        "url": "/about",
        "sides": [],
        "id": "head_about"
    },
    {
        "name": MENU_MANAGE,
        "url": "/settings",
        "sides": [
            {"name": SIDE_NAME_SETTING, "url": "/settings"},
            {"name": SIDE_MANAGE_MY_WORDS, "url": "/mywords"},
            {"name": SIDE_MANAGE_URLS, "url": "/urls"},
        ],
        "id": "head_settings"
    },
]


def get_menu_sidebars(name):
    from copy import deepcopy
    rst = deepcopy(MENU_SIDEBARS)
    for menu in rst:
        if name == menu['name']:
            menu['active'] = True
        for sidebar in menu['sides']:
            if name == sidebar['name']:
                sidebar["active"] = True
                menu['active'] = True
    print json.dumps(rst, ensure_ascii=False)
    return json.dumps(rst)


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
    return render(request, 'recall/login.html', {"form": form,
                                                 "action": request.get_full_path()})


@login_required
def settings(request):
    """
    登陆
    """
    if request.method == "POST":
        form = UserSettingForm(data=request.POST, instance=request.user.settings)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(request.path)
    else:
        form = UserSettingForm(instance=request.user.settings)
    return render(request, 'recall/settings.html', {
        "form": form,
        "menu_info": get_menu_sidebars(SIDE_NAME_SETTING),
    })


@login_required
def mywords(request):
    """
    登陆
    """
    if request.method == "GET":
        per_page = request.GET.get('count', 20)
        page = int(request.GET.get('page', '1'))
        addNewWordForm = AddNewWordsForm(
            user=request.user,
            page_num=page,
            page_count=per_page,
        )
        context = addNewWordForm.as_context()
        context['menu_info'] = get_menu_sidebars(SIDE_MANAGE_MY_WORDS)
        return render(
            request,
            'recall/mywords.html',
            context,
            context_instance=RequestContext(request)
        )
    elif request.method == "POST":
        AddNewWordsForm.hand_action(request)
        return HttpResponseRedirect(request.path)


@login_required
def myurls(request):
    """
    登陆
    """
    if request.method == "GET":
        per_page = request.GET.get('count', 20)
        page = int(request.GET.get('page', '1'))
        ignore_urls_form = IgnoreUrlForm(
            user=request.user, page_num=page, page_count=per_page
        )
        context = ignore_urls_form.as_context()
        context['menu_info'] = get_menu_sidebars(SIDE_MANAGE_URLS)
        return render(
            request,
            'recall/myurls.html',
            context,
            context_instance=RequestContext(request)
        )
    elif request.method == "POST":
        IgnoreUrlForm.hand_action(request)
        return HttpResponseRedirect(request.path)



def template(request):
    """
    登陆
    """
    from django.template import loader
    outside_template_str = loader.get_template("box_outside.html").render()
    inside_template_str = loader.get_template("box_inside.html").render()
    data = {"outside": outside_template_str, "inside": inside_template_str}
    return JsonResponse(data)


def pop_login(request):
    """
    插件的pop界面
    """
    if request.GET.get('version', 1.0) < 2.1:
        warning = "您的淘生词插件版本太低, 请到重新下载!"
    else:
        warning = "版本 %s" % 2.1

    if request.user.is_authenticated():
        body = loader.get_template("pop_has_login.html").render(
            Context({
                "user": request.user,
                "LOGOUT_URL": LOGOUT_URL,
                "CONFIG_URL": CONFIG_URL,
                "warning": warning
            })
        )
    else:
        body = loader.get_template("pop_unlogin.html").render(
            Context({
                "LOGIN_URL": LOGIN_URL,
                "warning": warning
            }))
    data = {"success": True, "body": body}
    return JsonResponse(data)


@login_required
def _logout(request):
    """
    注销
    """
    logout(request)
    return __redirect('word:login', if_reverse=True)


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


def get_user(request):
    if request.user.is_authenticated():
        return request.user
    else:
        user_name = request.GET.get("user", None)
        pwd = request.GET.get("pwd", None)
        if user_name is None or pwd is None:
            return None
        return get_user_by_pwd(user_name, pwd)


def get_user_by_pwd(username, password):
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        return User.objects.get(username=username)


def index(request):
    """
    主页面
    """
    return render(request, 'recall/index.html', {"user": request.user,
                                                 "HOST": request.get_host(),
                                                 "menu_info": get_menu_sidebars(SIDE_NEW_VERSION)
                                                 })


def get_start(request):
    return render(request, 'recall/get-start.html', {
        "menu_info": get_menu_sidebars(MENU_NAME_START)
    })


def contact(request):
    return render(request, 'recall/contact.html')


def download(request):
    return render(request, 'recall/download.html', {
        "menu_info": get_menu_sidebars(MENU_NAME_DOWNLOAD)
    })


def about(request):
    return render(request, 'recall/about.html', {
        "menu_info": get_menu_sidebars(MENU_NAME_ABOUT)
    })


def __redirect(url, if_reverse=False):
    if if_reverse:
        url = reverse(url)
    return HttpResponseRedirect(url)
