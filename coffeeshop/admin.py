from django.contrib import admin
from .models import Drink, Order, Table, Category

# Register your models here.
admin.site.register(Drink)
admin.site.register(Order)
admin.site.register(Table)
admin.site.register(Category)
