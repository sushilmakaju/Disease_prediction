import React from 'react';

const GetStartedPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Get Started</h1>

      {/* Introduction */}
      <div className="mb-10 text-center">
        <p className="text-xl">
          Welcome to the Disease Prediction System! Follow these steps to begin predicting diseases based on your symptoms.
        </p>
      </div>

      {/* Step-by-Step Guide */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Step 1: Log In or Sign Up</h2>
          <p className="text-gray-700 mb-4">
            If you don’t have an account, sign up now to start using our prediction system. Already have an account? Simply log in.
          </p>
          <div className="flex justify-center">
            <a href="/login" className="text-blue-600 underline mr-4">Log In</a>
            <a href="/signup" className="text-blue-600 underline">Sign Up</a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Step 2: Enter Symptoms</h2>
          <p className="text-gray-700 mb-4">
            Enter your symptoms into the provided form. Our system will analyze the data to provide accurate predictions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Step 3: View Predictions</h2>
          <p className="text-gray-700 mb-4">
            After submitting your symptoms, the system will provide possible disease predictions. Review the results carefully.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Step 4: Take Action</h2>
          <p className="text-gray-700 mb-4">
            Use the predictions to take informed actions. We recommend consulting a healthcare professional for further advice.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="my-10">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">How accurate are the predictions?</h3>
            <p className="text-gray-700">
              Our system is designed to provide highly accurate predictions, but it’s essential to consult a healthcare provider for any serious concerns.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">What should I do if I get a serious prediction?</h3>
            <p className="text-gray-700">
              If you receive a serious prediction, we strongly recommend seeking immediate medical advice from a professional.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a href="/predict" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Start Predicting Now
        </a>
      </div>
    </div>
  );
};

export default GetStartedPage;
