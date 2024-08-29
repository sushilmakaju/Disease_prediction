import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <UserStatistics />
        <DiseaseManagement />
        <PredictionActivity />
        <Settings />
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="w-64 bg-blue-900 text-white p-4">
    <h2 className="text-xl font-bold mb-4">Navigation</h2>
    <ul>
      <li className="mb-2"><a href="#user-stats">User Management</a></li>
      <li className="mb-2"><a href="#disease-data">Disease Data</a></li>
      <li className="mb-2"><a href="#prediction-activity">Prediction Activity</a></li>
      <li><a href="#settings">Settings</a></li>
    </ul>
  </div>
);

const UserStatistics = () => (
  <section id="user-stats" className="mb-8">
    <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">Total Users</h3>
        <p>1234</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">Active Users</h3>
        <p>567</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">Recent Signups</h3>
        <ul>
          <li>User1</li>
          <li>User2</li>
          <li>User3</li>
        </ul>
      </div>
    </div>
  </section>
);

const DiseaseManagement = () => (
  <section id="disease-data" className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Disease Data Management</h2>
    <button className="bg-green-500 text-white px-4 py-2 rounded">Add New Disease</button>
    {/* List of diseases and edit/delete options would go here */}
  </section>
);

const PredictionActivity = () => (
  <section id="prediction-activity" className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Prediction Activity</h2>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold">Recent Predictions</h3>
      {/* List recent predictions */}
    </div>
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-xl font-bold">Statistics</h3>
      {/* Include charts here */}
    </div>
  </section>
);

const Settings = () => (
  <section id="settings" className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold">Profile Settings</h3>
      {/* Profile settings form */}
    </div>
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-xl font-bold">Change Password</h3>
      {/* Change password form */}
    </div>
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-xl font-bold">Theme Settings</h3>
      {/* Light/Dark mode toggle */}
    </div>
  </section>
);

export default AdminDashboard;
