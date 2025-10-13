import React from 'react';

const MicrophoneButton = ({ onClick }) => {
  return (
    <button className="microphone-button" onClick={onClick}>
      <img src="/microphone.svg" alt="Microphone" className="mic-icon" />
    </button>
  );
};

export default MicrophoneButton;