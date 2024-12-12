import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profile_picture: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching the profile!', error.response || error.message);
        setError(error.message);

        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleTakeAppointmentClick = () => {
    navigate('/takeappoinment');
  };

  const handleViewAppointmentsClick = () => {
    navigate('/view-appointments-user');
  };

  const handleEditProfileClick = () => {
    navigate('/edit-profile');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile.username) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <main className="flex flex-grow p-6">
        <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="text-center">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 dark:border-blue-300 shadow-md"
                src={profile.profile_picture}
              />
              <button
                onClick={handleEditProfileClick}
                className="absolute top-0 right-0 m-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg"
                aria-label="Edit profile picture"
              >
                <FaEdit className="text-gray-700 dark:text-gray-300" size={20} />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">
              {profile.username}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleTakeAppointmentClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 mb-4"
              aria-label="Take an appointment"
            >
              Take Appointment
            </button>
            <button
              onClick={handleViewAppointmentsClick}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              aria-label="View your appointments"
            >
              View Appointments
            </button>
          </div>
        </div>

        <div className="flex-grow ml-6">
          <section>
            <h2
              className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300"
              id="dashboard-welcome-header"
            >
              Welcome to the Dashboard
            </h2>
            <p
              className="text-gray-600 dark:text-gray-400"
              aria-labelledby="dashboard-welcome-header"
            >
              Use the buttons on the left to manage your appointments or update your profile.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
