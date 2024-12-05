export const getDirectionsUrl = (address: string): string => {
  // Check if the user is on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Encode the address for use in URL
  const encodedAddress = encodeURIComponent(address);
  
  // Return the appropriate maps URL based on platform
  if (isIOS) {
    return `maps://?daddr=${encodedAddress}`;
  }
  
  // Default to Google Maps
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
};