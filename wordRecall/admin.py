from django.contrib import admin

from models import User, Word, WordRememberInfos
# Register your models here.

class CommonAdmin(admin.ModelAdmin):
    inlines = []


class UserAdmin(admin.ModelAdmin):
    inlines = []
    list_display = (
        'name', 'position', 'phone_num',
        'qq_num', 'alipay_num', 'email')


class WordAdmin(admin.ModelAdmin):
    inlines = []
    search_fields = ['spelling']
    list_display = ['spelling', 'repeated']


class WordRememberAdmin(admin.ModelAdmin):
    inlines = []
    actions = []
    list_display = ['word', 'user', 'weight', 'remember', 'recall_counts']

admin.site.register(User, CommonAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(WordRememberInfos, WordRememberAdmin)