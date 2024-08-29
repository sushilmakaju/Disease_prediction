from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('login/',LoginAPIView.as_view(), name='login_view'),
    
    path('register/',RegisterView.as_view(), name='register_view'),
    
    path('api/auth/changepassword/',ChangePasswordView.as_view(), name='changepassword_view'),
    
    path('api/user/profile/', ProfileApiView.as_view(), name='profile_view'),
    
    path('api/user/editprofile/', ProfileApiView.as_view(), name='profile_view'),
    
    path('api/predict/', PredictDiseaseView.as_view(), name='predict_disease'),
    
    path('api/user/recent-predictions/', RecentPredictionsView.as_view(), name='recent-predictions'),
    
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)