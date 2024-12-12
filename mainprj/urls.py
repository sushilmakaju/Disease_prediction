from django.urls import path

from django.conf.urls.static import static
from django.conf import settings


from mainprj .views.auth_views import LoginAPIView, RegisterView, DoctorRegisterView
from mainprj .views.prediction_views import PredictDiseaseView, RecentPredictionsView
from mainprj .views.profile_views import ProfileApiView
from mainprj .views.other_views import ChangePasswordView, DoctorListView, AppointmentRequestView, DoctorAppointmentsView, DoctorListGenericView, PatientsListGenericView, UpdateAppointmentStatusAPIView, UserAppointmentsView, AllAppointmentsView

urlpatterns = [
    path('login/',LoginAPIView.as_view(), name='login_view'),
    
    path('register/',RegisterView.as_view(), name='register_view'),
    
    path('doctorregister/',DoctorRegisterView.as_view(), name='register_view'),
    
    path('api/auth/changepassword/',ChangePasswordView.as_view(), name='changepassword_view'),
    
    path('api/user/profile/', ProfileApiView.as_view(), name='profile_view'),
    
    path('api/user/editprofile/', ProfileApiView.as_view(), name='profile_view'),
    
    path('api/predict/', PredictDiseaseView.as_view(), name='predict_disease'),
    
    path('api/user/recent-predictions/', RecentPredictionsView.as_view(), name='recent-predictions'),
    
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    
    path('appointments/', AppointmentRequestView.as_view(), name='appointment-create'),
     
    path('view/appointments/', DoctorAppointmentsView.as_view(), name='appointment-get'),
     
    path('view/all/appointments/', AllAppointmentsView.as_view(), name='appointmentall-get'), 
    
    path('view/doctors/', DoctorListGenericView.as_view(), name='doctor-list'),
    
    path('view/patients/', PatientsListGenericView.as_view(), name='patients-list'),
    
    path('view/get/user/appointment', UserAppointmentsView.as_view(), name='appointment-list'),
    
    path('appointments/<int:pk>/update-status/', UpdateAppointmentStatusAPIView.as_view(), name='update-appointment-status'),
    
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)