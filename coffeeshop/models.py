import datetime

from django.db import models
from django.db.models import Sum, F
from django.utils import timezone

# Create your models here.

class Order(models.Model):
    content = models.TextField(blank=True,null=True)
    drink = models.TextField(blank=True, null=True)
    total = models.IntegerField(null=True, blank=True)
    ordered_at = models.DateTimeField('order_timestamp', auto_now_add=True)
    def __str__(self):
        return repr(dict(id=self.id, ordered_at=self.ordered_at,
            total=self.total))
    

class Table(models.Model):
    name = models.CharField(max_length=20)
    ordered = models.BooleanField(default=False)
    current_order_id = models.ForeignKey(Order,on_delete=models.PROTECT,null=True, blank=True)
    def __str__(self):
       return self.name
    

class Category(models.Model):
	name = models.CharField(max_length=20, unique=True)
	def __str__(self):
		return self.name

class Size(models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.name

class Drink(models.Model):
    name = models.CharField(max_length=20, unique=True, null=True)
    image = models.ImageField(null=True, blank=True)
    price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True)

    def __str__(self):
        # return self.drink_type.name + "_" + self.size.name
        return repr(dict(id=self.id, category=self.category.name,
            price=self.price))


