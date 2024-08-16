from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=200, default='User')
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
class diseaseinfo(models.Model):

    user = models.ForeignKey(User , null=True, on_delete=models.SET_NULL)

    diseasename = models.CharField(max_length = 200)
    no_of_symp = models.IntegerField()
    symptomsname = models.CharField(max_length=200, default='')
    confidence = models.DecimalField(max_digits=5, decimal_places=2)
    
