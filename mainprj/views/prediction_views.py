from rest_framework.response import Response
from rest_framework import status

from mainprj .models import Prediction
from mainprj.serillizers import PredictionSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import numpy as np
import pandas as pd
import pickle



model = pickle.load(open('ExtraTrees.pkl', 'rb'))
desc = pd.read_csv("C:\\Users\\Asus\\Desktop\\finalyearproject_diseasepredicition\\Backend\\dataset\\symptom_Description.csv")
prec = pd.read_csv("C:\\Users\\Asus\\Desktop\\finalyearproject_diseasepredicition\\Backend\\dataset\\symptom_precaution.csv")

diseases = [ '(vertigo) Paroymsal Positional Vertigo', 'AIDS', 'Acne', 'Alcoholic hepatitis', 'Allergy', 'Arthritis', 'Bronchial Asthma', 'Cervical spondylosis', 'Chicken pox', 'Chronic cholestasis', 'Common Cold', 'Dengue', 'Diabetes', 'Dimorphic hemmorhoids(piles)', 'Drug Reaction', 'Fungal infection', 'GERD', 'Gastroenteritis', 'Heart attack', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Hypertension', 'Hyperthyroidism', 'Hypoglycemia', 'Hypothyroidism', 'Impetigo', 'Jaundice', 'Malaria', 'Migraine', 'Osteoarthristis', 'Paralysis (brain hemorrhage)', 'Peptic ulcer diseae', 'Pneumonia', 'Psoriasis', 'Tuberculosis', 'Typhoid', 'Urinary tract infection', 'Varicose veins', 'hepatitis A' ]

symptoms =[ 'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']


class PredictDiseaseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.get('symptoms', [])
        features = [0] * 222
        all_symptoms = list(symptoms)  

        for symptom in data:
            if symptom in all_symptoms:
                index = all_symptoms.index(symptom)
                features[index] = 1

        proba = model.predict_proba([features])
        top5_idx = np.argsort(proba[0])[-5:][::-1]
        top5_proba = np.sort(proba[0])[-5:][::-1]
        top5_diseases = [diseases[i] for i in top5_idx]

        response_data = []
        for i in range(5):
            disease = top5_diseases[i]
            probability = round(float(top5_proba[i]), 9)
            disp = desc[desc['Disease'] == disease].values[0][1] if disease in desc["Disease"].unique() else "No description available"

            precautions = []
            if disease in prec["Disease"].unique():
                c = np.where(prec['Disease'] == disease)[0][0]
                for j in range(1, len(prec.iloc[c])):
                    precautions.append(prec.iloc[c, j])

            # Create a dictionary with the disease prediction details
            prediction = {
                'disease': disease,
                'probability': probability,
                'description': disp,
                'precautions': precautions
            }
            response_data.append(prediction)

            # Save the prediction to the database
            if request.user.is_authenticated:
                Prediction.objects.create(
                    user=request.user,
                    disease=disease,
                    probability=probability,
                    description=disp,
                    precautions=precautions
                )

        serializer = PredictionSerializer(response_data, many=True)

        # Increment the prediction count if the user is authenticated
        if request.user.is_authenticated:
            user = request.user
            user.prediction_count += 1
            user.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class RecentPredictionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch recent predictions for the authenticated user
        recent_preds = Prediction.objects.filter(user=request.user).order_by('-date')
        serializer = PredictionSerializer(recent_preds, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    