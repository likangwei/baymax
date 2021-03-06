# -*- coding: utf-8 -*-
from django.contrib import admin
import models
from models import MyWord
from models import RecallInfo
from models import IgnoreUrl
from models import Word
from models import UserSetting

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class MyUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'view_join_date')

    def view_join_date(self, obj):
        return obj.date_joined.strftime('%Y-%m-%d %H:%M:%S')
    view_join_date.short_name = 'datejoin'
    view_join_date.empty_value_display = '???'
    view_join_date.admin_order_field = 'date_joined'


admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)


def make_word_unacquainted(modeladmin, request, queryset):
    queryset.update(remember=models.REMEMBER_UNKNOW)
make_word_unacquainted.short_description = "置为生词"


def make_word_conversant(modeladmin, request, queryset):
    queryset.update(remember=models.REMEMBER_KNOW)
make_word_conversant.short_description = "置为熟词"


def make_word_add_remember_count(modeladmin, request, queryset):
    queryset.update(remember=models.REMEMBER_KNOW)
make_word_add_remember_count.short_description = "过了一遍"

admin.ModelAdmin.actions = [make_word_unacquainted, make_word_conversant]
class WordRememberAdmin(admin.ModelAdmin):
    inlines = []
    list_filter = ['user']
    search_fields = ['word__spelling']
    list_display = ['word', 'user']

    def __init__(self, *args, **kwargs):
        super(WordRememberAdmin, self).__init__(*args, **kwargs)
        self.actions.append(make_word_unacquainted)
        self.actions.append(make_word_conversant)


class RecallInfoInline(admin.TabularInline):
    model = RecallInfo


class CommonAdmin(admin.ModelAdmin):

    inlines = []


class UserAdmin(admin.ModelAdmin):
    inlines = []
    list_display = (
        'name', 'position', 'phone_num',
        'qq_num', 'alipay_num', 'email')


class IgnoreUrlAdmin(admin.ModelAdmin):
    inlines = []
    list_display = ('url', 'user')
    list_filter = ['user']


class WordAdmin(admin.ModelAdmin):
    inlines = []
    search_fields = ['spelling']
    list_display = ['spelling', 'repeated']





admin.site.register(Word, WordAdmin)
admin.site.register(MyWord, WordRememberAdmin)
admin.site.register(RecallInfo, CommonAdmin)
admin.site.register(IgnoreUrl, IgnoreUrlAdmin)
admin.site.register(UserSetting)