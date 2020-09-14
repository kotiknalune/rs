const googleAPIKey = 'AIzaSyCnwl8p6jt-14MNzcgDjjVSV6mXzKgwQ1M';
export const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&callback=initMap`;
export const googleMapZoom = 16;

const weatherAPI = '0ee413255ff24988a33cf7a7d9bb4b24';
const part = 'minutely,hourly';
export const numberOfDaysToShow = 3;
export const weatherURL = (latitude, longitude) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&units=metric&appid=${weatherAPI}`;
};

const unsplashApiKey = 'ypFqLnCvcljZIC6ndS63o8fmWmmtqkLzLZ8E98uYVio';
export const defaultImageQuery = 'nature';
export const backgroundURL = (searchQuery) => {
  return `https://api.unsplash.com/photos/random?query=${searchQuery}&client_id=${unsplashApiKey}`;
};

export const googleGeolocationURL = (latitude, longitude) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?&latlng=${latitude},${longitude}&key=${googleAPIKey}`;
};

export const politicalLocationQuery = { country: 'country', city: 'locality' };
export const imageErrorMessage = 'Could not fetch data, showing default background image';
