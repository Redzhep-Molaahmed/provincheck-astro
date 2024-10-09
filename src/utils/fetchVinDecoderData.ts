const apiPrefix = "https://api.vindecoder.eu/3.2";
const apiKey = "7bc77c0017fd"; // Your API key
const secretKey = "b59a7d850d"; // Your secret key
const id = "decode";

// Helper function to compute SHA-1 hash in JavaScript
const sha1Hash = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").substring(0, 10);
};

// Fetch vehicle data from VIN decoder API
export const fetchVinDecoderData = async (vin) => {
  try {
    const controlSum = await sha1Hash(`${vin}|${id}|${apiKey}|${secretKey}`);
    const apiUrl = `${apiPrefix}/${apiKey}/${controlSum}/decode/${vin}.json`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    //If Error is returned from the API, throw an error
    if (data.error) {
      return { vehicleDetails: null, error: data.error };
    }

    // Process and map relevant vehicle details
    // Process and map relevant vehicle details
    const vehicleDetails = data.decode.reduce((details, item) => {
        // Check if the item has both 'label' and 'value' properties before proceeding
        if (item && item.label && typeof item.value !== 'undefined') {
        details[item.label] = item.value || 'N/A';
        }
        return details;
    }, {});
    return { vehicleDetails, error: null }; // Return fetched vehicle data
  } catch (err) {
    return { vehicleDetails: null, error: err.message };
  }
};
