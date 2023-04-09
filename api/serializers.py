from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        user = User.objects.create(password=hashed_password, **validated_data)
        return user
    class Meta:
        model = User
        fields = ['username','email', 'password']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field=User.EMAIL_FIELD
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['password'] = user.password
        return token