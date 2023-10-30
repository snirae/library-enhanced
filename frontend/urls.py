from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('search', index),
    path('add-book', index),
]
