import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAppointmentsUser = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/view/get/user/appointment",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again later.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-blue-600 animate-pulse">
          Loading appointments...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-400 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          My Appointments
        </h1>
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-gray-100 shadow-md rounded-md overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-blue-700 px-4 py-2 text-left">
                    Doctor
                  </th>
                  <th className="border border-blue-700 px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-blue-700 px-4 py-2 text-left">
                    Time
                  </th>
                  <th className="border border-blue-700 px-4 py-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-blue-100 transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.doctor_first_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.time || "Not Specified"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      <span
                        className={`py-1 px-3 rounded-full text-sm ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointmentsUser;
