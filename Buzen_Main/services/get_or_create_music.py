from ..models import Music, Artist, Album, Gender
from .jamendo import get_track_by_id
from django.db import transaction
from datetime import datetime

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

    # 2️⃣ Traer solo esa canción desde Jamendo
    track_data = get_track_by_id(jamendo_id)
    if not track_data:
        return None  # Canción no encontrada

    # 3️⃣ Crear en DB de forma atómica
    with transaction.atomic():
        # Artista
        artist_name = track_data.get("artist_name") or "Unknown Artist"
        artist, _ = Artist.objects.get_or_create(
            artist_name=artist_name,
            defaults={"client": None}
        )

        # Álbum
        album_name = track_data.get("album_name")
        album = None
        if album_name:
            album, _ = Album.objects.get_or_create(
                name=album_name,
                artist=artist
            )

        # Género
        genre = None
        tags = track_data.get("musicinfo", {}).get("tags", [])
        if tags:
            genre_name = tags[0]
            genre, _ = Gender.objects.get_or_create(name=genre_name)

        # Fecha de lanzamiento
        release_date = None
        raw_date = track_data.get("releasedate")
        if raw_date:
            try:
                release_date = datetime.strptime(raw_date, "%Y-%m-%dT%H:%M:%S").date()
            except ValueError:
                pass  # si falla el parseo, lo dejamos en None

        # Crear canción
        music = Music.objects.create(
            jamendo_id=track_data["id"],
            title=track_data["name"],
            artist=artist,
            album=album,
            duration=track_data.get("duration"),
            gender=genre,
            release_date=release_date,
            audio_url=track_data.get("audio")
        )

    return music
