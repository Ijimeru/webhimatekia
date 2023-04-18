from django.contrib import admin
from .models import User, Category, Book, MetaCategory
from django.contrib.auth.models import Permission
# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Book)
admin.site.register(MetaCategory)
admin.site.register(Permission)
