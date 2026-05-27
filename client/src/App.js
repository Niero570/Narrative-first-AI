import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import MainUI from './components/MainUI';
import './App.css';

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [isUserOnboarded, setIsUserOnboarded] = useState(false);

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <div className="App">
      {isUserOnboarded ? (
        <MainUI />
      ) : (
        <Onboarding onComplete={() => setIsUserOnboarded(true)} />
      )}
    </div>
  );
}

export default App; 