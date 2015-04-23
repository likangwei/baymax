from django.contrib import admin
from models import User, Cook, Stool
# Register your models here.

class CommonAdmin(admin.ModelAdmin):
    inlines = []
    pass

class CookAdmin(admin.ModelAdmin):
    inlines = []
    list_display = ["user", "food_sample_name", "eat_time", "full_level"]

class StoolAdmin(admin.ModelAdmin):
    inlines = []
    list_display = ["user", "do_time", "health_degree"]

class UserAdmin(admin.ModelAdmin):
    inlines = []
    pass

class UserAdmin(admin.ModelAdmin):
    inlines = []
    pass

admin.site.register(User, CommonAdmin)
admin.site.register(Cook, CookAdmin)
admin.site.register(Stool, StoolAdmin)