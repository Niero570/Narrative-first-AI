import React, { useState, useEffect } from 'react';
import MicrophoneButton from './MicrophoneButton';
import CrystallizedNarrative from './CrystallizedNarrative';
import SessionHistory from './SessionHistory';
// Ensure these paths are correct:
import SpeechRecognitionService from '../services/SpeechRecognitionService';
import NarrativeSimulator from '../services/NarrativeSimulator';

const MainUI = () => {
  const [narrativeText, setNarrativeText] = useState("Welcome to your diary. Tap the microphone to begin.");
  const [sessionHistory, setSessionHistory] = useState([]); // Currently unused, placeholder for future history
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechService] = useState(() => new SpeechRecognitionService()); // Initialize once

  useEffect(() => {
    // Only set up listeners if the recognition object is available
    if (!speechService.recognition) {
        setNarrativeText("Voice input not supported by this browser.");
        return;
    }

    
    // Handles the final transcription and triggers the API call
    speechService.onResult(async (transcript) => {
      setIsListening(false);
      setIsProcessing(true);
      
      try {
          // CALL THE NEW API-DRIVEN FUNCTION
          const result = await NarrativeSimulator.generateNarrativeAndCommitment(transcript);

          // Display the combined narrative and question
          setNarrativeText(`${result.crystallizedNarrative}\n\n${result.microCommitment}`);

      } catch (err) {
          console.error("Narrative API Error:", err);
          setNarrativeText("An error occurred during API processing. Please check the server console.");
      }
      setIsProcessing(false);
    });

    speechService.onError((error) => {
      console.error('Speech recognition error:', error);
      setIsListening(false);
      setIsProcessing(false);
      setNarrativeText("Sorry, I didn't catch that. Please try again.");
    });
    
    // Cleanup function (optional but good practice)
    return () => {
        speechService.stopListening();
    };

  }, [speechService]); // Depend on speechService to ensure callbacks are updated

  const handleMicClick = () => {
    if (isProcessing) return; // Ignore clicks while processing

    if (isListening) {
      speechService.stopListening();
    } else {
      setIsListening(true);
      setNarrativeText("Listening... Say something now.");
      speechService.startListening();
    }
  };

  return (
    <div className="main-ui-container">
      <div className="left-panel">
        <SessionHistory entries={sessionHistory} />
      </div>
      <div className="right-panel">
        <div className="narrative-display">
          {/* This component handles the typing animation */}
          <CrystallizedNarrative text={narrativeText} />
        </div>
        <MicrophoneButton 
          onClick={handleMicClick} 
          isListening={isListening} 
          isProcessing={isProcessing} 
        />
      </div>
    </div>
  );
};

export default MainUI;