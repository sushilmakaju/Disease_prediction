import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <DoctorManagement />
        <PatientManagement />
        <Appointments />
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => (
  <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 flex flex-col min-h-screen">
    <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
    <ul className="space-y-4">
      <li className="hover:bg-blue-600 p-3 rounded-lg flex items-center">
        <span className="mr-4">
          <i className="fas fa-user-md text-xl"></i>
        </span>
        <a href="#doctor-management" className="text-lg font-medium">
          Manage Doctors
        </a>
      </li>
      <li className="hover:bg-blue-600 p-3 rounded-lg flex items-center">
        <span className="mr-4">
          <i className="fas fa-user text-xl"></i>
        </span>
        <a href="#patient-management" className="text-lg font-medium">
          Manage Patients
        </a>
      </li>
      <li className="hover:bg-blue-600 p-3 rounded-lg flex items-center">
        <span className="mr-4">
          <i className="fas fa-calendar-alt text-xl"></i>
        </span>
        <a href="#appointments" className="text-lg font-medium">
          Appointments
        </a>
      </li>
    </ul>
  </div>
);

// DoctorManagement Component
const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegisterDoctor = () => {
    navigate("/docsignup");
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:8000/view/doctors/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setDoctors(response.data);
      } catch (err) {
        setError(err.message || "Error fetching doctors.");
      } finally {
        setLoading(false);
      }
    };



    fetchDoctors();
  }, []);

  return (
    <section id="doctor-management" className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleRegisterDoctor}
      >
        Register Doctor
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">Registered Doctors</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : doctors.length > 0 ? (
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                Dr. {doctor.first_name} {doctor.last_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors registered.</p>
        )}
      </div>
    </section>
  );
};

// PatientManagement Component
const PatientManagement = () => {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:8000/view/patients/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setPatients(response.data);
      } catch (err) {
        setError(err.message || "Error fetching patients.");
      } finally {
        setLoading(false);
      }
    };



    fetchPatients();
  }, []);


  
  const handleRegisterPatients = () => {
    navigate("/signup");
  };



  return (
    <section id="patient-management" className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Patients</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleRegisterPatients}
      >
        Register Patient
      </button>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">Registered Patients</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : patients.length > 0 ? (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                 {patient.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients registered.</p>
        )}
      </div>
    </section>
  );
};


// Appointments Component
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/view/all/appointments/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (err) {
        setError(err.message || "Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <section id="appointments" className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold">All Appointments</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.user_first_name} - {appointment.doctor_first_name} (
                {appointment.date}, {appointment.time})
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments available.</p>
        )}
      </div>
    </section>
  );
};



export default AdminDashboard;
