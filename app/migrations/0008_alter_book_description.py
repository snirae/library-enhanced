# Generated by Django 4.1 on 2023-10-30 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0007_book_year"),
    ]

    operations = [
        migrations.AlterField(
            model_name="book",
            name="description",
            field=models.TextField(null=True),
        ),
    ]
