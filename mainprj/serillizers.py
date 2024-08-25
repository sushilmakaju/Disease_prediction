from rest_framework import serializers
from .models import *

class Userserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'




class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['disease', 'probability', 'description', 'precautions', 'date']


class UserProfileserializers(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'prediction_count', 'profile_picture']
        
    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None