import requests
from django.conf import settings

BASE_URL = "https://api.jamendo.com/v3.0"

def get_tracks(limit=10):
    """
    Obtiene una lista de canciones desde Jamendo.
    """
    params = {
        "client_id": settings.JAMENDO_CLIENT_ID,
        "format": "json",
        "limit": limit
    }
    response = requests.get(f"{BASE_URL}/tracks", params=params)
    response.raise_for_status()
    return response.json()


def get_track_by_id(track_id):
    """
    Obtiene una sola canción de Jamendo usando su ID.
    Retorna un diccionario con los datos de la canción o None si no existe.
    """
    params = {
        "client_id": settings.JAMENDO_CLIENT_ID,
        "format": "json",
        "id": track_id
    }
    response = requests.get(f"{BASE_URL}/tracks", params=params)
    response.raise_for_status()
    data = response.json()
    results = data.get("results", [])
    return results[0] if results else None
