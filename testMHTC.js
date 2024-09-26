const fs = require('fs');
const https = require('https');

// Replace this with the VIN you want to decode
const vin = '1G1ND52F95M176773';
const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin}?format=json`;

// Function to fetch vehicle data from the API
function fetchVehicleData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = '';

        // Receive data chunks
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // Data reception finished
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject('Error: ' + err.message);
      });
  });
}

// Function to categorize and format the data
function formatVehicleData(jsonResponse) {
  const results = jsonResponse.Results;
  const data = {};

  // Categories to organize variables
  const categories = {
    'Vehicle Information': [
      'Make',
      'Model',
      'Model Year',
      'Vehicle Type',
      'Trim',
      'Trim2',
      'Vehicle Descriptor',
      'Body Class',
      'Doors',
      'Drive Type',
      'NCSA Body Type',
      'NCSA Make',
      'NCSA Model',
    ],
    'Manufacturer Information': [
      'Manufacturer Name',
      'Plant City',
      'Plant Country',
    ],
    'Engine Information': [
      'Engine Number of Cylinders',
      'Displacement (CC)',
      'Displacement (CI)',
      'Displacement (L)',
      'Fuel Type - Primary',
      'Engine Brake (hp) From',
    ],
    'Vehicle Dimensions and Weight': [
      'Gross Vehicle Weight Rating From',
    ],
    'Safety Features': [
      'Pretensioner',
      'Seat Belt Type',
      'Other Restraint System Info',
      'Front Air Bag Locations',
      'Side Air Bag Locations',
      'Tire Pressure Monitoring System (TPMS) Type',
    ],
    'Other Information': [
      'Error Code',
      'Error Text',
      'Trailer Type Connection',
      'Trailer Body Type',
      'Bus Floor Configuration Type',
      'Bus Type',
      'Custom Motorcycle Type',
      'Motorcycle Suspension Type',
      'Motorcycle Chassis Type',
    ],
  };

  // Initialize data object with categories
  for (const category in categories) {
    data[category] = [];
  }

  // Map variables to categories
  results.forEach((item) => {
    for (const category in categories) {
      if (categories[category].includes(item.Variable) && item.Value) {
        data[category].push({
          Variable: item.Variable,
          Value: item.Value,
        });
      }
    }
  });

  // Build the formatted output
  let output = '';

  for (const category in data) {
    if (data[category].length > 0) {
      output += `---\n\n### **${category}**\n\n`;
      output += `| Variable | Value |\n`;
      output += `|---|---|\n`;
      data[category].forEach((item) => {
        output += `| **${item.Variable}** | ${item.Value} |\n`;
      });
      output += `\n`;
    }
  }

  output += '---\n\n**Note:** Variables with null or empty values have been omitted from the table for clarity.\n';

  return output;
}

// Main function to execute the script
async function main() {
  try {
    const jsonResponse = await fetchVehicleData(apiUrl);
    const formattedData = formatVehicleData(jsonResponse);

    // Write the output to a text file
    fs.writeFile('vehicle_info.txt', formattedData, (err) => {
      if (err) throw err;
      console.log('Vehicle information has been saved to vehicle_info.txt');
    });
  } catch (error) {
    console.error(error);
  }
}

main();