import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const CYCLE_WORDS = ['honesty', 'perspective', 'clarity', 'courage'];

export default function LandingPage({ onEnter }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % CYCLE_WORDS.length);
        setFading(false);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailStatus('submitting');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setEmailStatus('done');
        setEmail('');
      } else {
        setEmailStatus('error');
      }
    } catch {
      setEmailStatus('error');
    }
  };

  return (
    <div className="lp-shell">

      {/* Nav */}
      <nav className="lp-nav">
        <div className="lp-nav-logo">
          <span className="lp-mark">✦</span>
          <span className="lp-nav-name">
            <span className="lp-n">narrative</span><span className="lp-f">First</span>
          </span>
        </div>
        <button className="lp-nav-cta" onClick={onEnter}>
          Begin →
        </button>
      </nav>

      {/* Hero */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <p className="lp-eyebrow">A new kind of conversation</p>
          <h1 className="lp-headline">
            Your story is trying<br />to tell you something.
          </h1>
          <p className="lp-subhead">
            narrativeFirst uses real narrative therapy — the same clinical method
            practiced by therapists worldwide — to help you rewrite the stories
            that are holding you back.
          </p>

          {/* Word cycle */}
          <div className="lp-cycle-wrap">
            <span className="lp-cycle-prefix">Start with </span>
            <span className={`lp-cycle-word ${fading ? 'lp-cycle-word--fade' : ''}`}>
              {CYCLE_WORDS[wordIndex]}
            </span>
            <span className="lp-cycle-suffix">.</span>
          </div>

          <button className="lp-hero-cta" onClick={onEnter}>
            Start your first session
          </button>
          <p className="lp-hero-note">Free to try. No account required to begin.</p>
        </div>
      </section>

      {/* Three differentiators */}
      <section className="lp-pillars">
        <div className="lp-pillars-inner">

          <div className="lp-pillar">
            <div className="lp-pillar-icon">🧭</div>
            <h3 className="lp-pillar-title">Not a chatbot. A companion.</h3>
            <p className="lp-pillar-body">
              Three distinct voices — a Gentle Guide, a Fellow Traveler, and a
              Wise Old Fool — each approaching your story from a different angle.
              You choose who you need today.
            </p>
          </div>

          <div className="lp-pillar">
            <div className="lp-pillar-icon">✨</div>
            <h3 className="lp-pillar-title">Every session crystallizes.</h3>
            <p className="lp-pillar-body">
              Hit Save to Diary and your conversation becomes something you keep —
              a narrative reflection and a single commitment that moves you forward.
              Your diary grows with you.
            </p>
          </div>

          <div className="lp-pillar">
            <div className="lp-pillar-icon">✝️</div>
            <h3 className="lp-pillar-title">Meets you where you are.</h3>
            <p className="lp-pillar-body">
              Turn on the faith lens and scripture and prayer are woven in naturally.
              Speak or type — whatever feels right. This is built to be entirely yours.
            </p>
          </div>

        </div>
      </section>

      {/* The method */}
      <section className="lp-method">
        <div className="lp-method-inner">
          <p className="lp-method-eyebrow">The method</p>
          <h2 className="lp-method-title">
            The stories we tell about ourselves<br />
            <em>aren't always true.</em>
          </h2>
          <p className="lp-method-body">
            Narrative therapy — developed in the 1980s and used in clinical
            settings worldwide — starts from one powerful premise: you are not
            the problem. The story is. And stories can be rewritten.
          </p>
          <p className="lp-method-body">
            narrativeFirst brings that method into a space you can return to
            daily. No diagnosis. No clinical jargon. Just honest conversation
            and the slow, meaningful work of seeing yourself more clearly.
          </p>
          <blockquote className="lp-quote">
            "You are not broken. Your narrative might just need a second look."
          </blockquote>
        </div>
      </section>

      {/* CTA section */}
      <section className="lp-final-cta">
        <div className="lp-final-inner">
          <span className="lp-final-mark">✦</span>
          <h2 className="lp-final-title">Ready to start?</h2>
          <p className="lp-final-sub">
            Your first session is free. No credit card. Just you and an honest conversation.
          </p>
          <button className="lp-final-btn" onClick={onEnter}>
            Begin my first session
          </button>

          <div className="lp-divider">or stay in the loop</div>

          {emailStatus === 'done' ? (
            <p className="lp-email-confirm">You're on the list. We'll be in touch.</p>
          ) : (
            <form className="lp-email-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="lp-email-input"
                required
              />
              <button
                type="submit"
                className="lp-email-btn"
                disabled={emailStatus === 'submitting'}
              >
                {emailStatus === 'submitting' ? '…' : 'Notify me'}
              </button>
            </form>
          )}
          {emailStatus === 'error' && (
            <p className="lp-email-error">Something went wrong — try again.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <span className="lp-footer-mark">✦</span>
        <span className="lp-footer-name">
          <span className="lp-n">narrative</span><span className="lp-f">First</span>
        </span>
        <span className="lp-footer-tag">truth first. better stories follow.</span>
      </footer>

    </div>
  );
}
