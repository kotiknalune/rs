import model from '../models/Model';
import helpers from '../helpers/helpers';
import appSynthesis from '../speech-synthesis/speechSynthesis';

class AppSpeechRecognition {
  constructor() {
    if (!AppSpeechRecognition.appRecognition) {
      AppSpeechRecognition.appRecognition = this;
    }
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    this.SpeechRecognitionEvent = window.SpeechRecognitionEvent
            || window.webkitSpeechRecognitionEvent;
    this.recognition = new this.SpeechRecognition();
    this.speechRecognitionList = new this.SpeechGrammarList();

    this.commands = ['weather', 'forecast', 'louder', 'quieter', 'pause', 'stop', 'play'];
    this.grammar = `#JSGF V1.0; grammar colors; public <commands> = ${this.commands.join(' | ')} ;`;
    this.speechRecognitionList.addFromString(this.grammar, 1);
    this.recognition.interimResults = false;
    this.recognition.grammars = this.speechRecognitionList;
    this.inputValue = {
      value: ''
    };
    this.query = {
      searchQuery: ''
    };
    this.microphones = document.querySelectorAll('.microphone');
    this.isDisable = {
      start: false
    };
    this.mode = {
      control: true
    };
    this.reset = {
      mode: false
    };

    return AppSpeechRecognition.appRecognition;
  }

  eventListeners() {
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.maxAlternatives = 1;
    this.recognition.start();
    this.microphones.forEach((elem) => {
      elem.addEventListener('click', () => {
        this.resetMode();
      });
    });

    this.recognition.addEventListener('end', () => {
      if (this.reset.mode) {
        if (!this.isDisable.start) {
          this.recognition.lang = helpers.getLanguage();
          this.recognition.interimResults = true;
          this.microphones.forEach((elem) => elem.classList.add('active'));
          helpers.infoMessage('Speak please');
          this.isDisable.start = !this.isDisable.start;
          this.reset.mode = !this.reset.mode;
          this.mode.control = !this.mode.control;
          this.recognition.start();
        }
      } else if (!this.mode.control) {
        this.isDisable.start = !this.isDisable.start;
        const lang = helpers.getLanguage();
        model.loadSearchWeather(this.query.searchQuery, lang);
        this.microphones.forEach((elem) => elem.classList.remove('active'));
        this.mode.control = !this.mode.control;
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.start();
      } else {
        this.recognition.start();
      }
    });

    this.recognition.addEventListener('result', (e) => {
      if (!this.mode.control) {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        const topSearchInput = document.getElementById('main-search');
        mobileSearchInput.value = transcript;
        topSearchInput.value = transcript;
        this.inputValue.value = transcript;
        this.query.searchQuery = transcript;
      } else {
        // eslint-disable-next-line default-case
        switch (e.results[0][0].transcript) {
          case 'weather':
          case 'forecast':
            appSynthesis.speakMessage();
            break;
          case 'louder':
            appSynthesis.louderMessage();
            break;
          case 'quieter':
            appSynthesis.quieterMessage();
            break;
          case 'stop':
            appSynthesis.stopMessage();
            break;
          case 'pause':
            appSynthesis.pauseMessage();
            break;
          case 'play':
            appSynthesis.playMessage();
            break;
        }
      }
    });
  }

  resetMode() {
    if (!this.reset.mode) {
      this.reset.mode = !this.reset.mode;
      this.recognition.stop();
    }
  }

  run() {
    this.eventListeners();
  }
}
const appRecognition = new AppSpeechRecognition();
Object.freeze(appRecognition);
export default appRecognition;
