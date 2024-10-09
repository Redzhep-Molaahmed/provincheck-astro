import React, { useEffect, useState } from 'react';
import { fetchVehicleData } from '../../utils/fetchVehicleData'; // US API
import { fetchVinDecoderData } from '../../utils/fetchVinDecoderData'; // Other API
import LoadingReport from './loadingReport'; // Adjust the path accordingly
import VehicleReportMHTSA from './vehicleReportMHTSA';
import VehicleReportVINCARIO from './vehicleReportVINCARIO';


const DecoderLanding = ({ vin }) => {
    const [location, setLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [dataFetching, setDataFetching] = useState(true); // Initially true to show loading
    const [dataFetched, setDataFetched] = useState(false);
    const [progressComplete, setProgressComplete] = useState(false);
    const [vehicleData, setVehicleData] = useState(null);
    const [apiUsed, setApiUsed] = useState(null);
    const [error, setError] = useState(null);
  
    // Fetch user's location based on IP
    useEffect(() => {
      const fetchLocationFromIP = async () => {
        try {
          // Fetch IP
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const { ip } = await ipResponse.json();
  
          // Fetch location
          const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
          const locationData = await locationResponse.json();
  
          console.log('Location data:', locationData);
  
          setLocation(locationData);
        } catch (error) {
          console.error('Error fetching location:', error);
          setError('Failed to fetch location');
        } finally {
          setLoadingLocation(false);
        }
      };
  
      fetchLocationFromIP();
    }, []);
  
    // Fetch vehicle data based on location
    useEffect(() => {
      const fetchVehicleDataBasedOnLocation = async () => {
        try {
          let result;
  
          if (location && location.country === 'US') {
            // Fetch from US-based API
            result = await fetchVehicleData(vin);
            setApiUsed('US');
          } else if (location) {
            // Fetch from the other API for non-US regions
            result = await fetchVinDecoderData(vin);
            setApiUsed('Other');
          } else {
            // If location is not available, handle error
            setError('Location not available');
            setDataFetched(true); // Prevent indefinite loading
            return;
          }
  
          if (result.error) {
            setError(result.error);
          } else {
            setVehicleData(result.vehicleDetails);
          }
        } catch (error) {
          console.error('Error fetching vehicle data:', error);
          setError('Failed to fetch vehicle data');
        } finally {
          setDataFetched(true); // Data fetching is complete
        }
      };
  
      if (!dataFetched && !error && !loadingLocation) {
        fetchVehicleDataBasedOnLocation();
      }
    }, [location, loadingLocation, vin, dataFetched, error]);
  
    // Update dataFetching when both dataFetched and progressComplete are true
    useEffect(() => {
      console.log('dataFetched:', dataFetched, 'progressComplete:', progressComplete);
      if (dataFetched && progressComplete) {
        setDataFetching(false);
        console.log('Data fetching and progress complete, dataFetching set to false');
      }
    }, [dataFetched, progressComplete]);
  
    // Handler when loading progress completes
    const handleProgressComplete = () => {
      setProgressComplete(true);
      console.log('Progress complete, progressComplete set to true');
    };
  
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mb-8">
          {error ? (
            // Redirect to CarVertical
            <p className="text-red-500">No data found</p>
          ) : dataFetching ? (
            <LoadingReport vin={vin} onComplete={handleProgressComplete} />
          ) : vehicleData ? (

            apiUsed === 'US' ? (
                VehicleReportMHTSA({ vin, vehicleData, error })
                ) : (           
                VehicleReportVINCARIO({ vin, vehicleData, error })
            ) 
          ) : (

            // Redirect to CarVertical
            <p>No vehicle data available.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default DecoderLanding;