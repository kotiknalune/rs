class SpeechSynthesis {
  constructor() {
    if (!SpeechSynthesis.appRecognition) {
      SpeechSynthesis.appRecognition = this;
    }
    this.synth = window.speechSynthesis;
    this.message = new SpeechSynthesisUtterance(localStorage.getItem('message'));
    this.message.volume = 1;
    this.message.rate = 1;
    this.voices = [];

    this.pause = document.querySelector('.button__voice-pause');
    this.play = document.querySelector('.button__voice-play');

    return SpeechSynthesis.appRecognition;
  }

  eventListeners() {
    this.pause.addEventListener('click', () => {
      this.pauseMessage();
    });

    this.play.addEventListener('click', () => {
      this.playMessage();
    });
  }

  populateVoiceList() {
    this.voices = this.synth.getVoices();
  }

  playMessage() {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.populateVoiceList;
    }
    this.populateVoiceList();
    this.message.text = localStorage.getItem('message');

    const lang = localStorage.getItem('language');
    const voice = this.voices.find((item) => item.lang.indexOf(lang) !== -1);
    this.message.voice = (voice) || this.voices.find((item) => item.lang.indexOf('ru') !== -1);

    this.synth.speak(this.message);
  }

  pauseMessage() {
    this.synth.cancel();
  }

  louderMessage() {
    this.message.volume += 0.5;
    if (this.message.volume === 1) {
      this.louder.disabled = true;
      this.quieter.disabled = false;
    } else {
      this.louder.disabled = false;
      this.quieter.disabled = false;
    }
  }

  quieterMessage() {
    this.message.volume -= 0.5;
    if (this.message.volume === 0) {
      this.quieter.disabled = true;
      this.louder.disabled = false;
    } else {
      this.quieter.disabled = false;
      this.louder.disabled = false;
    }
  }

  init() {
    this.eventListeners();
  }
}
const appSynthesis = new SpeechSynthesis();
export default appSynthesis;
