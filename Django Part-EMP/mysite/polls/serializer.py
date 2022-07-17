from dataclasses import field
from pyexpat import model
from rest_framework import serializers

from .models import *

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ("id","firstname", "lastname","email", "phone")