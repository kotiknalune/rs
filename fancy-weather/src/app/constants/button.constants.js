export const activeClass = 'active';
const inactiveClass = 'inactive';

export const addActiveClass = (el) => {
  el.classList.add(activeClass);
  el.classList.remove(inactiveClass);
};
export const removeActiveClass = (el) => {
  el.classList.add(inactiveClass);
  el.classList.remove(activeClass);
};

export const listener = 'click';
export const controls = document.querySelector('.controls');

export const locationTracking = document.querySelector('.button_current-location');
export const updateBGImageButton = document.querySelector('.button_update');

export const voiceForecastButton = document.querySelector('.button__voice-play');
// voiceForecastButton.addEventListener(listener, console.log('Activated voice forecast...'));

// const controls = document.querySelector('.controls');
export const celsiusButton = document.querySelector('.button_c');
export const fahrenheitButton = document.querySelector('.button_f');
// const degreeItems = document.querySelectorAll('.degree');
// const degreeFormat = document.querySelector('.degree-format');

export const languageButtons = document.querySelectorAll('.button_language');

export const russianLanguageButton = document.querySelector('.ru');
export const englishLanguageButton = document.querySelectorAll('.en');
export const belarusianLanguageButton = document.querySelectorAll('.be');
