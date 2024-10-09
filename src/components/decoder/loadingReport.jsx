import React, { useState, useEffect } from 'react';

const LoadingReport = ({ vin, state }) => {
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(20);
  const [statusMessage, setStatusMessage] = useState('Searching for available information');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => Math.min(oldProgress + 5, 100));
      setSeconds((oldSeconds) => Math.max(oldSeconds - 1, 0));
    }, 200);

    return () => clearInterval(interval);
  }, [vin]);

  useEffect(() => {
    // Update status message based on progress
    if (progress >= 80 && progress < 100) {
      setStatusMessage('Verifying odometer data...');
    } else if (progress >= 50 && progress < 80) {
      setStatusMessage('Checking recall information...');
    } else if (progress >= 20 && progress < 50) {
      setStatusMessage('Analyzing vehicle history...');
    } else if (progress === 100) {
      setStatusMessage('Decoding complete!');
      // Call onComplete when progress reaches 100%
    }
  }, [progress]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Progress Steps */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex items-center justify-center">
          {/* Step 1 */}
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-20 h-20 rounded-full font-bold transition-colors duration-500 ${
                progress >= 0 ? 'bg-green-400 text-white' : 'bg-gray-300'
              }`}
            >
              1
            </div>
            <div className="h-1 bg-gray-300 flex-grow mx-2"></div>
          </div>
          {/* Step 2 */}
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-20 h-20 rounded-full font-bold transition-colors duration-500 ${
                progress >= 50 ? 'bg-green-400 text-white' : 'bg-gray-300'
              }`}
            >
              2
            </div>
            <div className="h-1 bg-gray-300 flex-grow mx-2"></div>
          </div>
          {/* Step 3 */}
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-20 h-20 rounded-full font-bold transition-colors duration-500 ${
                progress === 100 ? 'bg-green-400 text-white' : 'bg-gray-300'
              }`}
            >
              3
            </div>
          </div>
        </div>
      </div>

      {/* Decoding VIN */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Decoding <span className="text-green-500">{vin}</span>
      </h1>
      <p className="text-gray-500">{statusMessage}</p>

      {/* Progress Bar */}
      <div className="relative w-full max-w-2xl bg-gray-200 rounded-lg h-8 my-4">
        <div
          className="bg-green-400 h-full rounded-lg text-center text-white font-bold transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 transition-colors duration-500 text-white">
            {progress}%
          </span>
        </div>
      </div>

      <p className="text-gray-500">
        Information checking in progress... {seconds}s
      </p>

      {/* Additional Info */}
      <p className="text-gray-600 mt-6">
        <svg
          className="inline-block w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m0-2v-.01M5 13h5l2-6h5" />
        </svg>
        Searching 3.8 million data based on Pro Vin Check
      </p>
    </div>
  );
};

export default LoadingReport;