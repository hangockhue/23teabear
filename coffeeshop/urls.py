from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
from . import controller

# router = routers.DefaultRouter()
# router.register('/orders', views.OrderView, base_name="order")

urlpatterns = [
    # url(r'^api/order/$', views.OrderView),
    path('api/order/', views.OrderView, name='order'),
    path('api/order/<int:pk>', views.OrderDetailView, name='orderdetail'),
    path('api/tables/', controller.TableViewSet.as_view(), name="tables"),
    path('api/tables/<int:pk>', controller.TableDetailViewSet.as_view(), name='tabledetailview'),
    path('api/categorys/', controller.CategoryViewSet.as_view(), name="category"),
    path('api/products/', controller.ProductViewSet.as_view(), name="product"),
    path('api/orders/', controller.OrderRecordsView.as_view(), name="orderrecord"),
]