from rest_framework import serializers
from .models import Categoria

class CategoriaSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre', 'descripcion', 'estado', 'created_at']