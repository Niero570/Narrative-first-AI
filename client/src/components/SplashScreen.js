import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const CYCLE_WORDS = ['clarity', 'perspective', 'honesty', 'courage', 'truth'];
const WORD_DURATION = 1200;  // how long each word is shown
const CYCLE_START = 1800;    // wait until tagline is fully visible before cycling

function SplashScreen({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [cycleStarted, setCycleStarted] = useState(false);
  const [phase, setPhase] = useState('entering');
  const isFinal = wordIndex === CYCLE_WORDS.length - 1;

  // Delay before cycling begins so user sees the layout settle first
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCycleStarted(true);
      setWordVisible(true);
    }, CYCLE_START);
    return () => clearTimeout(startTimer);
  }, []);

  // Advance through words once cycling has started
  useEffect(() => {
    if (!cycleStarted || isFinal) return;

    const fadeOut = setTimeout(() => setWordVisible(false), WORD_DURATION - 160);
    const next = setTimeout(() => {
      setWordIndex(i => i + 1);
      setWordVisible(true);
    }, WORD_DURATION);

    return () => { clearTimeout(fadeOut); clearTimeout(next); };
  }, [wordIndex, cycleStarted, isFinal]);

  // Exit after full cycle + hold on "truth"
  useEffect(() => {
    const totalCycle = CYCLE_START + CYCLE_WORDS.length * WORD_DURATION;
    const exitTimer = setTimeout(() => setPhase('exiting'), totalCycle + 1800);
    const doneTimer = setTimeout(() => onComplete(), totalCycle + 2600);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  const handleSkip = () => {
    if (phase === 'exiting') return;
    setPhase('exiting');
    setTimeout(() => onComplete(), 500);
  };

  return (
    <div className={`splash splash--${phase}`} onClick={handleSkip}>
      <div className="splash-content">
        <div className="splash-mark">✦</div>
        <h1 className="splash-name">
          <span className="splash-narrative">narrative</span>
          <span className="splash-first">First</span>
        </h1>

        <div className="splash-tagline">
          <span
            className={`splash-word ${wordVisible ? 'splash-word--visible' : ''} ${isFinal ? 'splash-word--final' : ''}`}
          >
            {CYCLE_WORDS[wordIndex]}
          </span>
          {' '}first. better stories follow.
        </div>
      </div>
      <p className="splash-skip">tap to skip</p>
    </div>
  );
}

export default SplashScreen;
