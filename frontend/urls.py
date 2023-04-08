from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('admin',index),
    path('login',index),
    path('register',index)
]
