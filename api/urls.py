from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenVerifyView
)
from rest_framework_simplejwt.views import TokenBlacklistView


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('register-user/', views.registerUser),
    path('book/', views.BookApiView.as_view({'get': 'list'})),
    path('activate-user/<uidb64>/<token>',
         views.activate_user, name="activate"),
    path('resend-email/', views.resend_email),
    path('posts/', views.getPosts),
    path('posts/<slug:slug>/', views.getPosts),
    path('posts/<slug:slug>/delete', views.getPosts),
    path('posts/create', views.getPosts),
    path('posts/<slug:slug>/update', views.getPosts),
    path('categories/', views.getCategories),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
