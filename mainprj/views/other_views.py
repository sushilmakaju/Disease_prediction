from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework.generics import GenericAPIView
from mainprj.models import User, AppointmentRequest
from mainprj.serillizers import DoctorAppointmenSerializter, DoctorFetchSerializer, AppointmentRequestSerializer, Userserializers


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


class DoctorListView(GenericAPIView):
    """
    API view to retrieve the list of doctors.
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(role='doctor')  # Filter users with role 'doctor'
    serializer_class = DoctorFetchSerializer

    def get(self, request, *args, **kwargs):
        # Fetch queryset and serialize it
        doctors = self.get_queryset()
        serializer = self.get_serializer(doctors, many=True)
        return Response(serializer.data)


class AppointmentRequestView(GenericAPIView):
    serializer_class = AppointmentRequestSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this

    def post(self, request, *args, **kwargs):
        print("Request Data:", request.data)

        if request.user.role != 'user':
            return Response(
                {"error": "Only users can request appointments."},
                status=status.HTTP_403_FORBIDDEN
            )

        doctor_id = request.data.get('doctor')
        try:
            doctor = User.objects.get(id=doctor_id, role='doctor')
        except User.DoesNotExist:
            return Response(
                {"error": "Doctor not found or invalid role."},
                status=status.HTTP_400_BAD_REQUEST
            )

        data = {
            "user": request.user.id,
            "doctor": doctor.id,
            "date": request.data.get('date'),
            "time": request.data.get('time'),
            "status": "pending",
        }
        print("Data being passed to serializer:", data)

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Validation Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorAppointmentsView(GenericAPIView):
    """
    API view to fetch appointments for the authenticated doctor.
    """
    serializer_class = DoctorAppointmenSerializter
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Ensure the authenticated user is a doctor
        if request.user.role != 'doctor':
            return Response(
                {"error": "Only doctors can access this view."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Fetch appointments for the authenticated doctor
        appointments = AppointmentRequest.objects.filter(doctor=request.user)

        # Serialize the data
        serializer = self.get_serializer(appointments, many=True)

        # Return serialized appointments
        return Response(serializer.data)


class DoctorListGenericView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Userserializers

    def get_queryset(self):
        # Filter users with role 'doctor'
        return User.objects.filter(role='doctor')

    def get(self, request):
        # Fetch the filtered queryset
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PatientsListGenericView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Userserializers

    def get_queryset(self):
        # Filter users with role 'user'
        return User.objects.filter(role='user')

    def get(self, request):
        # Fetch the filtered queryset
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class AllAppointmentsView(GenericAPIView):
    """
    API view to fetch all appointments for the authenticated user or doctor.
    """
    serializer_class = AppointmentRequestSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all appointments
        appointments = AppointmentRequest.objects.all()

        # Serialize the data
        serializer = self.get_serializer(appointments, many=True)

        # Return serialized appointments
        return Response(serializer.data)


class UpdateAppointmentStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        print(request.data)  # Log incoming data
        appointment = AppointmentRequest.objects.get(pk=pk)

        status = request.data.get('status')
        time = request.data.get('time')  # This will be None if not provided

        if status:
            appointment.status = status
        if time:
            appointment.time = time  # Only update if provided

        appointment.save()

        serializer = AppointmentRequestSerializer(appointment)
        return Response(serializer.data)


class UserAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch appointments for the logged-in user
        user = request.user
        appointments = AppointmentRequest.objects.filter(user=user)
        serializer = DoctorAppointmenSerializter(appointments, many=True)
        return Response(serializer.data)
    
class AllAppointmentsView(GenericAPIView):
    """
    API view to fetch all appointments for the authenticated user or doctor.
    """
    serializer_class = AppointmentRequestSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all appointments
        appointments = AppointmentRequest.objects.all()

        # Serialize the data
        serializer = self.get_serializer(appointments, many=True)

        # Return serialized appointments
        return Response(serializer.data)
