import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Unauthorized: Please log in first.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/doctors/', {
          headers: { Authorization: `Token ${token}` },
        });

        setDoctors(response.data);
        setLoading(false);
      } catch {
        setError('Failed to fetch doctors.');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorSelect = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleAppointmentRequest = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      setError('Please select a doctor.');
      return;
    }

    // Log the appointment data to check if the doctor ID is being passed
    console.log('Appointment Data:', { doctor: selectedDoctor, date: formData.date, time: formData.time });
    console.log('Selected Doctor ID:', selectedDoctor); // Log selected doctor ID for debugging

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: Please log in first.');
        return;
      }

      await axios.post(
        'http://localhost:8000/appointments/',
        { doctor: selectedDoctor, date: formData.date, time: formData.time },
        { headers: { Authorization: `Token ${token}` } }
      );

      setSuccessMessage('Appointment requested successfully.');
      setFormData({ date: '', time: '' });
      setError('');
    } catch {
      setError('Failed to request an appointment.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-400 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Take Appointment
        </h2>

        {error && (
          <div className="text-red-600 mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 mb-4 text-center font-semibold">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleAppointmentRequest}>
          <div className="mb-6">
            <label
              htmlFor="doctor-select"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor
            </label>
            <select
              id="doctor-select"
              onChange={handleDoctorSelect}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select a doctor"
              required
            >
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.id} 
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="appointment-date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              id="appointment-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select appointment date"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="appointment-time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              id="appointment-time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select appointment time"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-md w-full shadow-sm transition-transform transform hover:scale-105"
          >
            Request Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default TakeAppointment;
