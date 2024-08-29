// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
// import ThemeSwitcher from '../ThemeChanger/ThemeSwitcher'; // Import the ThemeSwitcher component

const Dashboard = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    prediction_count: 0,
    profile_picture: ''
  });

  const [recentPredictions, setRecentPredictions] = useState([]);
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
        console.error('There was an error fetching the profile!', error.response || error.message);
        setError(error.message);

        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    const fetchRecentPredictions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/recent-predictions/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setRecentPredictions(response.data);
      } catch (error) {
        console.error('There was an error fetching recent predictions!', error.response || error.message);
        setError(error.message);

        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
    fetchRecentPredictions();
  }, [navigate]);

  const handlePredictDiseaseClick = () => {
    navigate('/checkdisease');
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
      {/* <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md"> */}
        {/* <ThemeSwitcher /> Add the ThemeSwitcher here */}
      {/* </header> */}
      <main className="flex flex-grow p-6">
        <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 relative transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <div className="text-center">
            <div className="relative group">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 dark:border-blue-300 shadow-md transition-transform transform hover:scale-110 duration-300 ease-in-out"
                src={profile.profile_picture || "https://via.placeholder.com/150"}
                alt=""
              />
              <button
                onClick={handleEditProfileClick}
                className="absolute top-0 right-0 m-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaEdit className="text-gray-700 dark:text-gray-300" size={20} />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">{profile.username}</h2>
            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
            <p className="text-gray-600 dark:text-gray-400">Predictions Made: {profile.prediction_count}</p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handlePredictDiseaseClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Predict Disease
            </button>
          </div>
        </div>

        <div className="flex-grow ml-6">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Recently Predicted Disease</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              {recentPredictions.length > 0 ? (
                <ul>
                  {recentPredictions.map((prediction, index) => (
                    <li key={index} className="mb-4 p-4 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{prediction.disease}</h3>
                      {/* <p className="text-gray-600 dark:text-gray-400">Probability: {prediction.probability}</p> */}
                      {/* <p className="text-gray-600 dark:text-gray-400">Description: {prediction.description}</p> */}
                      <p className="text-gray-600 dark:text-gray-400">Precautions: {prediction.precautions.join(', ')}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No recent activity yet.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Statistics & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Total Predictions</h3>
                <p className="text-gray-600 dark:text-gray-400">{profile.prediction_count}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Accuracy Rate</h3>
                <p className="text-gray-600 dark:text-gray-400">N/A</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
