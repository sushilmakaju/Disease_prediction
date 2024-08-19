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
    

import pickle
import pandas as pd
from sklearn.ensemble import ExtraTreesClassifier

# Load the model from the file
with open('ExtraTrees.pkl', 'rb') as file:
    model = pickle.load(file)
    print(model)
    # Print model attributes
    print(model.get_params())  # Print hyperparameters of the model
    print("Number of trees:", len(model.estimators_))# Print number of trees in the ensemble
    
    feature_names = [ 'itching', 'skin_rash', 'nodal_skin_eruptions', 
                     'continuous_sneezing', 
                     'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 
                     'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 
                     'burning_micturition', 'fatigue', 'weight_gain', 
                     'anxiety', 'cold_hands_and_feets', 'mood_swings', 
                     'weight_loss', 'restlessness', 'lethargy', 
                     'patches_in_throat', 'irregular_sugar_level', 
                     'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 
                     'sweating', 'dehydration', 'indigestion', 'headache', 
                     'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 
                     'pain_behind_the_eyes', 'back_pain', 'constipation', 
                     'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 
                     'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 
                     'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 
                     'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 
                     'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 
                     'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 
                     'pain_during_bowel_movements', 'pain_in_anal_region', 
                     'bloody_stool', 'irritation_in_anus', 'neck_pain', 
                     'dizziness', 'cramps', 'bruising', 'obesity', 
                     'swollen_legs', 'swollen_blood_vessels', 
                     'puffy_face_and_eyes', 'enlarged_thyroid', 
                     'brittle_nails', 'swollen_extremeties', 
                     'excessive_hunger', 'extra_marital_contacts', 
                     'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxiclook(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']


    t = pd.Series([0] * len(feature_names), index=feature_names)
    
    # Set specific symptoms to 1
    
    t.loc["chest_pain"] = 1
    t.loc["phlegm"] = 1
    t.loc["runny_nose"] = 1
    t.loc["high_fever"] = 1
    t.loc["throat_irritation"] = 1
    t.loc["congestion"] = 1
    t.loc["redness_of_eyes"] = 1
    
    # Convert to numpy array and reshape
    t = t.to_numpy().reshape(1, -1)
    
        # Make prediction
    prediction = model.predict(t)

#     print("Prediction:", prediction)

