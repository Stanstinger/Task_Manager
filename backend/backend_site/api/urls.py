from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path 
from api import views
from . import views





urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path('test', views.testEndpoint, name='test'),
    path('', views.getRoutes),
   
]