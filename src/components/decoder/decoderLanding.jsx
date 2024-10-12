import React, { useEffect, useState } from 'react';
import { fetchVehicleData } from '../../utils/fetchVehicleData'; // US API
import { fetchVinDecoderData } from '../../utils/fetchVinDecoderData'; // Other API
import LoadingReport from './loadingReport'; // Adjust the path accordingly
import VehicleReportMHTSA from './vehicleReportMHTSA';
import VehicleReportVINCARIO from './vehicleReportVINCARIO';


const DecoderLanding = ({ vin }) => {

  const [loading, setLoading] = useState(true);


  const handleComplete = () => {
    setLoading(false);
    // Perform any action here, such as navigating to another page or updating the state
  };


  useEffect(() => {
    // Make fetchVehicleData if it trow an error, make fetchVinDecoderData 
    fetchVehicleData(vin)
      .then((response) => {
        console.log('Vehicle data:', response);
        handleComplete(); 
      })
      .catch((error) => {
        console.error('Error fetching vehicle data:', error);
        fetchVinDecoderData(vin)
          .then((response) => {
            console.log('Vehicle data:', response);
            handleComplete();
          })
          .catch((error) => {
            console.error('Error fetching vehicle data:', error);
            // Handle error
          });
      });

  }, []);



  return (
    loading ? (
      <LoadingReport vin={vin} onComplete={handleComplete} />
    ) : (
      <h1>Loading completed</h1>
    )

  );
};
export default DecoderLanding;