import Swiper from 'swiper';

export const swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    630: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1020: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1536: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  },
  initialSlide: 0,
  preloadImages: true,
  observer: false,
  updateOnImagesReady: true,
  watchSlidesVisibility: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar'
  },
  mousewheel: {
    invert: false,
    sensitivity: 1
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});
