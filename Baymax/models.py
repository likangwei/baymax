# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.

class User(models.Model):
    """主人"""
    name = models.CharField('名字',max_length=100)
    age = models.IntegerField('年龄', max_length=11)
    birthday = models.DateField('生日')

