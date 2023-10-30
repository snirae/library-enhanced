from django.db import models


class Book(models.Model):
    id = models.CharField(max_length=200, primary_key=True, default="CustomDefaultValue")
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(null=True)
    year = models.IntegerField(null=True)

    # date_added = models.DateTimeField(auto_now_add=True)
    # thumbnail = models.ImageField(upload_to='book_thumbnails/', blank=True, null=True)

    def save(self, *args, **kwargs):
        # Automatically set title_author by concatenating title and author
        self.id = self.title + '-' + self.author
        super().save(*args, **kwargs)
