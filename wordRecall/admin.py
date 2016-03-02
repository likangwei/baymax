# -*- coding: utf-8 -*-
from django.contrib import admin
import models
from models import Word, WordRememberInfos, RecallInfo, IgnoreUrl
# Register your models here.

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class MyUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'view_join_date')

    def view_join_date(self, obj):
        return obj.date_joined.strftime('%Y-%m-%d %H:%M:%S')
    view_join_date.short_name = 'datejoin'
    view_join_date.empty_value_display = '???'


admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)


def make_word_unacquainted(modeladmin, request, queryset):
    queryset.update(remember=models.CHOICE_REMEMBER_UNACQUAINTED)
make_word_unacquainted.short_description = "置为生词"

def make_word_conversant(modeladmin, request, queryset):
    queryset.update(remember=models.CHOICE_REMEMBER_CONVERSANT)
make_word_conversant.short_description = "置为熟词"

def make_word_add_remember_count(modeladmin, request, queryset):
    queryset.update(remember=models.CHOICE_REMEMBER_CONVERSANT)
make_word_add_remember_count.short_description = "过了一遍"


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
    inlines = [ ]
    search_fields = ['spelling']
    list_display = ['spelling', 'repeated', 'type']
    list_filter = ['type']


class WordRememberAdmin(admin.ModelAdmin):
    inlines = [RecallInfoInline,]
    actions = [make_word_unacquainted, make_word_conversant]
    list_filter = ['remember', 'user']
    search_fields = ['word__spelling']
    list_display = ['word', 'user', 'weight', 'remember', 'recall_counts', 'repeated']

admin.site.register(Word, WordAdmin)
admin.site.register(WordRememberInfos, WordRememberAdmin)
admin.site.register(RecallInfo, CommonAdmin)
admin.site.register(IgnoreUrl, IgnoreUrlAdmin)