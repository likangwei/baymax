# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.

class User(models.Model):
    """主人"""
    name = models.CharField('名字',max_length=100)
    age = models.IntegerField('年龄')
    birthday = models.DateField('生日')

class Cook(models.Model):
    """"""
    eat_time = models.DateTimeField("时间")

class Food(models.Model):
    food_name = models.CharField("食物名称")
    weight = models.FloatField("重量")

class Material(models.Model):
    material_name = models.CharField("食材名称")
