from django.forms import ModelForm
from .models import Post, Category


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = '__all__'


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name']
