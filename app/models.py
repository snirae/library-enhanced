from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField()
    owned = models.BooleanField(default=False)
    title_author = models.CharField(max_length=200, primary_key=True, default="CustomDefaultValue")

    # thumbnail = models.ImageField(upload_to='book_thumbnails/', blank=True, null=True)

    def save(self, *args, **kwargs):
        # Automatically set title_author by concatenating title and author
        self.title_author = self.title + self.author
        super().save(*args, **kwargs)
