# Generated by Django 4.1 on 2023-10-25 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_remove_book_id_book_owned_book_title_author"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="thumbnail",
            field=models.ImageField(
                blank=True, null=True, upload_to="book_thumbnails/"
            ),
        ),
    ]
