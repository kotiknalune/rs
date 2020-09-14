require('regenerator-runtime/runtime');

import MovieComponent from './Movie.component';
import { mySwiper } from '../constants/swiper.constants';
import { totalResults } from '../constants/searchbar.constants';

export class APIComponent {
  constructor() {
    this.apiKey = '6ce8a0a9';
    this.yandexKey = 'trnsl.1.1.20200502T182230Z.99beeb46bff5755c.0463ba8e34189878ed9cbd03b3889ad4c818fdce';
  }

  async getMovieById(id) {
    const url = `https://www.omdbapi.com/?i=${id}&type=movie&plot=short&apikey=${this.apiKey}`;

    const result = await fetch(url);
    const data = await result.json();
    const newMovie = new MovieComponent(data);
    return newMovie.createMovieSlide();
  }

  createMovieSlide(id) {
    const movieSlide = this.getMovieById(id);
    const promise = Promise.resolve(movieSlide);

    promise.then((slide) => {
      mySwiper.swiper.appendSlide(slide);
    });
  }

  async getMoviesList(search, page) {
    const searchResult = [];
    const url = `https://www.omdbapi.com/?s=${search}&type=movie&page=${page}&apikey=${this.apiKey}`;

    const response = await fetch(url);
    await response.text().then(text => {
      searchResult.push(text);
    });
    return JSON.parse(searchResult);
  }

  async getTranslation(search) {
    const arr = [];
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.yandexKey}&text=${search}&lang=ru-en`;

    let response = await fetch(url);
    await response.text().then(text => {
      arr.push(text);
    });

    if (!response.ok) {
      totalResults.classList.add('alert');
      totalResults.innerHTML = `<p>Oops, looks like an error...</p><p>Yandex API - ${response.status}</p>`;
    }
    const translation = await (JSON.parse(arr));
    return translation.text[0];
  }
}
