import React from 'react';
import { motion } from 'framer-motion';

const HomePageBody = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Predicting Diseases with Accuracy
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Our AI-powered system analyzes your symptoms to provide accurate disease predictions.
          </motion.p>
          <motion.a
            href="/getstarted"
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            Get Started
          </motion.a>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-100 via-white to-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center bg-white p-8 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-stethoscope text-blue-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
              <p className="text-gray-600">
                Utilizing advanced AI algorithms for precise results.
              </p>
            </motion.div>
            <motion.div
              className="text-center bg-white p-8 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <i className="fas fa-user-friends text-blue-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
              <p className="text-gray-600">
                Simple and intuitive interface for all users.
              </p>
            </motion.div>
            <motion.div
              className="text-center bg-white p-8 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <i className="fas fa-shield-alt text-blue-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Secure Data</h3>
              <p className="text-gray-600">
                Your data is safe and protected with us.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageBody;
