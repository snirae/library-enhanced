# Generated by Django 4.1 on 2023-11-28 11:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0009_book_embedding"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="embedding",
        ),
    ]