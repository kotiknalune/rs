import {
  googleMapURL, googleMapZoom, googleGeolocationURL, politicalLocationQuery
} from '../configs/service.config';
import { googleMapElement } from '../constants/map.constants.js';

export class ApiMapService {
  constructor(latitude, longitude) {
    this.coordinates = {
      latitude: latitude,
      longitude: longitude
    };

    this.location = {
      city: '',
      country: ''
    };

    this.map = '';
  }

  renderMap() {
    const script = document.createElement('script');
    script.src = googleMapURL;
    script.defer = true;
    script.async = true;

    window.initMap = () => {
      const google = window.google;
      // eslint-disable-next-line no-unused-vars
      const map = new google.maps.Map(googleMapElement, {
        center: { lat: this.coordinates.latitude, lng: this.coordinates.longitude },
        zoom: googleMapZoom,
        disableDefaultUI: true
      });

      // eslint-disable-next-line no-unused-vars
      const marker = new google.maps.Marker({ position: map.center, map: map });
    };
    document.head.appendChild(script);
  }
  
  async getPoliticalLocation() {
    const url = googleGeolocationURL(this.coordinates.latitude, this.coordinates.longitude);
    const result = await fetch(url);
    const data = await result.json();

    const getLocation = (type) => data.results.shift().address_components.flat()
      .find(it => it.types.flat().includes(type)).long_name;

    this.location.city = getLocation(politicalLocationQuery.city);
    this.location.country = getLocation(politicalLocationQuery.country);

    return this.location;
  }
}
