import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const CYCLE_WORDS = ['clarity', 'perspective', 'honesty', 'courage', 'truth'];
const WORD_DURATION = 420;

function SplashScreen({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [phase, setPhase] = useState('entering');
  const isFinal = wordIndex === CYCLE_WORDS.length - 1;

  useEffect(() => {
    if (isFinal) return;

    const fadeOut = setTimeout(() => setWordVisible(false), WORD_DURATION - 120);
    const next = setTimeout(() => {
      setWordIndex(i => i + 1);
      setWordVisible(true);
    }, WORD_DURATION);

    return () => { clearTimeout(fadeOut); clearTimeout(next); };
  }, [wordIndex, isFinal]);

  useEffect(() => {
    const cycleEnd = CYCLE_WORDS.length * WORD_DURATION;
    const exitTimer = setTimeout(() => setPhase('exiting'), cycleEnd + 1600);
    const doneTimer = setTimeout(() => onComplete(), cycleEnd + 2300);
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
