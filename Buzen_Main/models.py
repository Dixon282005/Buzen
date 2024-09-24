from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator
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
    create_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} {self.surname}"

class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    user_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.username
    
    
    
class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    music_id = models.PositiveIntegerField()

    def __str__(self):
        return f"User {self.user_id} likes Music {self.music_id}"

class MusicHistory(models.Model):
    music_id = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    play_date = models.DateTimeField()

    def __str__(self):
        return f"User {self.user_id} played Music {self.music_id} on {self.play_date}"

class FavoriteGender(models.Model):
    gender_id = models.PositiveIntegerField()
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
    music_id = models.PositiveIntegerField()

    def __str__(self):
        return self.playlist_name

class LogIn(models.Model):
    log_date = models.DateTimeField()
    platform = models.CharField(max_length=255)
    dispositive = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"User {self.user_id} logged in on {self.log_date} using {self.platform}"