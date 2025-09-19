from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer, ProfileInfo
from .services.jamendo import get_tracks


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Usuario registrado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"]
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                })
            return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Home (APIView):
    permission_classes = [IsAuthenticated]
    def get (self, request):
      user = request.user
      tracks = get_tracks(limit=5)
      return Response ({'mesagge' : f'Bienvenido, {user}',
                         'tracks' : tracks.get('results', [])})


class Profile (APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        getProfile = ProfileInfo(request.user)
        return Response (getProfile.data)
    

class Like (APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        getLikes = UserLikes(request.user)
        return Response (getLikes, status= status.HTTP_200_OK)