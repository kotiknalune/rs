import { degreeItems } from '../constants/forecast.constants';
import { temperatureFormats, languages } from '../configs/app.config';


export const showQueryDetailsInConsole = (query) => {
  console.log(`Keywords of image search query: ${query}`);
};

export function convertDegrees(degree) {
  degreeItems.forEach((item) => {
    const previousDegreeValue = item.textContent;
    let newDegreeValue = '';
    if (degree === temperatureFormats.celsius) {
      newDegreeValue = Math.round((previousDegreeValue * 9) / 5 + 32);
    }
    if (degree === temperatureFormats.fahrenheit) {
      newDegreeValue = Math.round(((previousDegreeValue - 32) * 5) / 9);
    }
    // eslint-disable-next-line no-param-reassign
    item.textContent = newDegreeValue;
  });
}

const enTemplate = (data, units) => {
  let unitName = '';
  unitName = (units === temperatureFormats.celsius) ? 'celsius' : 'fahrenheit';
  console.log(data);
  return `
  Today you should expect ${data.weather[0].description} and average temperature of ${Math.round(data.temp)} degrees ${unitName}.
  Although it feels like a ${Math.round(data.feels_like)} alright! The air's humidity is at ${data.humidity} percent
  and barometers shows ${data.pressure} millibar. Don't forget your sunscreen, the UV indicator is at ${Math.round(data.uvi)} today.
  And remember, stay home - stay safe.`;
};

const ruTemplate = (data, units) => {
  console.log(data, units);
};

export function getMessage(lang, units, data) {
  let message = '';
  message = (lang === languages.english) ? enTemplate(data, units) : ruTemplate(data, units);
  return message;
}
