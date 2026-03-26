from django.db import models

# Create your models here.
class Cliente(models.Model) :
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    estado = models.BooleanField(default=True)


    class Meta:
        db_table = 'cliente'



    def __str__(self):
        return self.nombre