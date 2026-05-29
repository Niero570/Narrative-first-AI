import React, { useState, useEffect } from 'react';
import SplashScreen  from './components/SplashScreen';
import LandingPage   from './components/LandingPage';
import SetupFlow     from './components/SetupFlow';
import ChatWindow    from './components/ChatWindow';
import API_URL       from './config';
import './App.css';

function App() {
  const [splashDone,   setSplashDone]   = useState(false);
  const [landingDone,  setLandingDone]  = useState(false);
  const [setupData,    setSetupData]    = useState(null);
  const [checking,     setChecking]     = useState(true);

  // On mount: verify stored JWT and restore session
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('nf_auth');
      if (!token) { setChecking(false); return; }

      try {
        const res = await fetch(`${API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('invalid');
        const { user } = await res.json();

        // Check for Stripe payment return
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment') === 'success') {
          // Payment just completed — user.isPremium should already be true via webhook
          window.history.replaceState({}, '', '/');
        }

        // Restore defaults — user picks persona/mood fresh each session
        setSetupData({
          name:         user.name,
          email:        user.email,
          userId:       user.email,
          isPremium:    user.isPremium,
          messageCount: user.messageCount,
          faithLens:    false,
          persona:      'gentle-guide',
          mood:         null,
          skipRitual:   true,  // returning user — skip mood ritual, go straight to chat
        });
        setSplashDone(true);
      } catch {
        localStorage.removeItem('nf_auth');
        localStorage.removeItem('nf_user');
      } finally {
        setChecking(false);
      }
    };
    restoreSession();
  }, []);

  if (checking)    return null;
  if (!splashDone) return <SplashScreen onComplete={() => setSplashDone(true)} />;
  if (!setupData && !landingDone) return <LandingPage onEnter={() => setLandingDone(true)} />;
  if (!setupData)  return <SetupFlow    onComplete={setSetupData} />;
  return <ChatWindow setupData={setupData} />;
}

export default App;
