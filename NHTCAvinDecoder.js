// Import readline using ES module syntax
import readline from 'readline';

// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to validate VIN
const isValidVIN = (vin) => {
    // Check if the VIN is exactly 17 characters long
    if (vin.length !== 17) {
        return false;
    }

    // Ensure that the VIN does not contain illegal characters (I, O, Q)
    const invalidChars = ['I', 'O', 'Q'];
    for (let char of invalidChars) {
        if (vin.includes(char)) {
            return false;
        }
    }

    // All checks passed, VIN is valid
    return true;
};

// Function to fetch vehicle data based on user input VIN
const fetchVehicleData = (vin, callback) => {
    const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin}?format=json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data =>{

            console.log(data);

            let vehicleInfo = {
                VIN: vin,
                VMI_VDS_VIS: '',
                Manufacturer: '',
                Brand: '',
                Model: '',
                Engine: '',
                Year: '',
                Trim: ''
            };

            data.Results.forEach(result => {
                if (result.Variable === 'Vehicle Descriptor') vehicleInfo.VMI_VDS_VIS = result.Value || 'N/A';
                if (result.Variable === 'Manufacturer Name') vehicleInfo.Manufacturer = result.Value || 'N/A';
                if (result.Variable === 'Make') vehicleInfo.Brand = result.Value || 'N/A';
                if (result.Variable === 'Model') vehicleInfo.Model = result.Value || 'N/A';
                if (result.Variable === 'Displacement (L)') vehicleInfo.Engine = `${result.Value}L` || 'N/A';
                if (result.Variable === 'Model Year') vehicleInfo.Year = result.Value || 'N/A';
                if (result.Variable === 'Trim') vehicleInfo.Trim = result.Value || 'N/A';
            });

            // Log the extracted information
            console.log(`Whole VIN: ${vehicleInfo.VIN}`);
            console.log(`VMI/VDS/VIS: ${vehicleInfo.VMI_VDS_VIS}`);
            console.log(`Manufacturer: ${vehicleInfo.Manufacturer}`);
            console.log(`Brand: ${vehicleInfo.Brand}`);
            console.log(`Model: ${vehicleInfo.Model}`);
            console.log(`Engine: ${vehicleInfo.Engine}`);
            console.log(`Year: ${vehicleInfo.Year}`);
            console.log(`Trim: ${vehicleInfo.Trim}`);

            // Call the callback function after data is displayed
            callback();
            // Wait 200ms before calling the callback (prompting for new VIN)
            setTimeout(callback, 200);
        })
        .catch(error => {
            console.error(`Error fetching data: ${error.message}`);
            // Call the callback function in case of an error too
            callback();
            // Wait 200ms before calling the callback (prompting for new VIN)
            setTimeout(callback, 200);
        });
};

// Function to repeatedly prompt for VIN input
const promptForVIN = () => {
    rl.question('Please enter the VIN (or type "exit" to quit): ', (vin) => {
        if (vin.toLowerCase() === 'exit') {
            console.log('Exiting program...');
            rl.close(); // Close the readline interface
        } else {
            if (isValidVIN(vin)) {
                fetchVehicleData(vin, promptForVIN); // Fetch data and then prompt for another VIN
            } else {
                console.log('Invalid VIN. Please make sure the VIN is 17 characters long and contains no I, O, or Q.');
                promptForVIN(); // Prompt for another VIN immediately if invalid
            }
        }
    });
};

// Start the VIN input loop
promptForVIN();
