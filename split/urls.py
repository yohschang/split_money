from django.urls import path
from . import views

from . import views

urlpatterns = [
    path('group-list/', views.GroupList, name='group-list'),
    path('group-list/<str:id>/', views.GroupDetial, name='group-detial'),
    path('group-create/', views.GroupCreate, name='group-create'),
    path('group-update/<str:id>/', views.GroupUpdate, name='group-update'),
    path('group-delete/<str:id>/', views.GroupDelete, name='group-Delete'),
    path('group-delete/<str:Gid>/<str:Aid>/',
         views.ActivityDelete, name='Activity-Delete'),

    path('user-list/', views.UserList, name='user-detial'),
    path('user-list/<str:id>/', views.UserDetial, name='user-detial'),
    path('user-create/', views.UserCreate, name='user-create'),
    path('user-update/<str:id>/', views.UserUpdate, name='user-update'),
    path('user-delete/<str:id>/', views.UserDelete, name='user-Delete'),
]
