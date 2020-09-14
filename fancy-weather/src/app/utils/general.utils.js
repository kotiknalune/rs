import moment from 'moment';
import { appSettings } from '../configs/app.config';
import { covidStatus } from '../constants/covid.constants';
import { coordinatesLatitude, coordinatesLongitude } from '../constants/map.constants';

export const getKey = (obj, val) => Object.keys(obj).find(key => obj[key] === val);

function formatNumber(number) {
  const formattedNumber = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
  return formattedNumber;
}

const roundCoordinate = (coordinate) => {
  return Math.round((coordinate + Number.EPSILON) * 100) / 100;
};

export function updateCoordinates(coords) {
  coordinatesLatitude.textContent = `${roundCoordinate(coords.latitude)}°`;
  coordinatesLongitude.textContent = `${roundCoordinate(coords.longitude)}°`;
}

export function updateCovidInformation(stats) {
  covidStatus.confirmed.textContent = formatNumber(stats.confirmed);
  covidStatus.recovered.textContent = formatNumber(stats.recovered);
  covidStatus.deceased.textContent = formatNumber(stats.deceased);
}

let timer = 0;
export const updateTime = (offset) => {
  const newOffset = offset;
  const update = () => {
    document.querySelector('.time').textContent = `${moment().utcOffset(newOffset).format('LTS')}`;
  };
  const setTimer = () => {
    if (timer > 0) window.clearInterval(timer);
    timer = setInterval(update, 1000);
  };
  setTimer();
};

export function getSetting(key, setting) {
  const isSet = localStorage.getItem(key);

  if (setting && isSet) localStorage.setItem(key, setting);
  if (!isSet) localStorage.setItem(key, appSettings[key]);

  return localStorage.getItem(key);
}
