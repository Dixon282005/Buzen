from django.urls import path
from .views import LoginView, RegisterView, Home #El punto hace referencia  a la carpeta actual
from django.urls import path, include


urlpatterns = [
    #path('', views.index, name='index'),
    #path('', views.index, name='lobby'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('home/', Home.as_view, name='home'),

]





