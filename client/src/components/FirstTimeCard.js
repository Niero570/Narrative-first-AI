import React, { useState } from 'react';
import './FirstTimeCard.css';

const SLIDES = [
  {
    id: 'what',
    visual: '✦',
    visualClass: 'ftc-visual--mark',
    headline: 'This isn\'t a chatbot.',
    body: `narrativeFirst is built on narrative therapy — a proven clinical method used by real therapists worldwide. The premise is simple: the stories we tell about ourselves aren't always true. And the ones that aren't serving us? We can change them.`,
    note: 'You are not broken. Your narrative might just need a second look.',
  },
  {
    id: 'how',
    visual: null,
    visualClass: 'ftc-visual--loop',
    headline: 'Every session goes somewhere.',
    body: null,
    steps: [
      { icon: '🎙', label: 'Talk', desc: 'Say what\'s actually on your mind. No filters needed.' },
      { icon: '✨', label: 'Crystallize', desc: 'Hit Save to Diary — your session becomes a reflection you keep.' },
      { icon: '📖', label: 'Build', desc: 'Your diary grows. Your story gets clearer. The AI remembers.' },
    ],
    note: 'A beginning, a middle, and an ending that means something.',
  },
  {
    id: 'yours',
    visual: null,
    visualClass: 'ftc-visual--features',
    headline: 'Built to be yours.',
    features: [
      { icon: '🧭', text: 'Three companions — each approaches your story from a different angle' },
      { icon: '✝️', text: 'Faith lens — scripture and prayer, woven in naturally if that\'s your world' },
      { icon: '🎙', text: 'Voice or text — say it or type it, whatever feels right today' },
      { icon: '📖', text: 'A diary that builds — your reflections, saved forever, always yours' },
    ],
    note: 'The more honest you are here, the more useful this becomes.',
  },
];

export default function FirstTimeCard({ onDismiss }) {
  const [slide, setSlide] = useState(0);
  const [exiting, setExiting] = useState(false);
  const isLast = slide === SLIDES.length - 1;
  const current = SLIDES[slide];

  const advance = () => {
    if (isLast) {
      handleDone();
    } else {
      setSlide(s => s + 1);
    }
  };

  const handleDone = () => {
    setExiting(true);
    localStorage.setItem('nf_seen_intro', '1');
    setTimeout(() => onDismiss(), 500);
  };

  return (
    <div className={`ftc-overlay ${exiting ? 'ftc-overlay--exit' : ''}`} onClick={advance}>
      <div className="ftc-card" onClick={e => e.stopPropagation()}>

        {/* Slide content */}
        <div className="ftc-slide" key={current.id}>

          {/* Visual — slide 1: logo mark */}
          {current.id === 'what' && (
            <div className="ftc-mark-visual">✦</div>
          )}

          {/* Visual — slide 2: the loop */}
          {current.id === 'how' && (
            <div className="ftc-loop">
              {current.steps.map((step, i) => (
                <React.Fragment key={step.label}>
                  <div className="ftc-loop-step">
                    <span className="ftc-loop-icon">{step.icon}</span>
                    <strong className="ftc-loop-label">{step.label}</strong>
                    <span className="ftc-loop-desc">{step.desc}</span>
                  </div>
                  {i < current.steps.length - 1 && (
                    <div className="ftc-loop-arrow">↓</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Visual — slide 3: feature list */}
          {current.id === 'yours' && (
            <div className="ftc-features">
              {current.features.map((f, i) => (
                <div key={i} className="ftc-feature-row">
                  <span className="ftc-feature-icon">{f.icon}</span>
                  <span className="ftc-feature-text">{f.text}</span>
                </div>
              ))}
            </div>
          )}

          <h2 className="ftc-headline">{current.headline}</h2>
          {current.body && <p className="ftc-body">{current.body}</p>}
          {current.note && <p className="ftc-note">"{current.note}"</p>}
        </div>

        {/* Dots */}
        <div className="ftc-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`ftc-dot ${i === slide ? 'ftc-dot--active' : ''}`}
              onClick={e => { e.stopPropagation(); setSlide(i); }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <button className="ftc-btn" onClick={advance}>
          {isLast ? "I'm ready. Let's begin." : 'Continue →'}
        </button>

        {/* Skip */}
        {!isLast && (
          <button className="ftc-skip" onClick={e => { e.stopPropagation(); handleDone(); }}>
            skip intro
          </button>
        )}
      </div>
    </div>
  );
}
