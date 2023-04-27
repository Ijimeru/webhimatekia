from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.


class User(AbstractUser):
    username = models.CharField(unique=False, null=True, max_length=100)
    email = models.EmailField(unique=True, null=False)
    nim = models.CharField(unique=True, max_length=9)
    is_email_verified = models.BooleanField(default=False)
    # is_online = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class MetaCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    meta_category = models.ForeignKey(MetaCategory, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    price = models.IntegerField(null=True, blank=True)
    category = models.ManyToManyField(Category)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    publisher = models.CharField(max_length=100)
    kategori = models.ManyToManyField(Category)
    content = models.TextField()
    # is_published = models.BooleanField(default=False)
    STATUS = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('deleted', 'Deleted'),
        ('trash', 'Trashed'),
    ]
    status = models.CharField(max_length=10, choices=STATUS)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        elif self.status != 'published' and self.published_at:
            self.published_at = None
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
