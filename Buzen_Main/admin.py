from django.contrib import admin
from .models import (
    Client, CustomUser, Likes, MusicHistory,
    FavoriteGender, FavoriteArtist, Playlist, LogIn
)

admin.site.register(CustomUser)
admin.site.register(Client)
admin.site.register(Likes)
admin.site.register(MusicHistory)
admin.site.register(FavoriteGender)
admin.site.register(FavoriteArtist)
admin.site.register(Playlist)
admin.site.register(LogIn)
