from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_406_NOT_ACCEPTABLE
from rest_framework.decorators import api_view
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        register = UserSerializer(data=request.data)
        if register.is_valid():
            register.save()
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_406_NOT_ACCEPTABLE)

    return (Response())

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
