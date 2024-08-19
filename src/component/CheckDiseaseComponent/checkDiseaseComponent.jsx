import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

const DiseasePredictionComponent = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [predictionVisible, setPredictionVisible] = useState(false);
  const [predictedDisease, setPredictedDisease] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(0);

  const toggleDropdown = () => {
    console.log("Toggling Dropdown. Visible:", !dropdownVisible);
    setDropdownVisible(prev => !prev);
  };

  useEffect(() => {
    console.log("Dropdown now:", dropdownVisible);
  }, [dropdownVisible]);

  const addSymptom = (symptom) => {
    setSymptoms(prev => [...prev, symptom]);
    setDropdownVisible(false); // Close dropdown after selection
  };

  const handlePredict = () => {
    if (symptoms.length === 0) {
      alert('Please add some symptoms');
    } else {
      // Simulate prediction
      setPredictionVisible(true);
      setPredictedDisease('Example Disease');
      setConfidenceScore(85);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center py-8 px-4">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Add Your Symptoms to Predict Disease</h3>
        <button
          onClick={toggleDropdown}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:from-blue-600 hover:to-indigo-600 transition duration-300"
        >
          <FaPlus className="text-xl" />
          <span>Add Symptoms</span>
        </button>

        {dropdownVisible && (
          <div className="mt-4 border border-gray-300 rounded-xl bg-white p-4 shadow-xl">
            <ul>
              {['Fever', 'Cough', 'Headache', 'Fatigue'].map(symptom => (
                <li
                  key={symptom}
                  className="cursor-pointer p-2 hover:bg-blue-100 rounded-lg transition"
                  onClick={() => addSymptom(symptom)}
                >
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full max-w-md mt-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-300 text-lg font-semibold">
            Symptoms List
          </div>
          <div className="p-4">
            {symptoms.length > 0 ? (
              symptoms.map((symptom, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-lg mb-2">
                  {symptom}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No symptoms added</p>
            )}
          </div>
          <div className="p-4 text-center">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
              onClick={handlePredict}
            >
              Predict
            </button>
          </div>
        </div>
      </div>

      {predictionVisible && (
        <div className="w-full max-w-md mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-gray-700 mb-2">Predicted Disease:</p>
              <p className="text-2xl font-bold text-green-600" style={{ textShadow: '1px 1px 3px rgba(0, 128, 0, 0.3)' }}>
                {predictedDisease}
              </p>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">Confidence Score:</p>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-600">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                  <div className="flex mt-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${confidenceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
              >
                <a
                  href={`https://www.google.com/search?q=${predictedDisease}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <FaSearch className="text-xl" />
                  <span>Learn More About {predictedDisease}</span>
                </a>
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                className="bg-indigo-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
              >
                Consult a Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictionComponent;
