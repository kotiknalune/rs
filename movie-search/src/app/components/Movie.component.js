class MovieComponent {
  constructor(movie) {
    this.movie = movie;
    this.title = movie.Title;
    this.year = movie.Year;
    this.poster = movie.Poster === 'N/A' ? null : movie.Poster;
    this.plot = movie.Plot;
    this.rating = movie.imdbRating === 'N/A' ? '0.0' : movie.imdbRating;
    this.genre = movie.Genre;
    this.url = `https://www.imdb.com/title/${movie.imdbID}`;
  }

  createMovieSlide() {
    const slide = MovieComponent.createDOMElement('div', ['swiper-slide']);
    const movieTitle = MovieComponent.createDOMElement('h2', ['movie-title'], `<a href="${this.url}" target="_blank">${this.title}</a>`);
    movieTitle.dataset.tooltip = this.title;
    const posterWrapper = MovieComponent.createDOMElement('div', ['poster-wrapper']);
    const moviePoster = MovieComponent.createDOMElement('img', ['movie-poster']);
    moviePoster.src = this.poster;
    moviePoster.alt = this.title;

    const movieInfo = MovieComponent.createDOMElement('div', ['movie-info'],
      `<div class="movie-year">${this.year}</div>
      <div class="movie-rating">${this.rating}</div>`);

    const modalButton = MovieComponent.createDOMElement('div', ['movie-more'], '<a href="#"><i class="fas fa-binoculars"></i><span>More info</span></a>');

    const movieModal = MovieComponent.createDOMElement('div', ['modal', 'hide'],
      `<h3 class="modal__title">Movie plot</h3>
      <p class="modal__genre">Genre: ${this.genre}</p>
      <p class="modal__text">${this.plot}</p>
      <a href="${this.url}" target="_blank" class="modal__link">Open in IMDB</a>`);

    const closeModal = MovieComponent.createDOMElement('button', ['modal__button'], '<i class="fas fa-times"></i>');

    slide.appendChild(movieTitle);

    slide.appendChild(posterWrapper);
    posterWrapper.appendChild(moviePoster);

    slide.appendChild(movieInfo);
    movieInfo.appendChild(modalButton);

    slide.appendChild(movieModal);
    movieModal.appendChild(closeModal);

    modalButton.onclick = () => {
      movieModal.classList.remove('hide');
    };

    closeModal.onclick = () => {
      movieModal.classList.add('hide');
    };
    return slide;
  }

  static createDOMElement(type, classes, inner = null) {
    const element = document.createElement(type);
    classes.forEach((newClass) => {
      element.classList.add(newClass);
    });
    if (inner != null) element.innerHTML = inner;
    return element;
  }
}

export default MovieComponent;
