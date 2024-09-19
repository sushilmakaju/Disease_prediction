import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { login } from '../../features/auth/authSlice';
import { useDispatch } from "react-redux";

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };

    const validate = () => {
        const errors = {};
        if (!loginData.email) errors.email = "Email is required";
        if (!loginData.password) errors.password = "Password is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/login/",
                    loginData
                );
                console.log(response);

                const { token } = response.data;
                localStorage.setItem("token", token);
                console.log(response.data.token)
                
                dispatch(login({ token }))
                
                toast.success("Login successful");

                setTimeout(() => {
                navigate("/dashboard");
                }, 2000);
            } catch (error) {
                toast.error(error.response.data);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all hover:scale-105">
            <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">Login</h2>
            <form onSubmit={handleSubmit}>
            <ToastContainer />
            <div className="mb-4">
              <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400"
                id="email"
                type="email"
                placeholder="Your Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>

            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <div className="mb-6">
              <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
                onClick={togglePasswordVisibility} 
                >
                  {showPassword ? (
                  <FaEyeSlash className="text-gray-500 cursor-pointer" />
                  ) : (
                  <FaEye className="text-gray-500 cursor-pointer" />
                  )}
              </div>
            </div>
            
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                type="submit"
              >
                Login
              </button>
              
              <button
                type="button"
                className="text-teal-600 font-bold hover:text-teal-800 transition duration-300 ease-in-out"
                onClick={() => navigate("/signup")}
              >
                Don't have an account? Sign up
              </button>
            </div>
            </form>
            </div>
        </div>
        </>
    );
};

export default LoginForm;
