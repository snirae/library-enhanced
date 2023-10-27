from django.shortcuts import render, HttpResponse, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.files import File
from django.http import JsonResponse
from .models import Book
from .search_books import google_book_info


@csrf_exempt
def home(request, sort_by='author'):
    if request.method == 'POST':
        search_query = request.POST.get('search')
        search_results = Book.objects.filter(title__icontains=search_query)
    else:
        search_results = Book.objects.all()
    
    if sort_by == 'title':
        search_results = search_results.order_by('title')
    elif sort_by == 'author':
        search_results = search_results.order_by('author')

    return render(request, 'home.html', {'books': search_results, 'is_home': True})

@csrf_exempt
def search(request):
    if request.method == 'POST':
        search_query = request.POST.get('search')
        search_results = google_book_info(search_query)
        for b in search_results:
            t_a = b['title_author']
            if Book.objects.filter(title_author=t_a).exists():
                b['owned'] = True
    else:
        search_results = []

    return render(request, 'search.html', {'books': search_results, 'is_home': False})

@csrf_exempt
def add_book(request, title, author, description):
    book = Book(
        title_author=title + author,
        title=title,
        author=author,
        description=description,
        owned=True
    )

    if Book.objects.filter(title_author=book.title_author).exists():
        return JsonResponse({'message': 'Book already exists'})
    
    book.save()
    return render_current(request)

@csrf_exempt
def remove_book(request, title_author):
    try:
        book = Book.objects.get(pk=title_author)
        book.delete()
        
        return render_current(request)
    except Book.DoesNotExist:
        return JsonResponse({'message': 'Book not found'}, status=404)


def render_current(request, from_search=False):
    request.method = 'GET'
    if from_search:
        return search(request)
    else:
        return home(request)
    # current_url_name = request.resolver_match.url_name
    # if current_url_name == 'home':
    #     return home(request)
    # elif current_url_name == 'search':
    #     return search(request)
    # else:
    #     print(current_url_name)
