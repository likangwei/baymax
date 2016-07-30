#coding=utf8
from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.core.paginator import Paginator
from wordRecall.models import MyWord
from wordRecall.models import UserSetting
from wordRecall.models import Word
from wordRecall.models import IgnoreUrl


class CheckBoxForm(object):

    page_num = 1
    user = None
    list_display = ()
    actions = ()
    page_count = 20
    query_set = None
    model = None
    page_range = 0
    trs = ()
    ths = ()
    action_tuples = ()
    page = None
    paginator = None
    _has_init = False
    opts = None

    def __init__(self, *args, **kwargs):
        for k in kwargs:
            setattr(self, k, kwargs[k])

    def get_query_set(self):
        return self.query_set

    def get_actions(self):
        return self.actions

    def init_tds(self):
        opts = self.model._meta
        self.trs = []
        self.ths = []
        fields = []
        for fname in self.list_display:
            f = opts.get_field(fname)
            self.ths.append(f.verbose_name)
            fields.append(f)

        for instance in self.page.object_list:
            row = []
            objid_checkbox = r'<input class="wordSelect" ' \
                             r'type="checkbox" ' \
                             r'name="_select" ' \
                             r'value="{instance.id}">'.format(**locals())
            row.append(objid_checkbox)
            for f in fields:
                v = instance._get_FIELD_display(f)
                row.append(v)
            self.trs.append(row)

    def init_page(self):
        self.paginator = Paginator(self.get_query_set(), self.page_count)
        self.page = self.paginator.page(self.page_num)
        self.page_range = self.paginator.page_range[
                            max(0, self.page_num - 5): self.page_num + 5
                          ]

    def init_action(self):
        self.action_tuples = []
        for action in self.actions:
            self.action_tuples.append((action.func_name, action.short_description))

    def init_data(self):
        self._has_init = True
        self.opts = self.model._meta
        self.query_set = self.get_query_set()
        self.init_page()
        self.init_tds()
        self.init_action()

    @classmethod
    def hand_action(cls, request):
        ids = request.POST.getlist("_select")
        action_name = request.POST.get("_actionName", None)
        query_set = cls.model.objects.filter(id__in=ids)
        for action in cls.actions:
            if action.short_description == action_name:
                action(cls, request, query_set)

    def as_context(self):
        if not self._has_init:
            self.init_data()
        print self.action_tuples
        return {
            "ths": self.ths,
            "trs": self.trs,
            "page_count": self.page_count,
            "page_range": self.page_range,
            "page": self.page,
            "paginator": self.paginator,
            "actions": self.action_tuples
        }


def delete_action(admin, request, queryset):
    queryset.delete()

delete_action.short_description = "删除选中项"


def make_word_know(admin, request, queryset):
    mywords = []
    for word in queryset:
        mywords.append(MyWord(word=word,
                              user=request.user,
                              spelling=word.spelling))
    MyWord.objects.bulk_create(mywords)
make_word_know.short_description = "标记为熟词"


class AddNewWordsForm(CheckBoxForm):

    list_display = ["spelling", "google_meaning", "repeated"]
    model = Word
    actions = [make_word_know]

    def __init__(self, *args, **kwargs):
        super(AddNewWordsForm, self).__init__(*args, **kwargs)
        myword_ids = [x.word_id for x in self.user.words.all()]
        self.query_set = Word.objects.all().exclude(id__in=myword_ids).order_by("-repeated")


def dont_tran_urls(admin, request, queryset):
    queryset.update(type=IgnoreUrl.TYPE_DONT_TRAN)
dont_tran_urls.short_description = "不再翻译此网址"


def auto_tran_urls(admin, request, queryset):
    queryset.update(type=IgnoreUrl.TYPE_AUTO_TRAN)
auto_tran_urls.short_description = "总是翻译此网址"


class IgnoreUrlForm(CheckBoxForm):

    actions = [dont_tran_urls, auto_tran_urls, delete_action]
    list_display = ["url", "type"]
    model = IgnoreUrl

    def __init__(self, *args, **kwargs):
        super(IgnoreUrlForm, self).__init__(*args, **kwargs)
        self.query_set = self.user.ignore_urls.all()


class UserSettingForm(forms.ModelForm):

    class Meta:
        model = UserSetting
        fields = ["auto_change_page"]


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


class LoginForm(forms.Form):
    username = forms.CharField(label='用户名：', max_length=100)
    password = forms.CharField(label='密码：', max_length=100, widget=forms.PasswordInput())


class MyWordForm(ModelForm):
    class Meta:
        model = MyWord
        fields = ["spelling", 'user']