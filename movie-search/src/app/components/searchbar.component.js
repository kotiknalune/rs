import {
  searchFormInput, searchText, totalResults, initSearch, currentPage
} from '../constants/searchbar.constants';
import { mySwiper } from '../constants/swiper.constants';
import { APIComponent } from './API.component';

export class SearchbarComponent {
  constructor() {
    this.input = searchFormInput;
    this.value = '';
    this.api = new APIComponent();
    this.totalPages = 0;
  }

  async findMovies(search, page = 1) {
    totalResults.classList.remove('alert');

    this.value = this.input.value;
    let request = (search === initSearch) ? initSearch : await this.checkLanguage(this.value);
    let result = [];

    if (request.length !== 0) {
      result = this.api.getMoviesList(request, page)
        .then((data) => {
          SearchbarComponent.clearSearchFeedback();
          this.generateMovieSlides(data, request, page);

          searchText.innerHTML = `<p>Search results for <span class="search-text__query">${request}</span></p>`;
          totalResults.textContent = `Found ${data.totalResults} results`;
          this.totalPages = (data.totalResults) ? Math.ceil(data.totalResults / 10) : 0;
          currentPage.textContent = `${page} / ${this.totalPages}`;


          if (data.Response === 'False') {
            if (data.Error === 'Movie not found!') {
              searchText.innerHTML = `<p>No results found for <span class="search-text__query">${request}</span></p>`;
            } else if (data.Error !== 'Movie not found!') {
              totalResults.classList.add('alert');
              totalResults.innerHTML = `<p>Oops, looks like an error...</p><p>${data.Error}</p>`;
            }
          }
        });
    }
    return result;
  }

  generateMovieSlides(searchData, inputValue, pageNumber) {
    if (searchData.Response === 'True') {
      if (pageNumber === 1) {
        sessionStorage.clear();
        mySwiper.swiper.removeAllSlides();
      }
      const movieList = searchData.Search;
      movieList.forEach((movie) => {
        this.handleDuplicates(movie.imdbID, pageNumber);
      });
    }
  }

  handleDuplicates(id, page) {
    if (sessionStorage.getItem(id) === null) {
      sessionStorage.setItem(id, page);
      this.api.createMovieSlide(id);
    }
  }

  static clearSearchFeedback() {
    searchText.textContent = '';
    totalResults.textContent = '';
    currentPage.textContent = '';
  }

  async checkLanguage(input) {
    if (/[а-яА-ЯЁё]/.test(input)) {
      let translation = await this.api.getTranslation(input);
      return translation;
    }
    return input;
  }
}
