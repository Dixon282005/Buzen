import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Únete al grupo
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        await self.send(text_data=json.dumps({
            "message": f"Conectado a la sala {self.room_name}"
        }))

    async def disconnect(self, close_code):
        # Sal de la sala
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """Recibir mensaje del cliente y rebotarlo a la sala"""
        data = json.loads(text_data)
        message = data.get("message", "")

        # Difundir el mensaje al grupo
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
            }
        )

    async def chat_message(self, event):
        """Recibir mensaje del grupo y enviarlo al cliente"""
        await self.send(text_data=json.dumps({
            "message": event["message"]
        }))
