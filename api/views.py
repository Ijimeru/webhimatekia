from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_406_NOT_ACCEPTABLE, HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, MyTokenObtainPairSerializer, BookSerializer, PostSerializer, CategorySerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import Book, User, Post, Category
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import threading
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from .utils import generate_token
from django.shortcuts import redirect
from django.urls import reverse
import re
# Create your views here.


class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


def send_action_email(user, request, rule):
    current_site = get_current_site(request)
    email_subject = 'Activate your account'
    email_body = render_to_string('api/email_activate.html', {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user),
        "rule": rule
    })
    email = EmailMultiAlternatives(
        subject=email_subject, body=email_body,
        from_email=settings.EMAIL_FROM_USER, to=[user.email])
    email.attach_alternative(email_body, 'text/html')
    EmailThread(email).start()


@api_view(['POST'])
def resend_email(request):
    if request.method == 'POST':
        try:
            user = User.objects.get(email=request.data['email'])
            try:
                send_action_email(user, request, "verifikasi")
                return Response({"message": "Verifikasi email berhasil di kirim"},
                                status=HTTP_200_OK)
            except:
                return Response({"message": "Email verifikasi gagal dikirim"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "Email tidak ditemukan"}, HTTP_400_BAD_REQUEST)
    return Response()


def activate_user(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception as e:
        user = None

    if user and generate_token.check_token(user, token):
        user.is_email_verified = True
        user.save()
        return redirect(reverse("activated"))
    return redirect(reverse("activate-failed"))


def reset_password(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception as e:
        user = None


@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        email = request.data.get('email')
        if (not bool(re.match(
                r"^.+\.+[0-9]{1,3}.+28.+[0-9]{1,4}.+\@student\.itera\.ac\.id$", email))):
            return Response({"message": "Gunakanlah email Teknik Kimia Itera"}, status=HTTP_406_NOT_ACCEPTABLE)
        register = UserSerializer(data=request.data)
        if register.is_valid():
            user = register.save()
            send_action_email(user, request, "verifikasi")
            return Response({"message": "Akun berhasil dibuat"}, status=HTTP_201_CREATED)
        return Response({"message": "Email telah digunakan"}, status=HTTP_406_NOT_ACCEPTABLE)
    return (Response())


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=HTTP_200_OK)


class BookApiView(ModelViewSet):
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        book = Book.objects.all()
        return book


@api_view(['GET', 'DELETE', 'PATCH'])
@permission_classes([permissions.IsAuthenticated])
def getPosts(request, id=None):
    if request.method == "DELETE":
        post = Post.objects.get(pk=id)
        post.status = request.data['command']
        post.save()
        return Response(status=HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        posts = Post.objects.get(pk=request.query_params.get('id'))
        posts.title = request.data.get('title')
        posts.save()
    elif request.method == "PATCH":
        post = Post.objects.get(pk=id)
        serializer = PostSerializer(
            instance=post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    if (id != None):
        posts = Post.objects.get(pk=id)
        serializer = PostSerializer(posts)
        return Response(serializer.data, status=HTTP_200_OK)
    posts = Post.objects.exclude(status="deleted")
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE'])
def getCategories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)
