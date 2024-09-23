import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaUserAlt, FaLock, FaShieldAlt, FaCog } from 'react-icons/fa';
import ThemeSwitcher from '../ThemeChanger/ThemeSwitcher'; // Import the ThemeSwitcher component

const SettingsPage = () => {
  const [openSection, setOpenSection] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Settings</h2>
  
      {/* Personal Information Section */}
      <div className="mb-4 bg-white shadow rounded-lg p-3 hover:shadow-lg transition-shadow duration-300">
        <div
          className="flex justify-between items-center cursor-pointer py-1 border-b border-gray-300"
          onClick={() => toggleSection('personalInfo')}
        >
          <div className="flex items-center space-x-2">
            <FaUserAlt className="text-blue-500" />
            <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
          </div>
          <span className="text-gray-500">
            {openSection === 'personalInfo' ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>
        {openSection === 'personalInfo' && (
          <div className="mt-2 space-y-3">
            {/* Personal Information Fields */}
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Profile Picture</label>
              <input type="file" className="w-full mt-1 block" />
            </div>
          </div>
        )}
      </div>
  
      {/* Security Section */}
      <div className="mb-4 bg-white shadow rounded-lg p-3 hover:shadow-lg transition-shadow duration-300">
        <div
          className="flex justify-between items-center cursor-pointer py-1 border-b border-gray-300"
          onClick={() => toggleSection('security')}
        >
          <div className="flex items-center space-x-2">
            <FaLock className="text-blue-500" />
            <h3 className="text-lg font-medium text-gray-800">Security</h3>
          </div>
          <span className="text-gray-500">
            {openSection === 'security' ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>
        {openSection === 'security' && (
          <div className="mt-2 space-y-3">
            {/* Security Fields */}
            <div>
              <label className="block text-gray-700 font-medium">Current Password</label>
              <input
                type="password"
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        )}
      </div>
  
      {/* Privacy Settings Section */}
      <div className="mb-4 bg-white shadow rounded-lg p-3 hover:shadow-lg transition-shadow duration-300">
        <div
          className="flex justify-between items-center cursor-pointer py-1 border-b border-gray-300"
          onClick={() => toggleSection('privacy')}
        >
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-blue-500" />
            <h3 className="text-lg font-medium text-gray-800">Privacy Settings</h3>
          </div>
          <span className="text-gray-500">
            {openSection === 'privacy' ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>
        {openSection === 'privacy' && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="profileVisibility" className="mr-2" />
              <label htmlFor="profileVisibility" className="text-gray-700">Make profile public</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="dataSharing" className="mr-2" />
              <label htmlFor="dataSharing" className="text-gray-700">Share my data with third-party services</label>
            </div>
            <div>
              <button className="text-red-600 hover:underline">Deactivate Account</button>
              <button className="ml-4 text-red-600 hover:underline">Delete Account</button>
            </div>
          </div>
        )}
      </div>
  
      {/* App Preferences Section */}
      <div className="mb-4 bg-white shadow rounded-lg p-3 hover:shadow-lg transition-shadow duration-300">
        <div
          className="flex justify-between items-center cursor-pointer py-1 border-b border-gray-300"
          onClick={() => toggleSection('appPreferences')}
        >
          <div className="flex items-center space-x-2">
            <FaCog className="text-blue-500" />
            <h3 className="text-lg font-medium text-gray-800">App Preferences</h3>
          </div>
          <span className="text-gray-500">
            {openSection === 'appPreferences' ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>
        {openSection === 'appPreferences' && (
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Theme</label>
              {/* Theme Switcher Button */}
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
