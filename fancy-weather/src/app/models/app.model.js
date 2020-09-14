import moment from 'moment';
import { GeolocationService } from '../services/Geolocation.service';
import { ApiMapService } from '../services/API.Map.service';
import { ApiCovidService } from '../services/API.Covid.service';
import { ApiWeatherService } from '../services/API.Weather.service';
import { ApiUnsplashService } from '../services/API.Unsplash.service';
import {
  fahrenheitButton, celsiusButton, updateBGImageButton, locationTracking, playButton,
  pauseButton, speechButton, searchButton, listener, controls, activeClass, addActiveClass,
  removeActiveClass, languageButtons
} from '../constants/button.constants';

import {
  degreeFormat, currentLocation, updateWeatherInformation, timeOfDayByHour, seasonsByQuarters
} from '../constants/forecast.constants';
import { convertDegrees, getMessage } from '../utils/weather.utils';
import {
  getSetting, updateCovidInformation, updateTime, updateCoordinates
} from '../utils/general.utils';

import { english } from '../international/en.translation.json';
import { russian } from '../international/ru.translation.json';
import { belarusian } from '../international/by.translation.json';

import { appSettings, temperatureFormats } from '../configs/app.config';
import { defaultImageQuery } from '../configs/service.config';


class Model {
  constructor() {
    this.searchForm = document.querySelectorAll('form');
    this.geolocation = new GeolocationService();

    this.buttons = {
      celsius: celsiusButton,
      fahrenheit: fahrenheitButton,
      currentLocation: locationTracking,
      refreshBackground: updateBGImageButton,
      play: playButton,
      pause: pauseButton,
      speech: speechButton,
      search: searchButton
    };

    this.languages = {
      english: english,
      russian: russian,
      belarusian: belarusian
    };

    this.listener();
    return Model.model;
  }

  listener() {
    controls.addEventListener(listener, (event) => {
      let target = event.target.classList;
      const { buttons } = this;

      if (target.contains('button_c') && !target.contains(activeClass)) {
        convertDegrees(temperatureFormats.celsius);
        degreeFormat.textContent = temperatureFormats.celsius;
        addActiveClass(buttons.celsius);
        removeActiveClass(buttons.fahrenheit);
        getSetting('temperatureFormat', temperatureFormats.celsius);
      }

      if (target.contains('button_f') && !target.contains(activeClass)) {
        convertDegrees(temperatureFormats.fahrenheit);
        degreeFormat.textContent = temperatureFormats.fahrenheit;
        addActiveClass(buttons.fahrenheit);
        removeActiveClass(buttons.celsius);
        getSetting('temperatureFormat', temperatureFormats.fahrenheit);
      }

      if (target.contains('button_language')) {
        languageButtons.forEach((button) => { removeActiveClass(button); });
        localStorage.setItem('language', event.target.textContent);

        if (target.contains(localStorage.getItem('language'))) {
          addActiveClass(event.target);
        }
      }
    });

    const input = document.querySelector('.search__input');
    input.placeholder = 'Search you town...';
    document.querySelector('.button_search').addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = input.value;
      const lang = localStorage.getItem('language');
      console.log(inputValue, lang);
      this.loadSearchWeather(inputValue, lang);
    });
  }

  async loadSearchWeather(inputValue, lang) {
    const searchData = await Model.getLocationByQuery(inputValue, lang);
    if (searchData.length === 0) throw new Error('No results');

    const results = searchData.results.sort((a, b) => a.confidence - b.confidence);
    const coords = { latitude: results[0].geometry.lat, longitude: results[0].geometry.lng };
    const weather = await this.loadAllData(coords);

    if (!weather) throw new Error('No weather data found');
  }

  static async getLocationByQuery(query, lang = 'en') {
    const opencageAPI = '81d20b4e7ea1479fa85627d5f5598c80';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${opencageAPI}&language=${lang}&pretty=1`;

    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error('Could not fetch data from opencagedata.com');
      return await result.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async loadAllData(coords) {
    const coordinates = coords || await this.geolocation.getCoordinates();

    let map = new ApiMapService(coordinates.latitude, coordinates.longitude);
    map.renderMap();

    const location = await map.getPoliticalLocation();
    currentLocation.textContent = `${location.city}, ${location.country}`;

    const covid = new ApiCovidService(location.country);
    const covidCurrentStats = await covid.getCovidStats();

    const weather = new ApiWeatherService(coordinates.latitude, coordinates.longitude);
    const weatherData = await weather.getWeatherForecast();

    updateCoordinates(coordinates);
    updateCovidInformation(covidCurrentStats);
    updateWeatherInformation(weatherData);
    Model.createAudioMessage(weatherData);

    const offset = weatherData.timezone_offset;
    updateTime(offset);

    const timeOfDay = timeOfDayByHour(moment().utcOffset(offset).format('H'));
    const season = seasonsByQuarters(moment().format('M'));
    return `${timeOfDay}-${season}` || defaultImageQuery;
  }

  refreshBackground(searchQuery) {
    this.buttons.refreshBackground.addEventListener(listener, async () => {
      const reload = document.querySelector('.reload');
      reload.classList.add('spin');

      const unsplashService = new ApiUnsplashService(searchQuery);

      const link = await unsplashService.getLinkToImage();
      const newImage = new Image();
      newImage.src = link;

      const imageLoad = setInterval(() => {
        if (newImage.complete) {
          clearInterval(imageLoad);
          document.querySelector('body').style.backgroundImage = `url(${newImage.src})`;
        }
      }, 0);
      reload.classList.remove('spin');
    });
  }

  static createAudioMessage(data) {
    const lang = localStorage.getItem('language');
    const units = localStorage.getItem('temperatureFormat');
    const message = getMessage(lang, units, data.current);

    localStorage.setItem('message', message);
  }

  setInitSettings() {
    Object.entries(appSettings).forEach((pair) => {
      if (!localStorage.getItem(pair[0])) {
        localStorage.setItem(pair.shift(), pair.shift());
      }
    });

    if (localStorage.getItem('temperatureFormat') === temperatureFormats.celsius) {
      addActiveClass(this.buttons.celsius);
      removeActiveClass(this.buttons.fahrenheit);
    } else {
      convertDegrees(temperatureFormats.fahrenheit);
      addActiveClass(this.buttons.fahrenheit);
      removeActiveClass(this.buttons.celsius);
    }
    const activeLanguage = document.querySelector(`.${localStorage.getItem('language')}`);
    addActiveClass(activeLanguage);

    this.geolocation.getCurrentPosition();
  }

  async init() {
    this.setInitSettings();

    const loader = document.querySelector('.load-screen');
    setTimeout(() => { loader.style.display = 'none'; }, 3000);

    window.addEventListener('DOMContentLoaded', async () => {
      this.refreshBackground(await this.loadAllData());
    });
  }
}

const model = new Model();
Object.freeze(model);
export default model;
