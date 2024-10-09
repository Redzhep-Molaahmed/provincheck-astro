export const fetchVehicleData = async (vin) => {
    try {
      const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin}?format=json`;
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Map the relevant vehicle details
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
  
      return { vehicleDetails, error: null }; // Return data instead of setting state directly
    } catch (err) {
      return { vehicleDetails: null, error: 'Failed to fetch vehicle data' };
    }
  };