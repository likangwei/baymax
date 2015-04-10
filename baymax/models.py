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

class Cook(models.Model):
    """"""
    user = models.ForeignKey(User)
    eat_time = models.DateTimeField("时间")

class Food(models.Model):
    cook = models.ForeignKey(Cook)
    food_name = models.CharField("食物名称", max_length=50)
    weight = models.FloatField("重量")

class Material(models.Model):
    material_name = models.CharField("食材名称", max_length=50)

class Stool(models.Model):
    HEALTH_1 = 'HEALTH_1'
    HEALTH_2 = 'HEALTH_2'
    HEALTH_3 = 'HEALTH_3'
    HEALTH_4 = 'HEALTH_4'
    HEALTH_5 = 'HEALTH_5'
    HEALTH_6 = 'HEALTH_6'
    HEALTH_7 = 'HEALTH_7'
    HEALTH_8 = 'HEALTH_8'
    HEALTH_9 = 'HEALTH_9'
    HEALTH_10 = 'HEALTH_10'

    HEALTH_DEGREE_CHOICES = (
        (HEALTH_1, '健康度1'),
        (HEALTH_2, '健康度2'),
        (HEALTH_3, '健康度3'),
        (HEALTH_4, '健康度4'),
        (HEALTH_5, '健康度5'),
        (HEALTH_6, '健康度6'),
        (HEALTH_7, '健康度7'),
        (HEALTH_8, '健康度8'),
        (HEALTH_9, '健康度9'),
        (HEALTH_10, '健康度10'),
    )
    user = models.ForeignKey(User)
    do_time = models.DateTimeField('时间',auto_now=True)
    health_degree = models.CharField('健康度', choices=HEALTH_DEGREE_CHOICES, max_length=10)

