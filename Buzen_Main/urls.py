from django.urls import path
from . import views #El punto hace referencia  a la carpeta actual
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    #path('', views.index, name='index'),
    #path('', views.index, name='lobby'),
    path('login/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]


