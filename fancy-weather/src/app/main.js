document.cookie = 'SameSite=None';

import '@fortawesome/fontawesome-free/js/all';
import 'regenerator-runtime';

import model from './models/app.model';
// import speechRecognition from './features/speechRecognition.feature';
import speechSynthesis from './features/textToSpeech.feature';

model.init();
// speechRecognition.run();
speechSynthesis.init();
