import {
  searchForm, searchFormInput, info, micBtn
} from '../constants/searchbar.constants';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const micIcon = micBtn.firstElementChild;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  micBtn.addEventListener('click', function micBtnClick() {
    if (micIcon.classList.contains('fa-microphone')) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });

  recognition.addEventListener('start', function startSpeechRecognition() {
    micIcon.classList.remove('fa-microphone');
    micIcon.classList.add('fa-microphone-slash');
    searchFormInput.focus();
  });

  recognition.addEventListener('end', function endSpeechRecognition() {
    micIcon.classList.remove('fa-microphone-slash');
    micIcon.classList.add('fa-microphone');
    searchFormInput.focus();
  });

  recognition.addEventListener('result', function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === 'stop recording') {
      recognition.stop();
    } else if (!searchFormInput.value) {
      searchFormInput.value = transcript;
    } else if (transcript.toLowerCase().trim() === 'go') {
      searchForm.submit();
    } else if (transcript.toLowerCase().trim() === 'reset text') {
      searchFormInput.value = '';
    } else {
      searchFormInput.value = transcript;
    }
  });

  info.textContent = 'Voice commands: Go / Stop Recording / Reset text';
} else {
  info.textContent = 'Your browser does not support Speech Recognition';
}
