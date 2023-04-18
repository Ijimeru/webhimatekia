from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name="index"),
    path('admin', index),
    path('login', index),
    path('register', index),
    path('activated', index, name="activated"),
    path('activate-failed', index, name="activate-failed"),
]
