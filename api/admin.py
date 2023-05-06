from django.contrib import admin
from django.contrib.admin.models import LogEntry
from .models import User, Category, Book, MetaCategory, Post
from django.contrib.auth.models import Permission
# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Book)
admin.site.register(MetaCategory)
admin.site.register(Permission)
admin.site.register(Post)
admin.site.register(LogEntry)
