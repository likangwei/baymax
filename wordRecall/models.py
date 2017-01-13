# -*- coding: utf-8 -*-
from django.db import models
import datetime
from django.contrib.auth.models import User
import urllib

from django.utils import timezone
WORD_TYPE_COMMON = 0
WORD_TYPE_INVALID = 500


class Word(models.Model):

    spelling = models.CharField("拼写", unique=True, max_length=100, null=False)
    repeated = models.IntegerField("置为熟词的用户数", default=0);
    meaning = models.CharField("翻译", max_length=1024)
    google_meaning = models.CharField("Google翻译", max_length=1024, default=None, null=True)

    def add_repeated(self, number=1):
        self.repeated = self.repeated + number
        self.save()

    def get_meaning(self):
        return self.google_meaning

    def get_meaning_from_baidu(self):
        if not self.meaning:
            try:
                params = urllib.urlencode({'query': self.spelling, 'from': 'en', 'to': 'zh'})
                f = urllib.urlopen("http://apistore.baidu.com/microservice/dictionary?%s" % params)
                self.meaning = f.read()
                self.save()
            except:
                pass
        return self.meaning

    def __str__(self):
        return self.spelling


class MyWord(models.Model):
    """个人词库"""
    REMEMBER_KNOW = 1
    REMEMBER_UNKNOW = 3

    word = models.ForeignKey(Word)
    user = models.ForeignKey(User, related_name="words")
    spelling = models.CharField("拼写", max_length=100)
    change_time = models.DateTimeField("上次修改时间", auto_now=True)

    def get_repeated(self):
        return self.word.repeated
    get_repeated.admin_order_field = 'word__spelling'
    get_repeated.integer = True

    def recall_once(self):
        self.recall_counts = self.recall_counts + 1
        self.save()
        recallInfo = RecallInfo()
        recallInfo.word_recall = self
        recallInfo.recall_time = datetime.datetime.now()
        recallInfo.save()

    def to_dict(self):
        return {"spelling": self.spelling, "status": self.status}

    def save(self, *args, **kwargs):
        self.change_time = timezone.now()
        return super(MyWord, self).save(*args, **kwargs)

    def __str__(self):
        return '%s_%s' % (self.user.pk, self.spelling)

    class Meta(object):
        verbose_name = 'myword'
        db_table = "wordRecall_myword"
        unique_together = ("user", "word")


class RequestUrl(models.Model):
    title = models.CharField("标题", max_length=500, default="")
    url = models.CharField("访问链接", max_length=500)


class RequestHistory(models.Model):
    url = models.ForeignKey(RequestUrl)
    user = models.ForeignKey(User)
    url_info = models.CharField("访问链接", max_length=500)
    request_number = models.IntegerField("请求次数", default=0)


class RecallInfo(models.Model):
    CHOICES_REMEMBER = []
    for i in range(11):
        CHOICES_REMEMBER.append((i, '记住%s成' %i))
    word_recall = models.ForeignKey(MyWord)
    recall_time = models.DateTimeField()
    remember = models.IntegerField("记住程度", default=0, choices=CHOICES_REMEMBER)


class IgnoreUrl(models.Model):
    TYPE_AUTO_TRAN = 0
    TYPE_DONT_TRAN = 1

    TYPE_CHOICES = (
        (TYPE_AUTO_TRAN, "总是翻译"),
        (TYPE_DONT_TRAN, "不再翻译"),
    )

    user = models.ForeignKey(User, related_name='ignore_urls')
    url = models.CharField(max_length=100, default='', null=True)
    type = models.IntegerField(default=TYPE_DONT_TRAN, verbose_name="类型", choices=TYPE_CHOICES)

    class Meta:
        unique_together = ('user', 'url')


class UserSetting(models.Model):
    user = models.OneToOneField(User, related_name="mysettings")
    auto_change_page = models.BooleanField(default=False, verbose_name="自动翻译所有页面")

@property
def errors(user):
    rst = []
    return rst

@property
def settings(user):
    try:
        return UserSetting.objects.get(user=user)
    except:
        return UserSetting.objects.create(user=user, auto_change_page=False)


@property
def is_valid(user):
    return len(user.errors) == 0


User.add_to_class('settings', settings)
User.add_to_class('is_valid', is_valid)
User.add_to_class('errors', errors)
