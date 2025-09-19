from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer, ProfileInfo, UserLikes
from .services.jamendo import get_tracks
from .services.get_or_create_music import get_or_create_music
from .models import Likes, Music



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
        """Listar los likes del usuario"""
        likes = Likes.objects.filter(user=request.user)
        serializer = UserLikes(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Dar like a una canción.
        Se puede enviar:
          - music_id: canción local
          - jamendo_id: canción externa de Jamendo
        """
        music_id = request.data.get("music_id")
        jamendo_id = request.data.get("jamendo_id")

        music = None
        if music_id:
            music = Music.objects.filter(id=music_id).first()
        elif jamendo_id:
            music = get_or_create_music(jamendo_id)

        if not music:
            return Response({"error": "Music not found"}, status=status.HTTP_404_NOT_FOUND)

        like, created = Likes.objects.get_or_create(user=request.user, music=music)
        if not created:
            return Response({"message": "You already liked this track"}, status=status.HTTP_200_OK)

        return Response(UserLikes(like).data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        """
        Quitar like a una canción.
        Se puede enviar:
          - music_id: canción local
          - jamendo_id: canción externa de Jamendo
        """
        music_id = request.data.get("music_id")
        jamendo_id = request.data.get("jamendo_id")

        music = None
        if music_id:
            music = Music.objects.filter(id=music_id).first()
        elif jamendo_id:
            music = Music.objects.filter(jamendo_id=jamendo_id).first()

        if not music:
            return Response({"error": "Music not found"}, status=status.HTTP_404_NOT_FOUND)

        like = Likes.objects.filter(user=request.user, music=music).first()
        if like:
            like.delete()
            return Response({"message": "Like removed"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You haven't liked this track"}, status=status.HTTP_400_BAD_REQUEST)