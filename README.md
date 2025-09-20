Buzen – Documentación de API y WebSocket
🔹 Descripción

Buzen es una aplicación de musica con chat en tiempo real y funcionalidades sociales (registro, login, perfiles y likes).
La comunicación de chat se realiza mediante WebSockets con Django Channels.

🔹 Instalación rápida
# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
.venv\Scripts\activate      # Windows

# Instalar dependencias
pip install -r requirements.txt

# Migrar base de datos
python manage.py migrate

# Correr servidor ASGI (daphne)
daphne -p 8000 Buzen.asgi:application

🔹 Endpoints HTTP
1. Registro de usuario
POST /register/


Request JSON:

{
  "username": "usuario1",
  "email": "usuario1@email.com",
  "password": "tu_password_segura"
}


Response JSON:

{
  "id": 1,
  "username": "usuario1",
  "email": "usuario1@email.com",
  "message": "Usuario creado exitosamente"
}

2. Login
POST /login/


Request JSON:

{
  "username": "usuario1",
  "password": "tu_password_segura"
}


Response JSON:

{
  "access": "<token_de_acceso>",
  "refresh": "<token_refresh>"
}


Header para endpoints protegidos:

Authorization: Bearer <token_de_acceso>

3. Home
GET /home/


Headers:

Authorization: Bearer <token_de_acceso>


Response JSON:

{
  "welcome": "Bienvenido, usuario1",
  "chats": ["room1", "room2"]
}

4. Profile
GET /profile/


Headers:

Authorization: Bearer <token_de_acceso>


Response JSON:

{
  "username": "usuario1",
  "email": "usuario1@email.com",
  "bio": "Esto es mi bio",
  "joined_at": "2025-09-20T12:00:00Z"
}

5. Likes
POST /likes/


Request JSON:

{
  "target_user": "usuario2"
}


Response JSON:

{
  "status": "success",
  "message": "Has dado like a usuario2"
}

🔹 WebSocket – Chat en tiempo real
ws://127.0.0.1:8000/ws/chat/<room_name>/

Conexión

<room_name>: nombre de la sala o ID de chat.

Enviar mensaje
{
  "message": "Hola, ¿cómo estás?",
  "receiver": "usuario2"   // opcional para chat 1 a 1
}

Recibir mensaje
{
  "message": "Hola, ¿cómo estás?",
  "sender": "usuario1",
  "receiver": "usuario2"
}


⚠️ receiver se omite si es chat grupal.

🔹 Notas importantes

Todos los endpoints que requieren autenticación usan JWT (Bearer token).

Para desarrollo se utiliza InMemoryChannelLayer de Django Channels. Para producción se recomienda Redis.

Mensajes guardados en DB se registran con seen=False por defecto