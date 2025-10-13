// SpeechRecognitionService.js
class SpeechRecognitionService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (this.recognition) {
        this.recognition.continuous = false; 
        this.recognition.interimResults = false; 
    }
  }

  startListening() {
    if (this.recognition) this.recognition.start();
  }

  stopListening() {
    if (this.recognition) this.recognition.stop();
  }

  onResult(callback) {
    if (this.recognition) {
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            callback(transcript);
        };
    }
  }

  onError(callback) {
    if (this.recognition) {
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            callback(event.error);
        };
    }
  }

  // NOTE: onEnd is not explicitly needed as onResult fires when speech ends.
}

export default SpeechRecognitionService;