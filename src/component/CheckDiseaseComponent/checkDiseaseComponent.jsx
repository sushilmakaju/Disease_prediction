import React, { useState } from 'react';
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const symptomsList = [ 'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']


const DiseasePredictionComponent = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [predictionVisible, setPredictionVisible] = useState(false);
  const [predictedDisease, setPredictedDisease] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [precautions, setPrecautions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms(prev => [...prev, symptom]);
    }
    setDropdownVisible(false);
  };

  const deleteSymptom = (symptomToDelete) => {
    setSymptoms(prevSymptoms => prevSymptoms.filter(symptom => symptom !== symptomToDelete));
  };

  const handlePredict = async () => {
    if (symptoms.length === 0) {
      alert('Please add some symptoms');
    } else {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:8000/api/predict/',
          { symptoms },
          {
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const { disease, probability, precautions } = response.data[0];
        setPredictedDisease(disease);
        setConfidenceScore(probability * 100);
        setPrecautions(precautions);
        setPredictionVisible(true);
      } catch (error) {
        console.error('Error predicting disease:', error);
        alert('An error occurred while predicting the disease.');
      }
    }
  };

  const filteredSymptoms = symptomsList.filter(symptom =>
    symptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="mt-4 border border-gray-300 rounded-xl bg-white p-4 shadow-xl max-h-60 overflow-y-auto">
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {filteredSymptoms.map(symptom => (
                <div
                  key={symptom}
                  className="cursor-pointer bg-gray-100 text-black px-4 py-2 rounded-lg transition hover:bg-gray-200"
                  onClick={() => addSymptom(symptom)}
                >
                  {symptom}
                </div>
              ))}
            </div>
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
                <div key={index} className="bg-gray-100 p-2 rounded-lg mb-2 flex justify-between items-center">
                  <span>{symptom}</span>
                  <button
                    onClick={() => deleteSymptom(symptom)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTimes />
                  </button>
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
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">Precautions:</p>
                <div className="bg-gray-100 p-4 rounded-lg mt-2 max-h-40 overflow-y-auto">
                  {Array.isArray(precautions) ? (
                    precautions.map((precaution, index) => (
                      <p key={index}>{precaution}</p>
                    ))
                  ) : typeof precautions === 'string' ? (
                    precautions.split(',').map((precaution, index) => (
                      <p key={index}>{precaution.trim()}</p>
                    ))
                  ) : (
                    <p>No precautions available</p>
                  )}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictionComponent;
