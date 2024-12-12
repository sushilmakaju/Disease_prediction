from rest_framework import serializers
from .models import *

class Userserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

class Doctorserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'profile_picture', 
                  'first_name', 'last_name', 'permanent_address', 
                  'temporary_address', 'gender' , 'role', 'specialty', 
                  'qualifications', 'availability' 
                ]


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['disease', 'probability', 'description', 'precautions', 'date']

class PredictionResponseSerializer(serializers.Serializer):
    disease = serializers.CharField()
    probability = serializers.FloatField()
    description = serializers.CharField()
    precautions = serializers.ListField(child=serializers.CharField())


class UserProfileserializers(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'prediction_count', 'profile_picture']
        
    def get_profile_picture_url(self, obj):
        request = self.context.get('request')
        if obj.profile_picture and hasattr(obj.profile_picture, 'url'):
            return request.build_absolute_uri(obj.profile_picture.url)
        return None
        
class DoctorFetchSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'specialty', 'qualifications', 'email']
        
        
class AppointmentRequestSerializer(serializers.ModelSerializer):
    # Adding a custom field to display the first name of the user
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    doctor_first_name = serializers.CharField(source='doctor.first_name', read_only=True)

    class Meta:
        model = AppointmentRequest
        fields = [
            'id', 
            'user', 
            'user_first_name', 
            # Include the first name of the user
            'doctor', 
            'doctor_first_name',
            'date', 
      
            
            'status', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
# These fields cannot be modified

    
class DoctorAppointmenSerializter(serializers.ModelSerializer):
    # Adding a custom field to display the first name of the user
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    doctor_first_name = serializers.CharField(source='doctor.first_name', read_only=True)

    class Meta:
        model = AppointmentRequest
        fields = [
            'id', 
            'user', 
            'user_first_name', 
            # Include the first name of the user
            'doctor', 
            'doctor_first_name',
            'date', 
      
            'time',
            'status', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
