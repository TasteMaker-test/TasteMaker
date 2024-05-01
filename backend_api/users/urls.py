from django.urls import path

from .views import UserCreateView, UserRUDView

urlpatterns = [
    path('api/register', UserCreateView.as_view(), name='register'),
    path('api/user-detail/<int:pk>/', UserRUDView.as_view(), name='user-detail'),
]
