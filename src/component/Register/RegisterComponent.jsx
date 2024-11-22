import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, ArrowLeft, User, Mail, Home, Check } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const SignupComponent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep = (currentStep) => {
    const stepErrors = {};
    
    if (currentStep === 1) {
      if (!userData.username?.trim()) stepErrors.username = 'Username is required';
      if (!userData.email?.trim()) {
        stepErrors.email = 'Email is required';
      } else if (!validateEmail(userData.email)) {
        stepErrors.email = 'Please enter a valid email';
      }
      if (!userData.password) {
        stepErrors.password = 'Password is required';
      } else if (userData.password.length < 8) {
        stepErrors.password = 'Password must be at least 8 characters';
      }
      if (userData.password !== userData.confirmPassword) {
        stepErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (currentStep === 2) {
      if (!userData.gender) stepErrors.gender = 'Please select your gender';
    } else if (currentStep === 3) {
      if (!userData.permanentAddress?.trim()) stepErrors.permanentAddress = 'Permanent address is required';
      if (!userData.temporaryAddress?.trim()) stepErrors.temporaryAddress = 'Temporary address is required';
    }

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(step);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(step);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setIsLoading(true);
      try {
        await axios.post('http://localhost:8000/register/', {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          gender: userData.gender,
          permanent_address: userData.permanentAddress,
          temporary_address: userData.temporaryAddress,
        });

        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        if (error.response?.status === 400) {
          const { data } = error.response;
          if (data.email) {
            setErrors(prev => ({ ...prev, email: 'This email is already registered' }));
            setStep(1);
          }
          if (data.username) {
            setErrors(prev => ({ ...prev, username: 'This username is already taken' }));
            setStep(1);
          }
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputClasses = "shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorInputClasses = "shadow appearance-none border-2 border-red-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500";
  
  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${step >= item ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} 
                transition-all duration-300`}
            >
              {step > item ? <Check size={20} /> : item}
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  className={errors.username ? errorInputClasses : inputClasses}
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  className={errors.email ? errorInputClasses : inputClasses}
                  type="email"
                  placeholder="your.email@example.com"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className={errors.password ? errorInputClasses : inputClasses}
                type="password"
                placeholder="••••••••"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                className={errors.confirmPassword ? errorInputClasses : inputClasses}
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              className={errors.gender ? errorInputClasses : inputClasses}
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Permanent Address
              </label>
              <div className="relative">
                <input
                  className={errors.permanentAddress ? errorInputClasses : inputClasses}
                  type="text"
                  placeholder="Enter your permanent address"
                  name="permanentAddress"
                  value={userData.permanentAddress}
                  onChange={handleChange}
                />
                <Home className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              {errors.permanentAddress && <div className="text-red-500 text-sm mt-1">{errors.permanentAddress}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Temporary Address
              </label>
              <div className="relative">
                <input
                  className={errors.temporaryAddress ? errorInputClasses : inputClasses}
                  type="text"
                  placeholder="Enter your temporary address"
                  name="temporaryAddress"
                  value={userData.temporaryAddress}
                  onChange={handleChange}
                />
                <Home className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              {errors.temporaryAddress && <div className="text-red-500 text-sm mt-1">{errors.temporaryAddress}</div>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Create Account</h2>
        <ToastContainer position="top-center" />
        
        {renderProgressBar()}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between items-center pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ml-auto"
              >
                Next
                <ArrowRight className="ml-2" size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center ${
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:scale-105'
                } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform ml-auto`}
              >
                {isLoading ? 'Registering...' : 'Register'}
                {!isLoading && <Check className="ml-2" size={20} />}
              </button>
            )}
          </div>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;