# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.


class User(models.Model):
    """主人"""
    name = models.CharField('名字',max_length=100)
    age = models.IntegerField('年龄')
    birthday = models.DateField('生日')

    def __str__(self):
        return self.name

WORD_TYPE_COMMON = 0
WORD_TYPE_INVALID = 500
class Word(models.Model):

    CHOICES_REPEATED = []
    for i in range(11):
        CHOICES_REPEATED.append((i, '%s' %i))

    spelling = models.CharField("拼写", max_length=100, null=False)
    repeated = models.IntegerField("复现率", default=0);
    type = models.IntegerField("类型", default=WORD_TYPE_COMMON)
    meaning = models.CharField("翻译", max_length=1024*8)

    def __str__(self):
        return self.spelling


CHOICE_REMEMBER_CONVERSANT = 1
CHOICE_REMEMBER_UNACQUAINTED = 3

class WordRememberInfos(models.Model):

    word = models.ForeignKey(Word)
    user = models.ForeignKey(User)

    CHOICES_REMEMBER = [(CHOICE_REMEMBER_CONVERSANT, "熟词"),
    (2, "半生不熟"),
    (CHOICE_REMEMBER_UNACQUAINTED, "生词"),
    (4, "未分类"),
           ]

    CHOICES_WEIGHT = [(1, "非常重要"),
        (2, "比较重要"),
        (3, "一般"),
        (4, "不重要"),
        (5, "完全不用记"),
               ]

    word_spelling = models.CharField("拼写", max_length=100)
    weight = models.IntegerField("重要度", default=3, choices=CHOICES_WEIGHT)
    remember = models.IntegerField("记住程度", default=4, choices=CHOICES_REMEMBER);
    recall_counts = models.IntegerField("记忆次数", default=0);
    repeated = models.IntegerField("复现率", default=0);
    remarks = models.CharField("备注", max_length=100, null=True)

    def get_repeated(self):
        return self.word.repeated
    get_repeated.admin_order_field = 'word__spelling'
    get_repeated.integer = True

