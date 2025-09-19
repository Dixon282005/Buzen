import requests
from django.conf import settings

BASE_URL = "https://api.jamendo.com/v3.0"

def get_tracks(limit=10):
    params = {
        "client_id": settings.JAMENDO_CLIENT_ID,
        "format": "json",
        "limit": limit
    }
    response = requests.get(f"{BASE_URL}/tracks", params=params)
    response.raise_for_status()  # lanza error si falla
    return response.json()
