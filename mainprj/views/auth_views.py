from rest_framework.generics import GenericAPIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password
from mainprj.serillizers import *

class LoginAPIView(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_role': user.role 
                })
        # print(f"User Role: {user.role}")
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        password = request.data.get("password")
        request.data['password'] = make_password(password)

        serializer = Userserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('User created successfully', status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DoctorRegisterView(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Make a mutable copy of the request data
        data = request.data.copy()

        # Get the password and hash it
        password = data.get("password")
        if password:
            data['password'] = make_password(password)

        # Now pass the modified data to the serializer
        serializer = Doctorserializers(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response('User created successfully', status=status.HTTP_201_CREATED)
        
        # Log and return serializer errors to get more insight
        print(serializer.errors)  # Debugging line: Logs the validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)