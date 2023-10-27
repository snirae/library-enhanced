from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('/<str:sort_by>/', views.home, name='home'),
    path('search/', views.search, name='search'),
    path('add_book/<str:title>/<str:author>/<str:description>/', views.add_book, name='add_book'),
    path('remove_book/<str:title_author>/', views.remove_book, name='remove_book'),
]