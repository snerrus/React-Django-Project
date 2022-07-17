# from django.shortcuts import render

# Create your views here.
import json
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
# from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .serializer import *
from .models import *

class EmployeeView(APIView):
    serializer_class = EmployeeSerializer
    # parser_classes = (JSONParser)

    def get(self, request):
        employee = [{"id":employee.id,"firstname" : employee.firstname,"lastname" : employee.lastname,"email" : employee.email,"phone" : employee.phone}
        for employee in Employee.objects.all()]
        return Response(employee)
    
    def post(self, request):
        serializer = EmployeeSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def delete(self, request):
        print(request.data)
        pk = request.data["id"]
        instance = Employee.objects.get(pk=pk)
        instance.delete()
        
        # print(employee)
        return Response("Deleted user!")


class Editemployee(APIView):
    serializer_class = EmployeeSerializer

    def post(self, request):
        print(request.data)
        id = request.data['id']
        instance = Employee.objects.get(id = id)
        instance.firstname = request.data['firstname']
        instance.lastname = request.data['lastname']
        instance.email = request.data['email']
        instance.phone = request.data['phone']
        instance.save()
        data = {'message': "success"}
        return Response(data)

@api_view(['POST'])
def edit_details(request):
        print(request.data)
        pk = request.data["id"]
        instance = Employee.objects.get(pk=pk)
        data = {'id':instance.id, 'firstname':instance.firstname, 'lastname' : instance.lastname, 'email': instance.email, 'phone': instance.phone}
        
        # if data.is_valid():
        #     data.save()
        print(data)
        return Response(data)
        # else:
        #     return Response(status=status.HTTP_404_NOT_FOUND)


# class DeleteEmployee(APIView):
#     serializer_class = EmployeeSerializer

@api_view(['POST'])
def delete_details(request):
    pk = request.data["id"]
    instance = Employee.objects.get(pk=pk)
    instance.delete()
    
    # print(employee)
    return Response("Deleted user!")
