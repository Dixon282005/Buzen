from ..models import Music, Artist, Album, Gender
from .jamendo import get_tracks
from django.db import transaction

def get_or_create_music(jamendo_id):
    """
    Busca una canción en la DB por jamendo_id.
    Si no existe, la trae de Jamendo, crea artista/álbum/género si es necesario,
    la guarda en DB y devuelve el objeto Music.
    """
    # 1️⃣ Buscar en DB
    music = Music.objects.filter(jamendo_id=jamendo_id).first()
    if music:
        return music

    # 2️⃣ Traer de Jamendo
    tracks = get_tracks(limit=50)  # ajustar el limit según tus necesidades
    track_data = next((t for t in tracks.get("results", []) if t["id"] == jamendo_id), None)
    if not track_data:
        return None  # canción no encontrada en Jamendo

    # 3️⃣ Crear en DB de forma atómica
    with transaction.atomic():
        # Artista
        artist_name = track_data.get("artist_name") or "Unknown Artist"
        artist, _ = Artist.objects.get_or_create(
            artist_name=artist_name,
            defaults={"client": None}  # puede ser nulo
        )

        # Álbum
        album_name = track_data.get("album_name")
        album = None
        if album_name:
            album, _ = Album.objects.get_or_create(
                name=album_name,  # <-- aquí debe ser 'name', no 'album_name'
                artist=artist
            )

        # Género
        genre_tags = track_data.get("musicinfo", {}).get("tags", [])
        genre = None
        if genre_tags:
            genre_name = genre_tags[0]  # tomar primer tag
            genre, _ = Gender.objects.get_or_create(name=genre_name)

        # Crear la canción
        music = Music.objects.create(
            jamendo_id=track_data["id"],
            title=track_data["name"],
            artist=artist,
            album=album,
            duration=track_data.get("duration"),
            gender=genre,
            release_date=track_data.get("releasedate"),
            audio_url=track_data.get("audio")
        )

    return music
