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

class Word(models.Model):


    CHOICES_REPEATED = []
    for i in range(11):
        CHOICES_REPEATED.append((i, '%s' %i))

    spelling = models.CharField("拼写", max_length=100, null=False)

    repeated = models.IntegerField("复现率", default=0);

    def __str__(self):
        return self.spelling

class WordRememberInfos(models.Model):

    word = models.ForeignKey(Word)
    user = models.ForeignKey(User)

    CHOICES_REMEMBER = [(1, "已记住，非常熟"),
    (2, "费劲的想起来"),
    (3, "仅有点印象"),
    (4, "完全没印象"),
           ]

    CHOICES_WEIGHT = [(1, "非常重要"),
        (2, "比较重要"),
        (3, "一般"),
        (4, "不重要"),
        (5, "完全不用记"),
               ]

    weight = models.IntegerField("重要度", default=3, choices=CHOICES_WEIGHT)
    remember = models.IntegerField("记住程序", default=4, choices=CHOICES_REMEMBER);
    recall_counts = models.IntegerField("记忆次数", default=0);

