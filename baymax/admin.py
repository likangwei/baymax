from django.contrib import admin
from models import User, Cook, Stool
# Register your models here.

class CommonAdmin(admin.ModelAdmin):
    inlines = []
    pass

class UserAdmin(admin.ModelAdmin):
    inlines = []
    pass

class UserAdmin(admin.ModelAdmin):
    inlines = []
    pass

admin.site.register(User, CommonAdmin)
admin.site.register(Cook, CommonAdmin)
admin.site.register(Stool, CommonAdmin)