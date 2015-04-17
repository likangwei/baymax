from django.contrib import admin

from models import User, Word, WordRememberInfos
# Register your models here.

class CommonAdmin(admin.ModelAdmin):
    inlines = []
    pass

class UserAdmin(admin.ModelAdmin):
    inlines = []
    pass


admin.site.register(User, CommonAdmin)
admin.site.register(Word, CommonAdmin)
admin.site.register(WordRememberInfos, CommonAdmin)