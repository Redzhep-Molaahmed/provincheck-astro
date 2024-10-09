import React, { useState, useEffect } from 'react';
import VehicleReport from './decoder/vehicleReportMHTSA.jsx'; // Import the VehicleReport component

const LoadingReport = ({ vin }) => {
    const [progress, setProgress] = useState(0);
    const [seconds, setSeconds] = useState(20);
    const [statusMessage, setStatusMessage] = useState('Searching for available information');
    const [vehicleData, setVehicleData] = useState(null); // Track fetched vehicle data
    const [loadingComplete, setLoadingComplete] = useState(false); // Track when loading is complete
    const [error, setError] = useState(null); // Track errors

    useEffect(() => {
        const updateStatusMessage = (progress) => {
            if (progress >= 80 && progress < 100) {
                setStatusMessage('Verifying odometer data...');
            } else if (progress >= 50 && progress < 80) {
                setStatusMessage('Checking recall information...');
            } else if (progress >= 20 && progress < 50) {
                setStatusMessage('Analyzing vehicle history...');
            } else if (progress === 100) {
                setStatusMessage('Decoding complete!');
                setLoadingComplete(true); // Mark loading as complete when progress hits 100
            }
        };

        // Fetch vehicle data asynchronously
        const fetchVehicleData = async () => {
            try {
                const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin}?format=json`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                const vehicleDetails = {
                    make: data.Results.find((item) => item.Variable === 'Make')?.Value || 'N/A',
                    model: data.Results.find((item) => item.Variable === 'Model')?.Value || 'N/A',
                    modelYear: data.Results.find((item) => item.Variable === 'Model Year')?.Value || 'N/A',
                    vehicleType: data.Results.find((item) => item.Variable === 'Vehicle Type')?.Value || 'N/A',
                    vehicleDescriptor: data.Results.find((item) => item.Variable === 'Vehicle Descriptor')?.Value || 'N/A',
                    bodyClass: data.Results.find((item) => item.Variable === 'Body Class')?.Value || 'N/A',
                    trim: data.Results.find((item) => item.Variable === 'Trim')?.Value || 'N/A',
                    plantCountry: data.Results.find((item) => item.Variable === 'Plant Country')?.Value || 'N/A',
                    doors: data.Results.find((item) => item.Variable === 'Doors')?.Value || 'N/A',
                    ncsaBodyType: data.Results.find((item) => item.Variable === 'NCSA Body Type')?.Value || 'N/A',
                    ncsaMake: data.Results.find((item) => item.Variable === 'NCSA Make')?.Value || 'N/A',
                    ncsaModel: data.Results.find((item) => item.Variable === 'NCSA Model')?.Value || 'N/A',
                    manufacturerName: data.Results.find((item) => item.Variable === 'Manufacturer Name')?.Value || 'N/A',
                    plantCity: data.Results.find((item) => item.Variable === 'Plant City')?.Value || 'N/A',
                    engineNumberCylinders: data.Results.find((item) => item.Variable === 'Engine Number of Cylinders')?.Value || 'N/A',
                    displacementCC: data.Results.find((item) => item.Variable === 'Displacement (CC)')?.Value || 'N/A',
                    displacementCI: data.Results.find((item) => item.Variable === 'Displacement (CI)')?.Value || 'N/A',
                    displacementL: data.Results.find((item) => item.Variable === 'Displacement (L)')?.Value || 'N/A',
                    fuelTypePrimary: data.Results.find((item) => item.Variable === 'Fuel Type - Primary')?.Value || 'N/A',
                    engineBrakeHP: data.Results.find((item) => item.Variable === 'Engine Brake (hp) From')?.Value || 'N/A',
                };

                setVehicleData(vehicleDetails); // Set the fetched data
            } catch (err) {
                setError('Failed to fetch vehicle data');
            }
        };

        fetchVehicleData(); // Start fetching the data

        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = Math.min(oldProgress + 5, 100);
                updateStatusMessage(newProgress);
                return newProgress;
            });

            setSeconds((oldSeconds) => Math.max(oldSeconds - 1, 0));
        }, 200);

        return () => clearInterval(interval);
    }, [vin]);

    // Only render the VehicleReport when loading is complete and vehicle data is available
    if (loadingComplete && vehicleData) {
        return <VehicleReport vin={vin} vehicleData={vehicleData} error={error} />; // Pass vehicle data to VehicleReport
    }

    // Render the loading progress UI while data is being fetched and loading isn't complete
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
            {/* Progress Steps */}
            <div className="w-full max-w-4xl mb-8">
                <div className="flex items-center justify-center">
                    <div className="flex items-center">
                        <div
                            className={`flex items-center justify-center w-20 h-20 rounded-full font-bold transition-colors duration-500 ${progress >= 0 ? 'bg-green-400 text-white' : 'bg-gray-300'
                                }`}
                        >
                            1
                        </div>
                        <div className="h-1 bg-gray-300 flex-grow mx-2"></div>
                    </div>
                    <div className="flex items-center">
                        <div
                            className={`flex items-center justify-center  w-20 h-20 rounded-full font-bold transition-colors duration-500 ${progress >= 50 ? 'bg-green-400 text-white' : 'bg-gray-300'
                                }`}
                        >
                            2
                        </div>
                        <div className="h-1 bg-gray-300 flex-grow mx-2"></div>
                    </div>
                    <div className="flex items-center">
                        <div
                            className={`flex items-center justify-center  w-20 h-20 rounded-full font-bold transition-colors duration-500 ${progress === 100 ? 'bg-green-400 text-white' : 'bg-gray-300'
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
                <svg className="inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m0-2v-.01M5 13h5l2-6h5" />
                </svg>
                Searching 3.8 million data based on vinpit
            </p>
        </div>
    );
};

export default LoadingReport;