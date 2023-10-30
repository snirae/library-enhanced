from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'description', 'year')

 
class CreateBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title', 'author', 'description', 'year')


class SearchBookSerializer(serializers.Serializer):
    class Meta:
        model = Book
        fields = ('title', 'author', 'description', 'year', 'owned')
