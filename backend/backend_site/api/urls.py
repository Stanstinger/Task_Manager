from rest_framework_simplejwt.views import (TokenRefreshView, )
from django.urls import path 
# from api import views
from . import views
from .views import TaskListView





urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path('test', views.testEndpoint, name='test'),
    path('', views.getRoutes),
    path('task/', TaskListView.as_view(), name='task-list'),

   

   #Task URLS

   path("task/<user_id>/", views.TaskListView.as_view()),
   path("task-detail/<user_id>/<task_id>/", views.TaskDetailView.as_view()),
   path("task-mark-as-completed/<user_id>/<task_id>/", views.TaskMarkAsCompleted.as_view()),
]