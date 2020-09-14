
export const degreeItems = document.querySelectorAll('.degree');
export const degreeFormat = document.querySelector('.degree-format');

export const currentTemperature = document.querySelector('.degrees');
export const currentDetails = document.querySelector('.forecast-details');
export const wind = document.querySelector('.wind');
export const humidity = document.querySelector('.humidity');
export const apparentTemperature = document.querySelector('.apparent > .degree');
export const weatherIcon = document.querySelector('.weather-icon');

export let currentTime = document.querySelector('.time').textContent;
export const currentLocation = document.querySelector('.location');
const forecast1 = document.querySelector('.next1 > h2');
const forecast2 = document.querySelector('.next2 > h2');
const forecast3 = document.querySelector('.next3 > h2');

const max1 = document.querySelector('.next1 > .high_temp > span');
const max2 = document.querySelector('.next2 > .high_temp > span');
const max3 = document.querySelector('.next3 > .high_temp > span');

const min1 = document.querySelector('.next1 > .low_temp > span');
const min2 = document.querySelector('.next2 > .low_temp > span');
const min3 = document.querySelector('.next3 > .low_temp > span');

const icon1 = document.querySelector('.next1 > img');
const icon2 = document.querySelector('.next2 > img');
const icon3 = document.querySelector('.next3 > img');

export function updateWeatherInformation(data) {
  currentTemperature.textContent = Math.round(data.current.temp);
  currentDetails.textContent = data.current.weather[0].description;
  weatherIcon.src = `/src/assets/weather-icons/${data.current.weather[0].main}.svg`;
  weatherIcon.alt = data.current.weather[0].main;
  wind.textContent = `${data.current.wind_speed} m/s`;
  humidity.textContent = `${data.current.humidity}%`;
  apparentTemperature.textContent = Math.round(data.current.feels_like);

  forecast1.textContent = Math.round(data.daily[1].temp.day);
  forecast2.textContent = Math.round(data.daily[2].temp.day);
  forecast3.textContent = Math.round(data.daily[3].temp.day);

  max1.textContent = Math.round(data.daily[1].temp.max);
  max2.textContent = Math.round(data.daily[2].temp.max);
  max3.textContent = Math.round(data.daily[3].temp.max);

  min1.textContent = Math.round(data.daily[1].temp.min);
  min2.textContent = Math.round(data.daily[2].temp.min);
  min3.textContent = Math.round(data.daily[3].temp.min);

  icon1.src = `/src/assets/weather-icons/${data.daily[1].weather[0].main}.svg`;
  icon2.src = `/src/assets/weather-icons/${data.daily[2].weather[0].main}.svg`;
  icon3.src = `/src/assets/weather-icons/${data.daily[3].weather[0].main}.svg`;
}

export const seasonsByQuarters = (month) => {
  switch (month) {
    case 0 || 1 || 11:
      return 'winter';
    case 2 || 3 || 4:
      return 'spring';
    case 5 || 6 || 7:
      return 'summer';
    case 8 || 9 || 10:
      return 'autumn';
    default:
      return 'summer';
  }
};

export const timeOfDayByHour = (hour) => {
  switch (hour) {
    case 8 || 9 || 10 || 11:
      return 'sunrise';
    case 12 || 13 || 14 || 15:
      return 'noon';
    case 16 || 17 || 18:
      return 'afternoon';
    case 19 || 20 || 21 || 22:
      return 'sunset';
    case 23 || 0 || 1 || 2 || 3:
      return 'night';
    case 4 || 5 || 6 || 7:
      return 'darn';
    default:
      return 'sunset';
  }
};
