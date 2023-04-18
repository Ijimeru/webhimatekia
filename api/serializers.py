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
        return token


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
