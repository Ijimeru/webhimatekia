from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username= models.CharField(unique=False,null=True,max_length=100)
    email = models.EmailField(unique=True, null=False)
    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS=['username']