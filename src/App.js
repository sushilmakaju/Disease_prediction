import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/navbar';
import SignupComponent from './component/Register/RegisterComponent';
import LoginComponent from './component/Login/loginComponent';
import HomeComponent from './component/Home/HomeComponent';
import GetStartedPage from './component/GetstartedComponent/getStartedComponent';
import ForgotPassword from './component/forgetPasswordComponent/forgetPasswordComponent';
import Dashboard from './component/DashboardComponent/dashboardComponent';
import DiseasePredictionComponent from './component/CheckDiseaseComponent/checkDiseaseComponent';
import Footer from './component/footer/footer';
import EditProfile from './component/EditProfile/EditProfileComponent';
import ChangePassword from './component/ChangePassword/chhangePassword';
import AdminDashboard from './component/AdminDashboard/AdminDashboard';
import ProtectedRoute from './protectedRoutes/protectedRoute';
import TakeAppointment from './component/AppoinmentComponent/appoinmentPage';
import SettingComponent from './component/SettingsComponent/settingComponent';
import ThemeSwitcher from './component/ThemeChanger/ThemeSwitcher';
import DoctorSignupComponent from './component/Register/doctorRegister';
import DoctorDashboard from './Doctordashboard/doctorDashboard';
import ViewAppointmentPage from './component/appoinmentview/appoinmentview';
import ViewAppointmentsUser from './component/ViewAppointmentUser/UserAppointment';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/docsignup" element={<DoctorSignupComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/getstarted" element={<GetStartedPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
        

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/doctordashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/checkdisease" element={<ProtectedRoute><DiseasePredictionComponent /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/takeappoinment" element={<ProtectedRoute><TakeAppointment /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingComponent /></ProtectedRoute>} />
            <Route path="/viewappoinment" element={<ProtectedRoute><ViewAppointmentPage /></ProtectedRoute>} />
            <Route path="/view-appointments-user" element={<ProtectedRoute><ViewAppointmentsUser /></ProtectedRoute>} />
            
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
