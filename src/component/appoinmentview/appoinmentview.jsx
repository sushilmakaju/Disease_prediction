import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ViewAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [time, setTime] = useState('');
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

        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointment data', error);
        setError('Failed to fetch appointment data');
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleConfirmClick = (appointment) => {
    setSelectedAppointment(appointment);
    setTime(''); // Clear any previously entered time
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.patch(
        `http://localhost:8000/appointments/${selectedAppointment.id}/update-status/`,
        { status: 'confirmed', time },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, status: 'confirmed', time }
            : appointment
        )
      );

      alert('Appointment Confirmed');
      setSelectedAppointment(null); // Close the form
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
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border-b border-gray-300 pb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">User First Name:</span>
                  <span>{appointment.user_first_name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{dayjs(appointment.date).format('MMMM D, YYYY')}</span>
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
                    {appointment.status}
                  </span>
                </div>
                {appointment.status === 'pending' && (
                  <button
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
                    onClick={() => handleConfirmClick(appointment)}
                  >
                    Confirm Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {selectedAppointment && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white p-6 rounded shadow-md space-y-4"
            >
              <h2 className="text-lg font-bold">Confirm Appointment</h2>
              <p>
                <strong>User:</strong> {selectedAppointment.user_first_name}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {dayjs(selectedAppointment.date).format('MMMM D, YYYY')}
              </p>
              <div>
                <label className="block font-semibold">Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewAppointmentPage;
