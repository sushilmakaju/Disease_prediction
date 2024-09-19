import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const SignupComponent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    permanentAddress: '',
    temporaryAddress: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!userData.username) errors.username = 'Username is required';
    if (!userData.email) errors.email = 'Email is required';
    if (!userData.password) errors.password = 'Password is required';
    if (!userData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    if (userData.password !== userData.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if (!userData.gender) errors.gender = 'Gender is required';
    if (!userData.permanentAddress) errors.permanentAddress = 'Permanent Address is required';
    if (!userData.temporaryAddress) errors.temporaryAddress = 'Temporary Address is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/register/', {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          gender: userData.gender,
          permanent_address: userData.permanentAddress,
          temporary_address: userData.temporaryAddress,
        });
        console.log(response);
        toast.success('Registration successful');

        // navigate to login page
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error(error.message);
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Signup</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Your Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Your Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Your Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="permanentAddress">
              Permanent Address
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="permanentAddress"
              type="text"
              placeholder="Your Permanent Address"
              name="permanentAddress"
              value={userData.permanentAddress}
              onChange={handleChange}
            />
            {errors.permanentAddress && <div className="text-red-500 text-sm">{errors.permanentAddress}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temporaryAddress">
              Temporary Address
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="temporaryAddress"
              type="text"
              placeholder="Your Temporary Address"
              name="temporaryAddress"
              value={userData.temporaryAddress}
              onChange={handleChange}
            />
            {errors.temporaryAddress && <div className="text-red-500 text-sm">{errors.temporaryAddress}</div>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              type="submit"
            >
              Register
            </button>
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
