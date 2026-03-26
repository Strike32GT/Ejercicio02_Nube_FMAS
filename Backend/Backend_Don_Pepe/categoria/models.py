from django.db import models

# Create your models here.
class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    description = models.CharField(max_length=255, blank=True, null=True)
    estado = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return self.nombre