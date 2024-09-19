import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold">D-Predict</Link>
            </div>
          </div>

          <div className="hidden md:flex md:space-x-4">
            {authState.isAuthenticated ? (
              <>
                <Link 
                  to="/settings" 
                  className="text-white hover:underline px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:underline px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:underline px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="text-white hover:underline px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 focus:text-white" 
              aria-controls="mobile-menu" 
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {authState.isAuthenticated ? (
              <>
                <Link 
                  to="/settings" 
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:underline cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:underline cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:underline cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
