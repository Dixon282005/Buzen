from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Likes, Music

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "password2")
        read_only_fields = ("is_staff", "is_superuser", "is_active", "groups", "user_permissions")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ProfileInfo(serializers.ModelSerializer):

     class Meta:
        model = User
        fields = ("username", "email", "date_joined")
        read_only_field = ("username", "email", "date_joined")
   

class UserLikes(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ("id", "user", "music", "created_at")
        read_only_fields = ("id", "user", "created_at")

    def validate_music(self, value):
        # Valida que la música exista (aunque el FK ya ayuda, esto da control del mensaje)
        if not Music.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("This music track does not exist.")
        return value