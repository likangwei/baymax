# -*- coding: utf-8 -*-
from django.contrib import admin
import models
from models import User, Word, WordRememberInfos, RecallInfo
# Register your models here.

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


class WordAdmin(admin.ModelAdmin):
    inlines = [ ]
    search_fields = ['spelling']
    list_display = ['spelling', 'repeated', 'type']
    list_filter = ['type']


class WordRememberAdmin(admin.ModelAdmin):
    inlines = [RecallInfoInline,]
    actions = [make_word_unacquainted, make_word_conversant]
    list_filter = ['remember', ]
    search_fields = ['word__spelling']
    list_display = ['word', 'user', 'weight', 'remember', 'recall_counts', 'repeated']


admin.site.register(User, CommonAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(WordRememberInfos, WordRememberAdmin)
admin.site.register(RecallInfo, CommonAdmin)