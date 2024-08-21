from rest_framework import serializers
from .models import *

class Userserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PredictionSerializer(serializers.Serializer):
    disease = serializers.CharField()
    probability = serializers.FloatField()
    description = serializers.CharField()
    precautions = serializers.ListField(child=serializers.CharField())