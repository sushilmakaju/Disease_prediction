import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/navbar';
import SignupComponent from './component/Register/RegisterComponent';
import LoginComponent from './component/Login/loginComponent';
import HomeComponent from './component/Home/HomeComponent';
import GetStartedPage from './component/GetstartedComponent/getStartedComponent';
import ForgotPassword from './component/forgetPasswordComponent/forgetPasswordComponent';
import Dashboard from './component/DashboardComponent/dashboardComponent';


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
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      
    </Router>
  );
}



export default App;
