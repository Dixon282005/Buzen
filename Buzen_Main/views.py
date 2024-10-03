from django.shortcuts import get_object_or_404, render, redirect

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.create_user(email=email, username=username, password=password)
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)
