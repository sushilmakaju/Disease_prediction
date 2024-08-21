from django.urls import path
from .views import *

urlpatterns = [
    path('login/',LoginAPIView.as_view(), name='login_view'),
    path('register/',register_view, name='register_view'),
    
    path('api/user/profile/', ProfileApiView.as_view(), name='profile_view'),
    
    path('api/predict/', predict, name='predict_disease'),
    
    ]