from django.contrib import admin
from api.models import User, Profile, Task

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']

class TaskAdmin(admin.ModelAdmin):
    list_editable = ['completed', 'due_date', 'category']
    list_display = ['user', 'title', 'description', 'due_date', 'date_created', 'category', 'completed']


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Task, TaskAdmin)
