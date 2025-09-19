from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    first_name = None
    last_name = None
    is_artist = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    is_blocked = models.BooleanField(default=False)
    client = models.OneToOneField('Client', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.username


class Client(models.Model):
    name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    born_date = models.DateField()
    country = models.CharField(max_length=20)


class Artist(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, null=True, blank=True)
    artist_name = models.CharField(max_length=100, unique=True)
    bio = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Gender(models.Model):
    name = models.CharField(max_length=50, unique=True)


class Album(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    release_date = models.DateField(blank=True, null=True)


class Music(models.Model):
    # Info de Jamendo
    jamendo_id = models.CharField(max_length=50, unique=True, null=True, blank=True)  # ID de Jamendo, opcional
    audio_url = models.URLField(blank=True, null=True)  # URL de streaming

    # Info tradicional que ya tenías
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, null=True, blank=True)
    album = models.ForeignKey(Album, on_delete=models.SET_NULL, null=True, blank=True)
    duration = models.IntegerField(blank=True, null=True)  # duración en segundos
    gender = models.ForeignKey(Gender, on_delete=models.SET_NULL, null=True, blank=True)
    release_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.artist.artist_name if self.artist else 'Unknown Artist'}"


class Likes(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'music')


class MusicHistory(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    play_date = models.DateTimeField(auto_now_add=True)


class SearchHistory(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    search_term = models.CharField(max_length=255)
    search_date = models.DateTimeField(auto_now_add=True)


class FavoriteGender(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'gender')


class FavoriteArtist(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'artist')


class Playlist(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    playlist_name = models.CharField(max_length=30)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'playlist_name')


class PlaylistMusic(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        unique_together = ('playlist', 'music')


class Library(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    added_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'music')


class Queue(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    position = models.IntegerField()
    added_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'music')


class LogIn(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    log_date = models.DateTimeField(auto_now_add=True)
    platform = models.CharField(max_length=50)
    device = models.CharField(max_length=50)


class Subscription(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)


class Follow(models.Model):
    follower = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE, related_name='following')
    following = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE, related_name='followers')
    follow_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')


class Notification(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class BlockedCustomUser(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE, related_name='blocker')
    blocked_user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE, related_name='blocked')
    block_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'blocked_user')


class Statistics(models.Model):
    user = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE)
    total_listens = models.IntegerField(default=0)
    total_likes = models.IntegerField(default=0)
    last_listen_date = models.DateTimeField(blank=True, null=True)


class Chat(models.Model):
    sender = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey('Buzen_Main.CustomUser', on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    seen = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)
