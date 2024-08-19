from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from .serillizers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
# import numpy as np


class LoginAPIView(GenericAPIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # if not email or not password:
        #     return Response({'error': 'email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        
        if user:
            token,_ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):

    if request.method == 'POST':
        request.data['username'] = 'user'
        
        password = request.data.get("password")
        hash_password = make_password(password)
        request.data['password'] = hash_password
        serializer = Userserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('user created')
        else:
            return Response(serializer.errors)
        
        
        
        
class ProfileApiView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user

        # Serialize user data
        user_data = {
            'username': user.username,
            'email': user.email,
        }

        return Response(user_data, status=status.HTTP_200_OK)
    

from rest_framework.decorators import api_view
from rest_framework.response import Response
import numpy as np
import pandas as pd
import joblib

# Load datasets
sym = pd.read_csv(r"C:\\Users\\Asus\\Desktop\\finalyearproject_diseasepredicition\\Backend\\dataset\\Symptom-severity.csv")
sym['Symptom'] = sym['Symptom'].str.replace('_', ' ')
desc = pd.read_csv(r'C:\\Users\\Asus\\Desktop\\finalyearproject_diseasepredicition\\Backend\\dataset\\symptom_Description.csv')
prev = pd.read_csv(r'C:\\Users\\Asus\\Desktop\\finalyearproject_diseasepredicition\\Backend\\dataset\\symptom_precaution.csv')

# Load the model
cls = joblib.load('ExtraTrees.pkl')
print(cls)

# Print the model's parameters
print(cls.get_params())

if hasattr(cls, 'feature_importances_'):
    print(cls.feature_importances_)
else:
    print("The model does not have feature_importances_ attribute.")

# Test prediction with dummy data
dummy_data = np.zeros((1, 222))  # Assuming the model expects 7 features
prediction = cls.predict(dummy_data)
print(f"Test prediction: {prediction}")

@permission_classes ([AllowAny])
def predictions(symptoms):
    # Debugging line to check the type of symptoms
    print(f"Type of symptoms: {type(symptoms)}")
    
    # Ensure it's a list
    if not isinstance(symptoms, list):
        raise ValueError(f"Expected a list of symptoms, but got {type(symptoms)}")

    # Convert symptoms to weights
    l = symptoms + ['vomiting'] * (7 - len(symptoms))
    x = np.array(sym['Symptom'])
    y = np.array(sym['weight'])
    
    # Convert symptoms to their corresponding weights
    l = [y[np.where(x == symptom)[0][0]] for symptom in l]
    
    # Predict the disease
    res = [l]
    pred = cls.predict(res)
    return pred[0]


@permission_classes ([AllowAny])
@api_view(['GET'])
def predict_disease(request):
    symptoms = request.GET.getlist('queue[]')  # Get the list of symptoms from the request

    # Debugging line: print the symptoms list to console
    print(f"Symptoms: {symptoms}")  # This should print a list of symptoms

    # Ensure symptoms is a list and not None
    if not symptoms or not isinstance(symptoms, list):
        return Response({'error': 'Invalid input. Please provide a list of symptoms.'}, status=400)

    # Check the length of the symptoms list
    if len(symptoms) < 3 or len(symptoms) > 7:
        return Response({'error': 'Please provide between 3 to 7 symptoms.'}, status=400)

    try:
        disease = predictions(symptoms)
        description = desc[desc['Disease'] == disease]['Description'].iloc[0]
        precautions = prev[prev['Disease'] == disease].iloc[0]
        
        precaution1 = precautions['Precaution_1']
        precaution2 = precautions['Precaution_2']
        precaution3 = precautions.get('Precaution_3', None)
        precaution4 = precautions.get('Precaution_4', None)
        
        response_data = {
            'disease': disease,
            'description': description,
            'precaution1': precaution1,
            'precaution2': precaution2,
            'precaution3': precaution3,
            'precaution4': precaution4,
        }

        return Response(response_data)
    
    except Exception as e:
        # Catch and log any exception that occurs during the prediction process
        print(f"An error occurred: {e}")
        return Response({'error': 'An error occurred during the prediction process. Please try again later.'}, status=500)
