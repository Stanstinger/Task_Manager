from django.shortcuts import render
from django.http import JsonResponse
from api.models import User, Task
from django.shortcuts import get_object_or_404

from api.serializer import RegisterSerializer, MyTokenObtainPairSerializer, TaskSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndpoint(request):
    if request.method == "GET":
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        text = request.POST.get("text")
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)



class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        task = Task.objects.filter(user=user)


        return task


      

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        task_id = self.kwargs['task_id']

        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id, user=user)

        return task
    


class TaskMarkAsCompleted(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        task_id = self.kwargs['task_id']

        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id, user=user)

        task.completed = True
        task.save()

        return task   