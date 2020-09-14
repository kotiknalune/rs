
// export const translateTitle = (title, language) => vocabulary[title][language];

export const getLocalDate = (state) => {
  const timeZone = state.location.data.results[0].annotations.timezone.name;
  const options = {
    timeZone,
    hour12: false,
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const dateString = new Date().toLocaleString('en-US', options);
  const dateArr = dateString.split(',').map((item) => item.trim());

  return {
    weekDay: dateArr[0],
    month: dateArr[1].split(' ')[0],
    day: dateArr[1].split(' ')[1],
    time: dateArr[2],
    hour: dateArr[2].split(':')[0]
  };
};

export const classNames = {
  active: 'active',
  HIDDEN: 'hidden',
  HIDE: 'hide',
  SEARCH: {
    FORM: 'search__form',
    INPUT: 'search__input'
  }
};

const geolocationAPI = {
  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },
  getCoordinates: (options = geolocationAPI.options) => new Promise((resolve, reject) => navigator
    .geolocation.getCurrentPosition(resolve, reject, options))
    .then((position) => position.coords)
};
export default geolocationAPI;


import backgroundImage from '../../../main/assets/img/background.jpg';

export const DEFAULT_BG_IMAGE = backgroundImage;
export const DEFAULT_LANGUAGE = 'en';
export const STORAGE_NAME = 'storage';

//

export const spinner = document.querySelector('.spinner');
export const toggleDocumentScroll = (className = 'overflow-hidden') => {
  document.body.classList.toggle(className);
};

// Запрос на картинки: ключевое слово - Brest, теги - night,summer
// Model.js:239 Всего фото нужного формата по запросу 19
// api-flickr-service.js:18 Запрос на картинки: ключевое слово - Cupertino, теги - morning,summer
// Model.js:243 Нет картинок. Новый более общий запрос без тегов morning,summer
// api-flickr-service.js:18 Запрос на картинки: ключевое слово - Cupertino, теги -
