from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_406_NOT_ACCEPTABLE, HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view
from .serializers import UserSerializer, MyTokenObtainPairSerializer, BookSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Book, User
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import threading
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from .utils import generate_token
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


def send_action_email(user, request):
    current_site = get_current_site(request)
    email_subject = 'Activate your account'
    email_body = render_to_string('api/email_activate.html', {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user)})
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
            print("user")
            send_action_email(user, request)
            return Response({"message": "Verifikasi email berhasil di kirim"}, status=HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Email tidak ditemukan"}, HTTP_400_BAD_REQUEST)
    return Response({"message": "gege"})


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


@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        register = UserSerializer(data=request.data)
        if register.is_valid():
            user = register.save()
            send_action_email(user, request)
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_406_NOT_ACCEPTABLE)
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

    def get_queryset(self):
        book = Book.objects.all()
        return book
