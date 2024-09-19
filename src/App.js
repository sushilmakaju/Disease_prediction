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


function App() {
  return (
    <Router>
        <Navbar />
      
        <Routes>
          <Route path="/" element={< HomeComponent/>} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/getstarted" element={<GetStartedPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute> < Dashboard/> </ProtectedRoute>} />
          <Route path="/checkdisease" element={< DiseasePredictionComponent/>} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/change-password' element={<ProtectedRoute> <ChangePassword /> </ProtectedRoute>} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/takeappoinment' element={<TakeAppointment/>} />
          <Route path='/settings' element={<SettingComponent />} />

          
        </Routes>

        <Footer />
      
    </Router>
  );
}



export default App;
