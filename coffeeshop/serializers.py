from rest_framework import serializers
from django.db.models import QuerySet
from .models import Order, Table, Category, Drink
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import pagination

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        extra_kwargs = {
            "id": {"read_only": True} 
        }

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id', 'name', 'ordered', 'current_order_id')
        extra_kwargs = {
             "name": {"read_only": True},
             "id" : {"read_only": True}
        }

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("__all__")
class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ("__all__")

class OrdersPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10

class TotalOrderSerializer(serializers.Serializer):
    ordered_at = serializers.DateField()
    amount = serializers.IntegerField()
    total = serializers.IntegerField()