# Generated by Django 2.0.7 on 2020-09-12 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coffeeshop', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='drinktype',
            name='category',
        ),
        migrations.AlterField(
            model_name='drink',
            name='price',
            field=models.IntegerField(),
        ),
        migrations.DeleteModel(
            name='DrinkType',
        ),
    ]
