from django.urls import path
from . import views

urlpatterns = [
    path('books', views.BookView.as_view()),
    path('create-book', views.CreateBookView.as_view()),
    path('remove-book', views.RemoveBookView.as_view()),
]