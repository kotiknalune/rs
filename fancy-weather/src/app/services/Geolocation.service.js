import { addActiveClass, locationTracking } from '../constants/button.constants';
import { queryResultMessage } from '../utils/errors';

export class GeolocationService {
  constructor() {
    this.geolocation = navigator.geolocation;
  }

  async getCoordinates() {
    try {
      const { coords } = await this.getCurrentPosition();
      const { latitude, longitude } = coords;

      const currentLocation = await {
        latitude: latitude,
        longitude: longitude
      };
      return currentLocation;
    } catch (err) {
      queryResultMessage(err.message);
      return false;
    }
  }

  getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition(resolve, reject, options);
      this.geolocation.watchPosition(() => {
        addActiveClass(locationTracking);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) queryResultMessage(err.message);
      });
    });
  }
}
