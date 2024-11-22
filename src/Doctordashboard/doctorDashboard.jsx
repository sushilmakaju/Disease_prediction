import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const DoctorDashboard = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
    });
    const [appointments, setAppointments] = useState([]); // State for today's appointments
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch doctor's profile
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile!', error.response || error.message);
                setError(error.message);

                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        // Fetch today's appointments
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/view/appointments/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const today = dayjs().format('YYYY-MM-DD'); // Format today's date
                const todaysAppointments = response.data.filter(
                    (appointment) => appointment.date === today
                );
                setAppointments(todaysAppointments);
            } catch (error) {
                console.error('Error fetching appointments!', error.response || error.message);
                setError(error.message);
            }
        };

        fetchProfile();
        fetchAppointments();
    }, [navigate]);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="flex-1 p-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Welcome, {profile.username ? `Dr. ${profile.username}` : 'Loading...'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button className="bg-gray-200 p-2 rounded-full">🔔</button>
                    </div>
                </header>

                <section className="grid grid-cols-3 gap-6 mt-6">
                    {/* Appointments Overview */}
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
                        <ul>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <li key={appointment.id} className="border-b py-2">
                                        <strong>{appointment.user}</strong> -{' '}
                                        {(appointment.time)} - {(appointment.date)}
                                    </li>
                                ))
                            ) : (
                                <li>No appointments for today.</li>
                            )}
                        </ul>
                    </div>

                    {/* Patient Statistics */}
                    <div className="bg-white shadow rounded p-4 col-span-2">
                        <h2 className="text-xl font-bold mb-4">Patient Statistics</h2>
                        <div className="flex justify-center">
                            {/* Replace with chart */}
                            <div className="h-40 w-40 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-6 mt-6">
                    {/* Quick Actions */}
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
                            Schedule Appointment
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
                            Write Prescription
                        </button>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white shadow rounded p-4 col-span-2">
                        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                        <ul>
                            <li className="border-b py-2">
                                Consultation with <strong>John Doe</strong> completed.
                            </li>
                            <li className="border-b py-2">
                                Prescription for <strong>Jane Smith</strong> updated.
                            </li>
                            <li className="py-2">
                                Message sent to <strong>Michael Brown</strong>.
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DoctorDashboard;
