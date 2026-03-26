from django.db import models
from cliente.models import Cliente

# Create your models here.

class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True, related_name='ventas')
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)


    class Meta:
        db_table = 'venta'


    def __str__(self):
        return f"Venta {self.id_venta} - Cliente: {self.cliente}"