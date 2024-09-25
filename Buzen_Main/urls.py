from django.urls import path
from . import views #El punto hace referencia  a la carpeta actual

urlpatterns = [
    path('', views.index, name='index'),
    
]


