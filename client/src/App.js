import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import SetupFlow from './components/SetupFlow';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [splashDone, setSplashDone]   = useState(false);
  const [setupData,  setSetupData]    = useState(null);

  if (!splashDone) return <SplashScreen onComplete={() => setSplashDone(true)} />;
  if (!setupData)  return <SetupFlow    onComplete={setSetupData} />;
  return <ChatWindow setupData={setupData} />;
}

export default App;
