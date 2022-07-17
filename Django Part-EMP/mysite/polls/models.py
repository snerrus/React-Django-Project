from django.db import models

# Create your models here.

class Employee(models.Model):
    firstname = models.CharField(max_length= 32)
    lastname  = models.CharField(max_length= 32)
    email     = models.EmailField()
    phone     = models.CharField(max_length= 13)
