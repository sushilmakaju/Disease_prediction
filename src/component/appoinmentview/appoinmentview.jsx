import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ViewAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]); // State to hold all appointments
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8000/view/appointments/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log(response.data); // Log the response to inspect data
        setAppointments(response.data); // Set the appointments data
      } catch (error) {
        console.error('Error fetching appointment data', error);
        setError('Failed to fetch appointment data');
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleConfirm = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Make API call to confirm the appointment (adjust API endpoint as needed)
      const response = await axios.patch(
        `http://localhost:8000/view/appointments/${appointmentId}/confirm/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Update the appointment status locally after successful confirmation
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: 'confirmed' } // Update status to 'confirmed'
            : appointment
        )
      );
      alert('Appointment Confirmed');
    } catch (error) {
      console.error('Error confirming appointment', error);
      alert('Failed to confirm appointment');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (appointments.length === 0) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white">
        <div className="p-4 text-lg font-bold">Doctor Dashboard</div>
        <nav className="mt-4">
          <ul>
            <li className="p-4 hover:bg-blue-600">Dashboard</li>
            <li className="p-4 hover:bg-blue-600">Appointments</li>
            <li className="p-4 hover:bg-blue-600">Patients</li>
            <li className="p-4 hover:bg-blue-600">Prescriptions</li>
            <li className="p-4 hover:bg-blue-600">Chat</li>
            <li className="p-4 hover:bg-blue-600">Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">View Appointments</h1>
        </header>

        <section className="bg-white shadow rounded p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Appointment Details</h2>

          {/* Loop through the appointments and display each one */}
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border-b border-gray-300 pb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">User ID:</span>
                  <span>{appointment.user}</span> {/* Directly rendering user field */}
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{dayjs(appointment.date).format('MMMM D, YYYY')}</span> {/* Format date */}
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Time:</span>
                  <span>{dayjs(appointment.time, 'HH:mm:ss').format('h:mm A')}</span> {/* Format time */}
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`${
                      appointment.status === 'pending'
                        ? 'text-yellow-500'
                        : appointment.status === 'confirmed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {appointment.status} {/* Directly rendering status */}
                  </span>
                </div>

                {/* Confirm Appointment Button */}
                {appointment.status === 'pending' && (
                  <button
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
                    onClick={() => handleConfirm(appointment.id)}
                  >
                    Confirm Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="flex justify-between mt-6">
          <button
            className="bg-gray-300 text-black px-6 py-2 rounded-lg"
            onClick={() => navigate('/appointments')}
          >
            Back to Appointments
          </button>
        </section>
      </main>
    </div>
  );
};

export default ViewAppointmentPage;
