import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import Buzen_Chat.socketsurl  # nuestras rutas de WebSocket

# Indicamos el settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Buzen.settings")

# Configuración principal ASGI
application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Maneja HTTP normal
    "websocket": AuthMiddlewareStack(  # Maneja WebSockets con autenticación
        URLRouter(
            Buzen_Chat.socketsurl.websocket_urlpatterns
        )
    ),
})
