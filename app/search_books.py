import requests
from .models import Book


def google_book_info(title):
    url = f'https://www.googleapis.com/books/v1/volumes?q={title}'#+inauthor:{title}'
    response = requests.get(url)
    if response.status_code == 200:
        lst = []
        for item in response.json().get('items', []):
            t = item['volumeInfo']
            
            res_dict = {'title': t['title'],
                        'author': t.get('authors', ['Not Available.'])[0],
                        'year': t['publishedDate'][:4],
                        'description': t.get('description', 'Not Available.'),
                        }
            res_dict['id'] = res_dict['title'] + '-' + res_dict['author']
            res_dict['owned'] = Book.objects.filter(id=res_dict['id']).exists()
            lst.append(res_dict)
        return lst
    else:
        return None


# def fetch_book_thumbnail(url):
#     img_response = requests.get(url)
#     img_temp = NamedTemporaryFile(delete=True)
#     img_temp.write(img_response.content)
#     img_temp.flush()

#     return img_temp
