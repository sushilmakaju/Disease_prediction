import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profile_picture: ''
  });
  
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    profile_picture: ''
  });

  const [error, setError] = useState(null);
  const [isPictureUpdated, setIsPictureUpdated] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:8000'; // Your backend base URL

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/editprofile/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const profileData = response.data;
        
        // Check if the profile_picture is a full URL or a relative path and handle it
        if (profileData.profile_picture && !profileData.profile_picture.startsWith('http')) {
          profileData.profile_picture = `${BASE_URL}${profileData.profile_picture}`;
        }

        setProfile(profileData);
        setEditForm({
          username: profileData.username,
          email: profileData.email,
          profile_picture: profileData.profile_picture,
        });
      } catch (error) {
        console.error('There was an error fetching the profile!', error.response || error.message);
        setError(error.message);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      const token = localStorage.getItem('token');

      try {
        const response = await axios.patch(`${BASE_URL}/api/user/editprofile/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        const updatedProfile = response.data;
        if (updatedProfile.profile_picture && !updatedProfile.profile_picture.startsWith('http')) {
          updatedProfile.profile_picture = `${BASE_URL}${updatedProfile.profile_picture}`;
        }

        setProfile({ ...profile, profile_picture: updatedProfile.profile_picture });
        setIsPictureUpdated(true);  // Set the flag to true
        toast.success('Profile picture updated successfully!', { position: 'bottom-right' });
      } catch (error) {
        console.error('There was an error uploading the profile picture!', error.response || error.message);
        setError(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.patch(`${BASE_URL}/api/user/editprofile/`, editForm, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setProfile(editForm);

      // Display success toast for both profile update and picture update
      toast.success('Profile updated successfully!', { position: 'bottom-right' });
      if (isPictureUpdated) {
        toast.success('Profile picture updated successfully!', { position: 'bottom-right' });
        setIsPictureUpdated(false);  // Reset the flag
      }
    } catch (error) {
      console.error('There was an error updating the profile!', error.response || error.message);
      setError(error.message);
    }
  };

  if (!profile.username && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ToastContainer position="bottom-right" /> {/* Toast container with position */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src={profile.profile_picture}
              alt="Profile"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute top-0 right-0 m-2 bg-white p-1 rounded-full shadow-lg opacity-100 transition-opacity duration-300"
            >
              <FaUpload className="text-gray-700" size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="username"
              value={editForm.username}
              onChange={handleChange}
              className="block w-full mb-2 p-2 border border-gray-300 rounded"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleChange}
              className="block w-full mb-2 p-2 border border-gray-300 rounded"
              placeholder="Email"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
