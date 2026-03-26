from rest_framework.routers import DefaultRouter
from .views import VentaViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'ventas', VentaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]