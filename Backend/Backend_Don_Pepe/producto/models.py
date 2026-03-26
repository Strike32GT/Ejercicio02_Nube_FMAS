from django.db import models
from categoria.models import Categoria
# Create your models here.
class Producto(models.Model): 
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name='productos', db_column='id_categoria')
    estado = models.BooleanField(default=True)


    class Meta:
        db_table = 'producto'




    def __str__(self):
        return self.nombre