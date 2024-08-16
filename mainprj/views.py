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
import numpy as np


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
    

# import joblib as jb

# import sklearn
# print("Version : ",sklearn.__version__)

# try:
#     model = jb.load('trained_model.sav')
#     print("Model loaded successfully:", model)
# except Exception as e:
#     print("Error loading model:", e)


# class checkDisease(APIView):
    
#     def post(self, request):
#         symptomslist = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 
#                         'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 
#                         'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 
#                         'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 
#                         'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 
#                         'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 
#                         'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 
#                         'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 
#                         'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 
#                         'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 
#                         'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 
#                         'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 
#                         'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 
#                         'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 
#                         'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 
#                         'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 
#                         'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 
#                         'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 
#                         'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine', 'continuous_feel_of_urine', 
#                         'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 
#                         'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 
#                         'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite', 
#                         'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 
#                         'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 
#                         'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 
#                         'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 
#                         'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 
#                         'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 
#                         'red_sore_around_nose', 'yellow_crust_ooze']
        
#         try:
#             inputno = int(request.data.get("noofsym", 0))
            
#             if inputno == 0:
#                 return Response({'predicteddisease': "none", 'confidencescore': 0}, status=status.HTTP_200_OK)

#             psymptoms = request.data.getlist("symptoms[]", [])
#             if not psymptoms:
#                 return Response({'error': 'No symptoms provided'}, status=status.HTTP_400_BAD_REQUEST)

#             testingsymptoms = [0] * len(symptomslist)

#             for k, symptom in enumerate(symptomslist):
#                 if symptom in psymptoms:
#                     testingsymptoms[k] = 1

#             inputtest = np.array([testingsymptoms])

#             predicted = model.predict(inputtest)
#             y_pred_2 = model.predict_proba(inputtest)
#             confidencescore = y_pred_2.max() * 100

#             predicted_disease = predicted[0]
#             confidencescore = format(confidencescore, '.0f')

#             # Save to database
#             if request.user.is_authenticated:
#                 diseaseinfo_new = diseaseinfo(
#                     user=request.user,
#                     diseasename=predicted_disease,
#                     no_of_symp=inputno,
#                     symptomsname=','.join(psymptoms),
#                     confidence=confidencescore
#                 )
#                 diseaseinfo_new.save()

#                 request.session['diseaseinfo_id'] = diseaseinfo_new.id

#                 return Response({'predicteddisease': predicted_disease, 'confidencescore': confidencescore}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        