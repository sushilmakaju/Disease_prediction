import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'; 

// http://127.0.0.1:8000/

const SignupComponent = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // D structure Method
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!userData.username) errors.username = "Username is required";
    if (!userData.email) errors.email = "Email is required";
    if (!userData.password) errors.password = "Password is required";
    // if (!userData.confirmPassword)
    //   errors.confirmPassword = "Confirm Password is required";
    // if (userData.password !== userData.confirmPassword)
    //   errors.confirmPassword = "Passwords must match";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/register/",
          {
            name: userData.username,
            email: userData.email,
            password: userData.password,
          }
        );
        console.log(response);
        toast.success("Registration successful");

        // navigate to login page
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error(error.message);
        // toast.error(error.response.data.msg);
      }
    }
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  // const toggleConfirmPasswordVisibility = () => {
  //   setShowConfirmPassword(!showConfirmPassword);
  // };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all hover:scale-105" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h2>
        <ToastContainer />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            id="name"
            type="text"
            placeholder="Your Name"
            name='username'
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            id="email"
            type="email"
            placeholder="Your Email"
            name='email'
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            id="password"
            type="password"
            placeholder="Your Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            type="submit"
          >
            Register
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Already have an account?
          </a>
        </div>
      </form>
      
    </div>
  )
}

export default SignupComponent
