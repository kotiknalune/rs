import {
  keyboardBtn, keyboardContainer, submitBtn, initSearch, resetBtn
} from '../constants/searchbar.constants';
import { SearchbarComponent } from '../components/Searchbar.component';
import { KeyboardComponent } from '../components/Keyboard.component';

import { mySwiper, slideSwapper } from '../constants/swiper.constants';
import { searchFormInput } from '../constants/searchbar.constants';

const splash = document.querySelector('.splash');
const loader = document.querySelector('.loader-wrapper');
let page = 1;

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { splash.classList.add('no-opacity'); }, 1000);
  setTimeout(() => { loader.classList.remove('show-loader'); }, 2000);
});

const searchbar = new SearchbarComponent();
searchbar.findMovies(initSearch);

function runSearch(event) {
  event.preventDefault();
  searchbar.findMovies(searchFormInput.value);
  page = 1;
  loader.classList.add('show-loader');
  setTimeout(() => { loader.classList.remove('show-loader'); }, 1500);
}

submitBtn.addEventListener('click', function submitSearch(e) {
  runSearch(e);
});

resetBtn.addEventListener('click', function resetSearchInput() {
  searchFormInput.value = '';
  searchFormInput.focus();
});

mySwiper.swiper.on('reachEnd', function getNextPage() {
  if (slideSwapper.childElementCount === 0) {
    return;
  }
  if (page < searchbar.totalPages) {
    page += 1;
    searchbar.findMovies(searchFormInput.value || initSearch, page);
  }
});

let focused = document.hasFocus();
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    if (!focused) {
      mySwiper.swiper.slidePrev();
    }
  }
  if (e.code === 'ArrowRight') {
    if (!focused) {
      mySwiper.swiper.slideNext();
    }
  }
  if (e.code === 'Enter') runSearch(e);
});

function createKeyboard() {
  const keyboard = new KeyboardComponent();
  return keyboard;
}

function EnterKeyHandler() {
  const searchRequest = searchFormInput.value;
  searchbar.findMovies(searchRequest);
  keyboardContainer.classList.remove('show-keyboard');
}

keyboardBtn.addEventListener('click', () => {
  if (keyboardContainer.children.length < 1) {
    createKeyboard();
    keyboardContainer.classList.add('show-keyboard');

    const keyboardEnterKey = document.querySelector('.enter');
    keyboardEnterKey.onclick = () => {
      EnterKeyHandler();
    };
  } else {
    keyboardContainer.classList.remove('show-keyboard');
    setTimeout(() => { keyboardContainer.innerHTML = ''; }, 300);
  }
});
