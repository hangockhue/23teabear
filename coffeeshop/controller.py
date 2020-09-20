from django.shortcuts import render
from django.core import serializers
from rest_framework import status, viewsets, views
from .models import Order, Table, Category, Drink
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import (OrderSerializer, TableSerializer, CategorySerializer, 
DrinkSerializer, OrdersPagination,TotalOrderSerializer)
from rest_framework.parsers import JSONParser 
from rest_framework import generics, permissions, mixins, viewsets
from knox.models import AuthToken

from django.db.models import Count, Sum

from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination

class ProductViewSet(generics.GenericAPIView,
                    mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    ):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Drink.objects.all()    
    serializer_class = DrinkSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CategoryViewSet(generics.GenericAPIView,
                    mixins.ListModelMixin,
                    ):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class TableViewSet(generics.GenericAPIView,
                mixins.ListModelMixin,):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class TableDetailViewSet(generics.GenericAPIView,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

# Order

class OrderViewSet(generics.GenericAPIView,
                mixins.ListModelMixin,
                mixins.CreateModelMixin
                ):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class OrderDetailViewSet(generics.GenericAPIView,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin
                        ):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class OrderRecordsView(generics.ListAPIView):
    
    queryset = Order.objects.filter(table=None)
    serializer_class = OrderSerializer
    pagination_class = OrdersPagination

class OrderTotalDateViewSet(views.APIView):

    def get(self, request):

        # queryset = Order.objects.values('ordered_at').distinct()
        
        queryset = Order.objects.filter(table=None).values('ordered_at')
        addkey = queryset.annotate(amount=Sum('total')).annotate(total=Count('ordered_at'))
        results = []
        
        for i in addkey:
            results.append(i)
        #Pagination
        paginator = PageNumberPagination()
        paginator.page_size = 5
        result_page = paginator.paginate_queryset(results, request)
        
        return paginator.get_paginated_response(results)




# class TotalDate(generics.GenericAPIView,
#                     mixins.ListModelMixin,
#                     ):
#     queryset = Order.objects.values('ordered_at').distinct()
#     serializer_class = TotalDateSerializer
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

# Old api rest-ful
# @api_view(['GET', 'PUT'])
# def TableDetailView(request, pk):
#     try:
#         table = Table.objects.get(pk=pk)
#     except Table.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = TableSerializer(table)
#         return Response(serializer.data)
#     if request.method == 'PUT':
#         serializer = TableSerializer(table, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# #Product 
# @api_view(['GET', 'POST'])
# def ProductView(request):
#     if request.method == "GET":
#         products = Drink.objects.all()
#         serializer = DrinkSerializer(products, many=True)
#         return Response(serializer.data)

