# Generated by Django 4.1 on 2023-10-25 13:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_book_thumbnail"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="thumbnail",
        ),
    ]
