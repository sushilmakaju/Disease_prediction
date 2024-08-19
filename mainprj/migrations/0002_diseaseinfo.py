# Generated by Django 5.1 on 2024-08-16 16:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainprj', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='diseaseinfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diseasename', models.CharField(max_length=200)),
                ('no_of_symp', models.IntegerField()),
                ('symptomsname', models.CharField(default='', max_length=200)),
                ('confidence', models.DecimalField(decimal_places=2, max_digits=5)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
