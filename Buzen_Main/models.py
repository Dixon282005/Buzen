from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin,  Group, Permission

# Create your models here.


class Client(models.Model):
    name = models.CharField(max_length=15)
    surname = models.CharField(max_length=15)
    age = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(10), MaxValueValidator(99)]
    )
    country = models.CharField(max_length=20)
    phone_number = models.CharField(
        max_length=15,
        unique=True,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="El número de teléfono debe estar en el formato: '+999999999'. Hasta 15 dígitos permitidos.")]
    )
    born_date = models.DateField(auto_now=False, auto_now_add=False, default=datetime.date.today)
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, default = 1 )

    def __str__(self):
        return f"{self.name} {self.surname}"

"""
class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    first_name = None
    last_name = None
    groups = models.ManyToManyField(
        Group,
        related_name='buzen_user_set', 
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='buzen_user_permissions_set',  
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )
    
    def __str__(self):
        return self.username
    """
    
    
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=20, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        Group,
        related_name='buzen_user_set', 
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='buzen_user_permissions_set',  
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    
    
    
    
    
    
    
class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #music_id = models.PositiveIntegerField()

    def __str__(self):
        return f"User {self.user_id} likes Music {self.music_id}"

class MusicHistory(models.Model):
    #music_id = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    play_date = models.DateTimeField()

    def __str__(self):
        return f"User {self.user_id} played Music {self.music_id} on {self.play_date}"

class FavoriteGender(models.Model):
    #gender_id = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"User {self.user_id} likes Gender {self.gender_id}"

class FavoriteArtist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist_id = models.PositiveIntegerField()

    def __str__(self):
        return f"User {self.user_id} likes Artist {self.artist_id}"

class Playlist(models.Model):
    playlist_name = models.CharField(max_length=30, unique=True)
    create_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #music_id = models.PositiveIntegerField()

    def __str__(self):
        return self.playlist_name

class LogIn(models.Model):
    log_date = models.DateTimeField()
    platform = models.CharField(max_length=255)
    dispositive = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"User {self.user_id} logged in on {self.log_date} using {self.platform}"
