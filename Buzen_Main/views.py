from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer, ProfileInfo, UserLikes
from .services.jamendo import get_tracks
from .models import Likes


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
        return Response (getProfile.data, status=status.HTTP_200_OK)
    

class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        likes = Likes.objects.filter(user=request.user)
        serializer = UserLikes(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id  # Forzamos que siempre sea el usuario autenticado
        serializer = UserLikes(data=data)

        if serializer.is_valid():
            like, created = Likes.objects.get_or_create(
                user=request.user, music=serializer.validated_data["music"]
            )
            if not created:
                return Response({"message": "You already liked this track"}, status=status.HTTP_200_OK)

            return Response(UserLikes(like).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        music_id = request.data.get("music_id")
        if not music_id:
            return Response({"error": "music_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            like = Likes.objects.get(user=request.user, music_id=music_id)
            like.delete()
            return Response({"message": "Like removed"}, status=status.HTTP_204_NO_CONTENT)
        except Likes.DoesNotExist:
            return Response({"error": "You haven't liked this track"}, status=status.HTTP_400_BAD_REQUEST)