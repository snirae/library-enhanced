from .models import Book
from rest_framework.response import Response
from .serializers import BookSerializer, CreateBookSerializer, SearchBookSerializer
from rest_framework.views import APIView
from rest_framework import generics
from django.http import HttpResponse as HTTPResponse
from .search_books import google_book_info


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
            title = serializer.data.get('title')
            author = serializer.data.get('author')
            description = serializer.data.get('description')
            year = serializer.data.get('year')

            if Book.objects.filter(title=title, author=author).exists():
                # update the book
                book = Book.objects.get(title=title, author=author)
                book.description = description
                book.save(update_fields=['description', 'year'])
                return Response(BookSerializer(book).data)
            else:
                # create the book
                book = Book.objects.create(title=title, author=author, description=description, year=year)
                return Response(BookSerializer(book).data)
            

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

            # return python dictionary as json
            return Response(search_results)
        else:
            # empty search results
            search_results = Book.objects.none()
        
        return Response(self.serializer_class(search_results, many=True).data)
