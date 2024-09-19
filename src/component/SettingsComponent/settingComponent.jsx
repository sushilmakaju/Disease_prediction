import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Icons for collapsible sections
import { FaUserAlt, FaLock, FaShieldAlt, FaCog } from 'react-icons/fa'; // Icons for sections

const Settingcomponet = () => {
  const [openSection, setOpenSection] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-lg shadow-xl mt-10">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Settings</h2>

      {/* Personal Information Section */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-300 hover:bg-blue-50 transition duration-300"
          onClick={() => toggleSection('personalInfo')}
        >
          <div className="flex items-center space-x-2">
            <FaUserAlt className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
          </div>
          <span className="text-gray-500">{openSection === 'personalInfo' ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {openSection === 'personalInfo' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Profile Picture</label>
              <input type="file" className="mt-1 block w-full" />
            </div>
          </div>
        )}
      </div>

      {/* Security Section */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-300 hover:bg-blue-50 transition duration-300"
          onClick={() => toggleSection('security')}
        >
          <div className="flex items-center space-x-2">
            <FaLock className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">Security</h3>
          </div>
          <span className="text-gray-500">{openSection === 'security' ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {openSection === 'security' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Current Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        )}
      </div>

      {/* Privacy Settings Section */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-300 hover:bg-blue-50 transition duration-300"
          onClick={() => toggleSection('privacy')}
        >
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">Privacy Settings</h3>
          </div>
          <span className="text-gray-500">{openSection === 'privacy' ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {openSection === 'privacy' && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="profileVisibility" className="mr-2" />
              <label htmlFor="profileVisibility" className="text-gray-700">
                Make profile public
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="dataSharing" className="mr-2" />
              <label htmlFor="dataSharing" className="text-gray-700">
                Share my data with third-party services
              </label>
            </div>
            <div>
              <button className="text-red-600 hover:underline">Deactivate Account</button>
              <button className="ml-4 text-red-600 hover:underline">Delete Account</button>
            </div>
          </div>
        )}
      </div>

      {/* App Preferences Section */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-300 hover:bg-blue-50 transition duration-300"
          onClick={() => toggleSection('appPreferences')}
        >
          <div className="flex items-center space-x-2">
            <FaCog className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">App Preferences</h3>
          </div>
          <span className="text-gray-500">{openSection === 'appPreferences' ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {openSection === 'appPreferences' && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Theme</label>
              <select className="block w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Language</label>
              <select className="block w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settingcomponet;
