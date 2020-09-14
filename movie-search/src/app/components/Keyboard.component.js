import keys from '../helpers/keys.helper';
import { searchFormInput } from '../constants/searchbar.constants';

export class KeyboardComponent {
  constructor() {
    this.elements = {
      container: null,
      textarea: searchFormInput,
      keyboard: null,
      keys: []
    };

    this.properties = {
      value: '',
      capsLock: false,
      language: localStorage.getItem('lang')
    };

    this.codes = keys.code;
    this.init();
  }

  init() {
    this.createElements();
    this.handleClicks();
  }

  createElements() {
    const { elements } = this;
    elements.container = document.querySelector('.virtual-keyboard');

    const onScreenKeyboard = document.createElement('div');
    onScreenKeyboard.classList.add('onscreen-keyboard');
    elements.keyboard = onScreenKeyboard;

    elements.container.append(elements.keyboard);
    elements.keyboard.append(this.createKeys());
    elements.keys = this.elements.keyboard.querySelectorAll('.keyboard__key');
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const { properties } = this;

    this.code = keys.code;
    this.en = keys.en;
    this.enShift = keys.enShift;
    this.ru = keys.ru;
    this.ruShift = keys.ruShift;

    let keysLayout;
    if (properties.language === 'en') {
      keysLayout = this.en;
    } else keysLayout = this.ru;

    const functionKeys = ['Space', 'Backspace', 'Caps Lock', 'Enter', 'Tab'];

    keysLayout.forEach((key, i) => {
      const keyElement = document.createElement('button');
      keyElement.classList.add('keyboard__key');
      keyElement.setAttribute('type', 'button');
      keyElement.dataset.code = this.code[keysLayout.indexOf(key, i)];

      if (key === '') {
        keyElement.classList.add('change-language');
      }

      if (key === '◄' || key === '►') {
        keyElement.classList.add('arrow');
        keyElement.textContent = key;
      }

      if (functionKeys.includes(key)) {
        keyElement.classList.add(key.toLowerCase().split(' ')[0]);
        keyElement.textContent = '';
      } else {
        keyElement.textContent = key.toLowerCase();
      }

      fragment.appendChild(keyElement);
    });
    return fragment;
  }

  handleClicks() {
    const { elements, properties } = this;

    elements.keyboard.onclick = (event) => {
      elements.textarea.focus();
      properties.value = searchFormInput.value;

      const target = event.target;
      const key = target.dataset.code;

      const char = target.textContent;

      if (!target.className.includes('keyboard__key')) {
        return;
      }

      switch (key) {
        case 'MetaLeft':
          this.changeLanguage();
          break;

        case 'ArrowLeft':
          this.updateCursorPosition('remove');
          break;

        case 'ArrowRight':
          this.updateCursorPosition('add');
          break;

        case 'Tab':
          this.updateText('    ');
          this.updateCursorPosition('tab');
          break;

        case 'Space':
          this.updateText(' ');
          this.updateCursorPosition('add');
          break;

        case 'CapsLock':
          this.toggleCaps();
          break;

        case 'Backspace':
          this.handleBackspace();
          break;

        default:
          this.updateText(char);
          this.updateCursorPosition('add');
          this.updateInputValue();
          break;
      }
    };
  }

  updateText(value) {
    const str = this.properties.value;
    const start = this.elements.textarea.selectionStart;
    this.properties.value = str.substring(0, start) + value + str.substring(start, str.length);
  }

  changeLanguage() {
    const { properties, elements } = this;
    properties.language = properties.language === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', properties.language);

    elements.keys.forEach((keyboardKey, i) => {
      let k = keyboardKey;
      if (k.textContent.length > 0) {
        if (properties.language === 'en' && !properties.capsLock) {
          k.textContent = keys.en[i];
        }
        if (properties.language === 'ru' && !properties.capsLock) {
          k.textContent = keys.ru[i];
        }
        if (properties.language === 'en' && properties.capsLock) {
          k.textContent = keys.enShift[i];
        }
        if (properties.language === 'ru' && properties.capsLock) {
          k.textContent = keys.ruShift[i];
        }
      }
    });
  }

  updateInputValue() {
    this.elements.textarea.value = this.properties.value;
  }

  toggleCaps() {
    const { properties, elements } = this;
    properties.capsLock = !properties.capsLock;
    elements.keys.forEach((key, i) => {
      let k = key;

      if (properties.capsLock) {
        k.textContent = k.textContent.toUpperCase();
        if (i < 13) {
          k.textContent = keys.enShift[i];
        }
      }
      if (!properties.capsLock) {
        k.textContent = k.textContent.toLowerCase();
        if (i < 13) {
          k.textContent = keys.en[i];
        }
      }
    });
  }

  updateCursorPosition(mode) {
    const { elements, properties } = this;
    let selection = 0;

    switch (mode) {
      case 'add':
        selection = elements.textarea.selectionStart + 1;
        break;
      case 'tab':
        selection = elements.textarea.selectionStart + 4;
        break;
      case 'remove':
        selection = elements.textarea.selectionStart - 1;
        break;
      default:
        selection = elements.textarea.selectionStart;
        break;
    }
    elements.textarea.value = properties.value;
    elements.textarea.selectionStart = selection;
    elements.textarea.selectionEnd = selection;
  }

  handleBackspace() {
    let end = this.elements.textarea.selectionEnd;
    let start = this.elements.textarea.selectionStart;
    let str = this.properties.value;
    let selectedText = str.substring(start, end);

    if (selectedText.length > 0) {
      this.properties.value = str.replace(selectedText, '');
      this.updateCursorPosition();
      return;
    }

    if (start > 0) {
      if (end === start) {
        this.properties.value = str.substring(0, start - 1) + str.substring(start, str.length);
        this.updateCursorPosition('remove');
      } else {
        this.properties.value = str.substring(0, start) + str.substring(end, str.length);
        this.updateCursorPosition();
      }
    } else {
      this.updateCursorPosition();
    }
  }
}
