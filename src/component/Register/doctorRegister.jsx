import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, ArrowLeft, User, Mail, Home, Check, 
  Stethoscope, FileText, Calendar, Building 
} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const DoctorSignupComponent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorData, setDoctorData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    profile_picture: null,
    permanent_address: '',
    temporary_address: '',
    gender: '',
    role: 'doctor',
    specialty: '',
    qualifications: '',
    availability: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDoctorData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
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
      if (!doctorData.username?.trim()) stepErrors.username = 'Username is required';
      if (!doctorData.email?.trim()) {
        stepErrors.email = 'Email is required';
      } else if (!validateEmail(doctorData.email)) {
        stepErrors.email = 'Please enter a valid email';
      }
      if (!doctorData.password) {
        stepErrors.password = 'Password is required';
      } else if (doctorData.password.length < 8) {
        stepErrors.password = 'Password must be at least 8 characters';
      }
      if (doctorData.password !== doctorData.confirmPassword) {
        stepErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (currentStep === 2) {
      if (!doctorData.first_name?.trim()) stepErrors.first_name = 'First name is required';
      if (!doctorData.last_name?.trim()) stepErrors.last_name = 'Last name is required';
      if (!doctorData.gender) stepErrors.gender = 'Please select your gender';
    } else if (currentStep === 3) {
      if (!doctorData.specialty?.trim()) stepErrors.specialty = 'Specialty is required';
      if (!doctorData.qualifications?.trim()) stepErrors.qualifications = 'Qualifications are required';
      if (!doctorData.permanent_address?.trim()) stepErrors.permanent_address = 'Permanent address is required';
      if (!doctorData.temporary_address?.trim()) stepErrors.temporary_address = 'Temporary address is required';
      if (!doctorData.availability?.trim()) stepErrors.availability = 'Availability is required';
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

        await axios.post('http://localhost:8000/doctorregister/', {
          username: doctorData.username,
          email: doctorData.email,
          password: doctorData.password,
          gender: doctorData.gender,
          permanent_address: doctorData.permanentAddress,
          temporary_address: doctorData.temporaryAddress,
          gender: doctorData.gender,
          role: doctorData.role,
          specialty: doctorData.specialty,
          qualifications: doctorData.qualifications,
          availability: doctorData.availability

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
                  value={doctorData.username}
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
                  value={doctorData.email}
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
                value={doctorData.password}
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
                value={doctorData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <div className="relative">
                <input
                  className={errors.first_name ? errorInputClasses : inputClasses}
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  value={doctorData.first_name}
                  onChange={handleChange}
                />
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className={errors.last_name ? errorInputClasses : inputClasses}
                type="text"
                placeholder="Enter your last name"
                name="last_name"
                value={doctorData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <select
                className={errors.gender ? errorInputClasses : inputClasses}
                name="gender"
                value={doctorData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Specialty
              </label>
              <input
                className={errors.specialty ? errorInputClasses : inputClasses}
                type="text"
                placeholder="Enter your specialty"
                name="specialty"
                value={doctorData.specialty}
                onChange={handleChange}
              />
              {errors.specialty && <div className="text-red-500 text-sm mt-1">{errors.specialty}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Qualifications
              </label>
              <input
                className={errors.qualifications ? errorInputClasses : inputClasses}
                type="text"
                placeholder="Enter your qualifications"
                name="qualifications"
                value={doctorData.qualifications}
                onChange={handleChange}
              />
              {errors.qualifications && <div className="text-red-500 text-sm mt-1">{errors.qualifications}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Permanent Address
              </label>
              <input
                className={errors.permanent_address ? errorInputClasses : inputClasses}
                type="text"
                placeholder="Enter your permanent address"
                name="permanent_address"
                value={doctorData.permanent_address}
                onChange={handleChange}
              />
              {errors.permanent_address && <div className="text-red-500 text-sm mt-1">{errors.permanent_address}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Temporary Address
              </label>
              <input
                className={errors.temporary_address ? errorInputClasses : inputClasses}
                type="text"
                placeholder="Enter your temporary address"
                name="temporary_address"
                value={doctorData.temporary_address}
                onChange={handleChange}
              />
              {errors.temporary_address && <div className="text-red-500 text-sm mt-1">{errors.temporary_address}</div>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Availability
              </label>
              <input
                className={errors.availability ? errorInputClasses : inputClasses}
                type="text"
                placeholder="Enter your availability"
                name="availability"
                value={doctorData.availability}
                onChange={handleChange}
              />
              {errors.availability && <div className="text-red-500 text-sm mt-1">{errors.availability}</div>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Doctor Registration</h2>
      
      {renderProgressBar()}
      
      <form onSubmit={handleSubmit}>
        {renderStep()}
        
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            >
              <ArrowLeft size={20} /> Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next <ArrowRight size={20} />
            </button>
          ) : (
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${isLoading ? 'opacity-50' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Register'}
            </button>
          )}
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default DoctorSignupComponent;
