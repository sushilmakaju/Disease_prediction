from django.db import models
from django.contrib.auth.models import AbstractUser

# global variabe for gender

GENDER_CHOICES = [
('M', 'Male'),
('F', 'Female'),
('O', 'Other'),
('U', 'Prefer not to say'),
]


USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
        ('doctor', 'Doctor')
]




class User(AbstractUser):
    username = models.CharField(max_length=200, blank=False, null=False, unique=True)  # Make username required
    email = models.EmailField(unique=True)  # Email is unique and required
    password = models.CharField(max_length=200)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    prediction_count = models.IntegerField(default=0)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    permanent_address = models.CharField(max_length=255, blank=True, null=True)
    temporary_address = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    role = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='user')
    
    specialty = models.CharField(max_length=100, blank=True, null=True)  # e.g., Cardiology, Dermatology
    qualifications = models.TextField(blank=True, null=True)  # e.g., MBBS, MD
    availability = models.TextField(blank=True, null=True)  # e.g., "Monday to Friday, 9 AM - 5 PM"


    # Specify email as the unique identifier for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Add username to required fields

    def __str__(self):
        return self.email

 
    
class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relate the prediction to a user
    disease = models.CharField(max_length=255)
    probability = models.FloatField()
    description = models.TextField()
    precautions = models.JSONField()  # Store the list of precautions as JSON
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.disease} ({self.probability*100:.2f}%) - {self.user.username}'


class AppointmentRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')  # The user requesting the appointment
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments_received')  # The doctor receiving the request
    date = models.DateField()  # Date of the appointment
    time = models.TimeField()  # Time of the appointment
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending') 
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically add the request creation time
    updated_at = models.DateTimeField(auto_now=True)  # Automatically update when the request is modified
    
    def __str__(self):
        return f'Appointment: {self.user.email} -> {self.doctor.email} on {self.date} at {self.time}'