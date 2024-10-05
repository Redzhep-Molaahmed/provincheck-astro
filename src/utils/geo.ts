export async function getLocation(ip) {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return data.countryCode;
  }