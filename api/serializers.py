from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from .models import *
# Serializers define the API representation.


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        user = User.objects.create(password=hashed_password, **validated_data)
        return user

    class Meta:
        model = User
        fields = ['email', 'username', 'password']


class PostSerializer(serializers.ModelSerializer):
    # author = serializers.SlugRelatedField(
    #     slug_field="username",
    #     many=False,
    #     read_only=True
    # )
    hero_img = serializers.ImageField(required=False, use_url="post/image")

    class Meta:
        model = Post
        exclude = ['kategori']
        ordering = '-created_at'

    # def save(self,**kwargs):
    #     validated_data = [
    #         {**attrs, **kwargs} for attrs in self.validated_data
    #     ]
    #     hero_img = self.validated_data.pop('hero_img', None)
    #     post = Post.objects.create(**self.validated_data)  # type:ignore
    #     if hero_img:
    #         post.hero_img.save(hero_img.name, hero_img)
    #     return post

    # def create(self, validated_data):
    #     # print(validated_data)
    #     hero_img = validated_data.pop('hero_img', None)
    #     post = Post.objects.create(**validated_data)
    #     if hero_img:
    #         post.hero_img.save(hero_img.name, hero_img)
    #     return post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'meta_category']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        if not user.is_active or not user.is_email_verified:  # type: ignore
            raise serializers.ValidationError(
                "Akun belum aktif atau email belum diverifikasi.")
        return data

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['email'] = user.email
        token['nim'] = user.nim
        return token


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
