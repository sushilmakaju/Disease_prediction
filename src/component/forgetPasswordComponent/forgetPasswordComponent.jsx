import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending a password reset request
    setMessage('If your email is registered, you will receive a password reset link.');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-green-600">
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            Remembered your password? Log in here.
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
