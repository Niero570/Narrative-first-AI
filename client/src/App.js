import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import MainUI from './components/MainUI';
import './App.css';

function App() {
  const [isUserOnboarded, setIsUserOnboarded] = useState(false);

  const handleOnboardingComplete = () => {
    setIsUserOnboarded(true);
  };

  return (
    <div className="App">
      {isUserOnboarded ? (
        <MainUI />
      ) : (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}

export default App; 