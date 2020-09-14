import { weatherURL } from '../configs/service.config';
import { queryResultMessage } from '../utils/errors';

export class ApiWeatherService {
  constructor(latitude, longitude) {
    this.url = weatherURL(latitude, longitude);
  }

  // eslint-disable-next-line consistent-return
  async getWeatherForecast() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (err) {
      queryResultMessage(err.message);
    }
  }
}
