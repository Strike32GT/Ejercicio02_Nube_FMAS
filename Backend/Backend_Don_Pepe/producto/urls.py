from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]