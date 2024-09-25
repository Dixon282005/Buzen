from django.contrib import admin
from .models import Client, User, Likes, MusicHistory, FavoriteGender, FavoriteArtist, Playlist, LogIn
# Register your models here.
admin.site.register(Client)
admin.site.register(User)
admin.site.register(Likes)
admin.site.register(MusicHistory)
admin.site.register(FavoriteGender)
admin.site.register(FavoriteArtist)
admin.site.register(Playlist)
admin.site.register(LogIn)

