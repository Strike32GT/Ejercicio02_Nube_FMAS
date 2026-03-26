from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]