import React, { useState, useEffect } from 'react';
import axios from "axios";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });

  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');  // Replace with an actual valid token
  
      try {
          const response = await axios.get('http://localhost:8000/api/user/profile/', {
              headers: {
                  Authorization: `Token ${token}`,  // Adjust based on your backend
              },
          });
          setProfile(response.data);
      } catch (error) {
          console.error('There was an error fetching the profile!', error.response || error.message);
          setError(error.message);
      }
  };
  
  

    fetchProfile();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Main Content */}
      <main className="flex flex-grow p-6">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-4">
          {/* Profile Section */}
          <div className="text-center">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"  // This should be replaced with actual profile picture URL if available
              alt="User Profile"
            />
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          
          {/* Actions */}
          <div className="mt-6 text-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Predict Disease
            </button>
          </div>
        </div>

        <div className="flex-grow ml-6">
          {/* Recent Activity */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-600">No recent activity yet.</p>
            </div>
          </section>

          {/* Statistics & Insights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Statistics & Insights</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Total Predictions</h3>
                <p className="text-gray-600">0</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Accuracy Rate</h3>
                <p className="text-gray-600">N/A</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-gray-600">© 2024 Disease Prediction System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
