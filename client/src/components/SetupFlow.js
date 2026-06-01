import React, { useState, useEffect } from 'react';
import API_URL from '../config';
import './SetupFlow.css';

const PERSONAS = [
  {
    id: 'gentle-guide',
    name: 'The Gentle Guide',
    avatar: '🌿',
    desc: 'Warm, story-driven, finds meaning in metaphor.',
    color: '#C4956A',
  },
  {
    id: 'fellow-traveler',
    name: 'The Fellow Traveler',
    avatar: '🧭',
    desc: "Walks beside you. You're never alone in it.",
    color: '#4A9B8E',
  },
  {
    id: 'wise-old-fool',
    name: 'The Wise Old Fool',
    avatar: '🔥',
    desc: 'Direct, witty. Shakes you loose with a laugh.',
    color: '#8B6BA8',
  },
];

const MOODS = [
  { id: 'Heavy',     icon: '🌧', label: 'Heavy' },
  { id: 'Anxious',   icon: '⚡', label: 'Anxious' },
  { id: 'Numb',      icon: '🌫', label: 'Numb' },
  { id: 'Searching', icon: '🔍', label: 'Searching' },
];

const MOOD_PERSONA_MAP = {
  Heavy:     'gentle-guide',
  Anxious:   'fellow-traveler',
  Numb:      'wise-old-fool',
  Searching: 'gentle-guide',
};

export default function SetupFlow({ onComplete }) {
  const [step, setStep]           = useState('welcome');
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [error, setError]         = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faithLens, setFaithLens] = useState(false);
  const [persona, setPersona]     = useState('gentle-guide');
  const [mood, setMood]           = useState(null);
  const [matchMsg, setMatchMsg]   = useState('');

  // Auto-advance from moodMatch after 2.5s
  useEffect(() => {
    if (step !== 'moodMatch') return;
    const t = setTimeout(() => finish(), 2500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const finish = () => {
    const stored = JSON.parse(localStorage.getItem('nf_user') || '{}');
    onComplete({
      name:       stored.name  || name,
      email:      stored.email || email.toLowerCase(),
      userId:     stored.email || email.toLowerCase(),
      isPremium:  stored.isPremium  || false,
      messageCount: stored.messageCount || 0,
      faithLens,
      persona,
      mood,
    });
  };

  const handleWelcomeSubmit = async () => {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { setError('Please enter a valid email address.'); return; }
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      localStorage.setItem('nf_auth', data.token);
      localStorage.setItem('nf_user', JSON.stringify(data.user));
      setStep('faith');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMoodSelect = (moodId) => {
    setMood(moodId);
    const suggested = MOOD_PERSONA_MAP[moodId];
    setPersona(suggested);
    const p = PERSONAS.find(p => p.id === suggested);
    setMatchMsg(`${p.name} feels right for where you are today.`);
    setStep('moodMatch');
  };

  /* ─── STEP: Welcome ─── */
  if (step === 'welcome') return (
    <div className="sf-screen">
      <div className="sf-card">
        <div className="sf-logo-mark">✦</div>
        <h1 className="sf-title">
          <span className="sf-n">narrative</span><span className="sf-f">First</span>
        </h1>
        <p className="sf-subtitle">A space to think out loud and find your way through.</p>
        <input
          className="sf-input"
          type="text"
          placeholder="Your name"
          value={name}
          autoFocus
          onChange={e => { setName(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleWelcomeSubmit()}
        />
        <input
          className="sf-input"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleWelcomeSubmit()}
        />
        {error && <p className="sf-error">{error}</p>}
        <button className="sf-btn" onClick={handleWelcomeSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Starting…' : 'Begin Session'}
        </button>
        <p className="sf-note">Beta · Your session is private</p>
      </div>
    </div>
  );

  /* ─── STEP: Faith Lens ─── */
  if (step === 'faith') return (
    <div className="sf-screen sf-screen--dark">
      <div className="sf-flow-wrap">
        <p className="sf-flow-eyebrow">Before we begin</p>
        <h2 className="sf-flow-heading">How would you like to approach your reflections?</h2>
        <div className="sf-faith-cards">
          <button
            className={`sf-faith-card ${faithLens ? 'sf-faith-card--selected' : ''}`}
            onClick={() => { setFaithLens(true); setStep('persona'); }}
          >
            <span className="sf-faith-icon">✝️</span>
            <strong>Faith-Anchored</strong>
            <span>Includes scripture and prayer when meaningful</span>
          </button>
          <button
            className={`sf-faith-card ${!faithLens ? 'sf-faith-card--selected' : ''}`}
            onClick={() => { setFaithLens(false); setStep('persona'); }}
          >
            <span className="sf-faith-icon">🧠</span>
            <strong>Open &amp; Secular</strong>
            <span>Psychological and narrative framing</span>
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── STEP: Persona Selection ─── */
  if (step === 'persona') return (
    <div className="sf-screen sf-screen--dark">
      <div className="sf-flow-wrap">
        <p className="sf-flow-eyebrow">Choose your companion</p>
        <h2 className="sf-flow-heading">Who do you want to talk with today?</h2>
        <div className="sf-persona-cards">
          {PERSONAS.map(p => (
            <button
              key={p.id}
              className={`sf-persona-card ${persona === p.id ? 'sf-persona-card--selected' : ''}`}
              style={{ '--persona-color': p.color }}
              onClick={() => { setPersona(p.id); setStep('mood'); }}
            >
              <span className="sf-persona-avatar">{p.avatar}</span>
              <strong className="sf-persona-name">{p.name}</strong>
              <span className="sf-persona-desc">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── STEP: Mood Ritual ─── */
  if (step === 'mood') return (
    <div className="sf-screen sf-screen--dark">
      <div className="sf-flow-wrap sf-flow-wrap--center">
        <p className="sf-flow-eyebrow">Opening ritual</p>
        <h2 className="sf-flow-heading sf-flow-heading--lg">
          What's heaviest on your heart today?
        </h2>
        <div className="sf-mood-tiles">
          {MOODS.map(m => (
            <button key={m.id} className="sf-mood-tile" onClick={() => handleMoodSelect(m.id)}>
              <span className="sf-mood-icon">{m.icon}</span>
              <span className="sf-mood-label">{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── STEP: Mood Match ─── */
  if (step === 'moodMatch') {
    const p = PERSONAS.find(p => p.id === persona);
    return (
      <div className="sf-screen sf-screen--dark" onClick={finish}>
        <div className="sf-match-wrap">
          <span className="sf-match-avatar">{p.avatar}</span>
          <p className="sf-match-msg">{matchMsg}</p>
          <p className="sf-match-hint">tap to continue</p>
        </div>
      </div>
    );
  }

  return null;
}
