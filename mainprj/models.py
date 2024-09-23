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
    ('patient', 'Patient'),
    ('doctor', 'Doctor'),
]

class User(AbstractUser):
    username = models.CharField(max_length=200, blank=True, null=True)  # Make it optional
    email = models.EmailField(unique=True)  # Email is unique and required
    password = models.CharField(max_length=200)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    prediction_count = models.IntegerField(default=0)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    permanent_address = models.CharField(max_length=255, blank=True, null=True)
    temporary_address = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)

    # Specify email as the unique identifier for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def clean(self):
        # Ensure username is set to a unique value or handle any specific validation you want.
        super().clean()


    
    
    
    
class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relate the prediction to a user
    disease = models.CharField(max_length=255)
    probability = models.FloatField()
    description = models.TextField()
    precautions = models.JSONField()  # Store the list of precautions as JSON
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.disease} ({self.probability*100:.2f}%) - {self.user.username}'
