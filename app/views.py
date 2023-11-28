from tkinter import N
from .models import Book
from django.db import models
from rest_framework.response import Response
from .serializers import BookSerializer, CreateBookSerializer, SearchBookSerializer
from rest_framework.views import APIView
from rest_framework import generics
from django.http import HttpResponse as HTTPResponse
from .search_books import google_book_info

from .distilbert.embedding_model import EmbeddingModel


model = EmbeddingModel()
embeddings_mean = Book.objects.all().aggregate(models.Avg('embedding'))

# app/books
class BookView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get(self, request, format=None):
        search_query = request.GET.get('search')
        if search_query:
            search_results_title = Book.objects.filter(title__icontains=search_query)
            search_results_author = Book.objects.filter(author__icontains=search_query)
            search_results = search_results_title.union(search_results_author)
        else:
            search_results = Book.objects.all()
        
        return Response(BookSerializer(search_results, many=True).data)


# app/create-book
class CreateBookView(APIView):
    serializer_class = CreateBookSerializer

    def post(self, request, format=None):
        serializer = CreateBookSerializer(data=request.data)

        if serializer.is_valid():

            print('\n\n\n')
            print(serializer.data)
            print('\n\n\n')

            title = serializer.data.get('title')
            author = serializer.data.get('author')
            description = serializer.data.get('description')
            year = serializer.data.get('year')

            if Book.objects.filter(title=title, author=author).exists():
                # update the book
                book = Book.objects.get(title=title, author=author)
                book.description = description
                book.year = year
                book.save(update_fields=['description', 'year'])

                # update the embedding
                if description and description.isascii():
                    book.embedding = model.embed(description).numpy().tobytes()
                    book.save(update_fields=['embedding'])

                return Response(BookSerializer(book).data)
            else:
                # create the book
                book = Book.objects.create(title=title, author=author, description=description, year=year)
                return Response(BookSerializer(book).data)
        else:
            print('not valid')
            

# app/remove-book
class RemoveBookView(APIView):
    serializer_class = CreateBookSerializer

    def post(self, request, format=None):
        serializer = CreateBookSerializer(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            author = serializer.data.get('author')

            if Book.objects.filter(title=title, author=author).exists():
                # remove the book
                book = Book.objects.get(title=title, author=author)
                book.delete()
                return Response(self.serializer_class(book).data)
            
        return HTTPResponse('Method Not Allowed', status=405)
    

# app/search-book
class SearchBookView(APIView):
    serializer_class = SearchBookSerializer

    def get(self, request, format=None):
        search_query = request.GET.get('search')
        if search_query:
            search_results = google_book_info(search_query)

            # add the embeddings
            for book in search_results:
                if book['description'] and book['description'].isascii() and embeddings_mean['embedding__avg']:
                    book['similarity'] = model.similarity(model.embed(book['description']).numpy(), embeddings_mean['embedding__avg'])
                else:
                    book['similarity'] = None
        else:
            # empty search results
            search_results = Book.objects.none()
        
        return Response(search_results)


# app/upload-csv
class UploadCSVView(APIView):
    serializer_class = CreateBookSerializer

    def post(self, request, format=None):
        file = request.FILES['csvFile']
        try:
            if file.name.endswith('.csv'):
                # read the csv file
                file_data = file.read().decode('utf-8')
                lines = file_data.splitlines()
                for line in lines:
                    if line:
                        # split the line by comma
                        values = line.split(',')
                        title = values[0]
                        author = values[1]
                        description = values[2] if len(values) > 2 else None
                        year = values[3] if len(values) > 3 else None                        
                        # create the book if it doesn't exist
                        if not Book.objects.filter(title=title, author=author).exists():
                            book = Book.objects.create(title=title, author=author, description=description, year=year)
                            book.save()
                            
                            # update the embedding
                            if description and description.isascii():
                                book.embedding = model.embed(description).numpy().tobytes()
                                book.save(update_fields=['embedding'])

                return Response('File uploaded successfully')
            else:
                return Response('File format not supported')
        except Exception as e:
            return Response('Error occurred while uploading file: ' + str(e))
