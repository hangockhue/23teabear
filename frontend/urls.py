from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('box', views.box),
    path('inbox', views.inbox)
]