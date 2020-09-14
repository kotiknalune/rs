import { backgroundURL, defaultImageQuery } from '../configs/service.config';
import { queryResultMessage } from '../utils/errors';
import { showQueryDetailsInConsole } from '../utils/weather.utils';

export class ApiUnsplashService {
  constructor(searchQuery) {
    this.query = searchQuery || defaultImageQuery;
    this.url = backgroundURL(this.query);
  }

  // eslint-disable-next-line consistent-return
  async getLinkToImage() {
    try {
      const result = await fetch(this.url);
      const data = await result.json();
      const imageLink = await data.urls.regular;
      showQueryDetailsInConsole(this.query);
      return imageLink;
    } catch (err) {
      queryResultMessage(err.message);
    }
  }
}
