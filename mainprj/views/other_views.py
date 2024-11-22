from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'old_password': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password, user)
        except ValidationError as e:
            return Response({'new_password': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user.password = make_password(new_password)
        user.save()

        return Response({'detail': 'Password changed successfully'}, status=status.HTTP_200_OK)

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from mainprj.models import User
from mainprj.serillizers import DoctorFetchSerializer

class DoctorListView(GenericAPIView):
    
    permission_classes = [IsAuthenticated]
    
    """
    API view to retrieve the list of doctors.
    """
    queryset = User.objects.filter(role='doctor')  # Filter users with role 'doctor'
    serializer_class = DoctorFetchSerializer

    def get(self, request, *args, **kwargs):
        # Fetch queryset and serialize it
        doctors = self.get_queryset()
        serializer = self.get_serializer(doctors, many=True)
        return Response(serializer.data)
    
from mainprj.serillizers import AppointmentRequestSerializer


from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

class AppointmentRequestView(GenericAPIView):
    serializer_class = AppointmentRequestSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this

    def post(self, request, *args, **kwargs):
        # Ensure the requesting user is a 'user'
        if request.user.role != 'user':
            return Response(
                {"error": "Only users can request appointments."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get the doctor from the request data
        doctor_id = request.data.get('doctor')
        try:
            doctor = User.objects.get(id=doctor_id, role='doctor')
        except User.DoesNotExist:
            return Response(
                {"error": "Doctor not found or invalid role."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Add user and doctor information to the serializer
        data = {
            "user": request.user.id,  # Automatically assign the requesting user
            "doctor": doctor.id,
            "date": request.data.get('date'),
            "time": request.data.get('time'),
            "status": "pending",  # Default status
        }

        # Validate and save the serializer
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from rest_framework import filters
from mainprj.models import AppointmentRequest


class DoctorAppointmentsView(GenericAPIView):
    """
    API view to fetch appointments for the authenticated doctor.
    """
    serializer_class = AppointmentRequestSerializer
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['status', 'date']  # Optional: Add searchable fields

    def get(self, request):
        # Ensure the authenticated user is a doctor
        if request.user.role != 'doctor':
            return Response(
                {"error": "Only doctors can access this view."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Fetch appointments for the authenticated doctor
        appointments = AppointmentRequest.objects.filter(doctor=request.user)
        
        print("appoinments :", appointments)

        # Serialize the data
        serializer = self.get_serializer(appointments, many=True)

        # Return serialized appointments
        return Response(serializer.data)
