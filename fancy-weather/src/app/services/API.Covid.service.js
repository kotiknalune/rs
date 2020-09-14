import { queryResultMessage } from '../utils/errors';

export class ApiCovidService {
  constructor(country) {
    this.url = `https://api.covid19api.com/country/${country}`;
  }

  async getCovidStats() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      const stats = await data.pop();

      let currentStats = {
        confirmed: stats.Confirmed || 0,
        recovered: stats.Recovered || 0,
        deceased: stats.Deaths || 0
      };

      return currentStats;
    } catch (err) {
      queryResultMessage(err.message);
      return false;
    }
  }
}
