import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To get doctor ID from URL (if needed)

const TakeAppointment = () => {
  // Assuming doctor data is coming from props, a global state, or an API.
  const { doctorId } = useParams(); // Get the doctor ID from URL params
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  // Example doctor data (can be fetched from API)
  const doctor = {
    id: doctorId,
    name: 'Dr. John Doe',
    specialization: 'Cardiologist',
    experience: '15 years',
    contact: 'dr.johndoe@hospital.com',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAppointmentRequest = (e) => {
    e.preventDefault();
    // Perform API request or appointment scheduling here

    // After success
    setSuccessMessage(`Appointment with ${doctor.name} has been successfully scheduled!`);

    // Clear form fields
    setFormData({
      date: '',
      time: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Doctor Details</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialization}</p>
          <p className="text-gray-600">Experience: {doctor.experience}</p>
          <p className="text-gray-600">Contact: {doctor.contact}</p>
        </div>

        <form onSubmit={handleAppointmentRequest}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Appointment Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
          >
            Request Appointment
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 text-green-700 bg-green-100 p-3 rounded-md">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeAppointment;
