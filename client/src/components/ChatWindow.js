import API_URL from '../config';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PaywallModal   from './PaywallModal';
import FirstTimeCard  from './FirstTimeCard';
import './ChatWindow.css';

// ─── TTS stub ────────────────────────────────────────────────────────────────
// personaId values: 'gentle-guide' | 'fellow-traveler' | 'wise-old-fool'
// TODO: ElevenLabs integration
// const voiceIdMap = {
//   'gentle-guide':    'VOICE_ID_1',
//   'fellow-traveler': 'VOICE_ID_2',
//   'wise-old-fool':   'VOICE_ID_3',
// };
// const audio = await elevenlabs.generate({ voice: voiceIdMap[personaId], text });
// audio.play();
function speakMessage(text, personaId) {    // eslint-disable-line no-unused-vars
  console.log(`[TTS stub] personaId=${personaId} length=${text.length}`);
}
// ─────────────────────────────────────────────────────────────────────────────

const PERSONA_META = {
  'gentle-guide':    { label: 'Gentle Guide',   color: '#C4956A',
                       gradient: 'linear-gradient(135deg,#FFF8F0,#FFF3E0)' },
  'fellow-traveler': { label: 'Fellow Traveler', color: '#4A9B8E',
                       gradient: 'linear-gradient(135deg,#F0F8F6,#E8F7F5)' },
  'wise-old-fool':   { label: 'Wise Old Fool',   color: '#8B6BA8',
                       gradient: 'linear-gradient(135deg,#F8F3FF,#F2EBFF)' },
};

export default function ChatWindow({ setupData }) {
  const { userId, name, email, faithLens, persona: initialPersona,
          isPremium: initialPremium } = setupData;

  const [selectedPersona, setSelectedPersona] = useState(initialPersona || 'gentle-guide');
  const [messages,        setMessages]        = useState([]);
  const [inputText,       setInputText]       = useState('');
  const [isLoading,       setIsLoading]       = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [diaryEntries,    setDiaryEntries]    = useState([]);
  const [activeTab,       setActiveTab]       = useState('chat');
  const [saveStatus,      setSaveStatus]      = useState(null);
  const [closingRitual,   setClosingRitual]   = useState(null);
  const [isListening,     setIsListening]     = useState(false);
  const [showPaywall,    setShowPaywall]    = useState(false);
  const [isPremium,      setIsPremium]      = useState(initialPremium || false);  // eslint-disable-line no-unused-vars
  const [showFirstTime,  setShowFirstTime]  = useState(!localStorage.getItem('nf_seen_intro'));

  const messagesEndRef = useRef(null);
  const textareaRef    = useRef(null);
  const speechRef      = useRef(null);

  // Load conversation history and diary entries on mount
  useEffect(() => {
    const load = async () => {
      setIsLoadingHistory(true);
      try {
        const [convoRes, diaryRes] = await Promise.all([
          fetch(`${API_URL}/api/conversations/${encodeURIComponent(userId)}`),
          fetch(`${API_URL}/api/diary/${encodeURIComponent(userId)}`),
        ]);
        if (convoRes.ok) {
          const { messages: hist } = await convoRes.json();
          if (hist?.length) setMessages(hist);
        }
        if (diaryRes.ok) {
          const { entries } = await diaryRes.json();
          if (entries?.length) setDiaryEntries(entries.map(e => ({
            ...e,
            timestamp: e.createdAt || e.timestamp,
          })));
        }
      } catch (err) {
        console.error('History load error:', err);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    load();
  }, [userId]);

  // Speech recognition
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous     = true;   // keep listening through natural pauses
    rec.interimResults = true;   // show words appearing in real time
    rec.onresult = (e) => {
      let finalText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript;
        }
      }
      if (finalText) {
        setInputText(prev => prev ? prev + ' ' + finalText.trim() : finalText.trim());
      }
    };
    rec.onerror = () => { setIsListening(false); };
    rec.onend   = () => { setIsListening(false); };
    speechRef.current = rec;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleMicClick = () => {
    if (!speechRef.current) return;
    if (isListening) { speechRef.current.stop(); setIsListening(false); }
    else             { setIsListening(true); speechRef.current.start(); }
  };

  const sendMessage = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;
    const userMessage = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText, persona: selectedPersona, userId, faithLens }),
      });

      // Paywall response (HTTP 402)
      if (res.status === 402) {
        setMessages(prev => prev.slice(0, -1)); // remove the unsent user message
        setInputText(inputText);                // restore what they typed
        setShowPaywall(true);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      if (data.paywall) { setShowPaywall(true); setIsLoading(false); return; }
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, selectedPersona, userId, faithLens]);

  const saveToDiary = async () => {
    if (messages.length === 0) return;
    setSaveStatus('saving');
    try {
      const conversationText = messages.slice(-10).map(m => `${m.role}: ${m.content}`).join('\n\n');
      const res  = await fetch(`${API_URL}/api/crystallize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: conversationText }),
      });
      const data = await res.json();

      // Persist to MongoDB
      await fetch(`${API_URL}/api/diary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          narrative:       data.narrative,
          microCommitment: data.microCommitment,
          persona:         selectedPersona,
          faithLens:       faithLens || false,
        }),
      });

      const entry = {
        narrative:       data.narrative,
        microCommitment: data.microCommitment,
        timestamp:       new Date().toISOString(),
        persona:         selectedPersona,
      };
      setDiaryEntries(prev => [entry, ...prev]);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
      setClosingRitual(entry);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleSubscribe = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, name }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      console.error('Stripe redirect failed');
    }
  };

  const personaMeta  = PERSONA_META[selectedPersona] || PERSONA_META['gentle-guide'];
  const micSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <>
      {showFirstTime && (
        <FirstTimeCard onDismiss={() => setShowFirstTime(false)} />
      )}

      {showPaywall && (
        <PaywallModal
          isPremium={isPremium}
          onSubscribe={handleSubscribe}
          onDismiss={() => setShowPaywall(false)}
          onSave={saveToDiary}
          hasMessages={messages.length > 0}
        />
      )}

      {closingRitual && (
        <div className="cw-ritual-overlay" onClick={() => setClosingRitual(null)}>
          <div className="cw-ritual-card" onClick={e => e.stopPropagation()}>
            <p className="cw-ritual-eyebrow">You showed up today.</p>
            <p className="cw-ritual-label">You committed to one thing:</p>
            <p className="cw-ritual-commitment">{closingRitual.microCommitment}</p>
            <button className="cw-ritual-close" onClick={() => setClosingRitual(null)}>
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="cw-shell">
        <header className="cw-header">
          <div className="cw-header-left">
            <span className="cw-logo-mark-sm">✦</span>
            <span className="cw-header-title">
              <span className="cw-name-narrative-sm">narrative</span>
              <span className="cw-name-first-sm">First</span>
            </span>
          </div>
          <div className="cw-header-right">
            {isPremium && <span className="cw-premium-badge">✦ Premium</span>}
            <select value={selectedPersona} onChange={e => setSelectedPersona(e.target.value)}
              className="cw-persona-select">
              {Object.entries(PERSONA_META).map(([id, m]) => (
                <option key={id} value={id}>{m.label}</option>
              ))}
            </select>
          </div>
        </header>

        <div className="cw-persona-badge">
          Speaking with: <strong>{personaMeta.label}</strong>
          {faithLens && <span className="cw-faith-tag">Faith lens on</span>}
          {selectedPersona === 'wise-old-fool' && !faithLens && (
            <span className="cw-badge-tag">New</span>
          )}
        </div>

        <nav className="cw-tabs">
          <button className={`cw-tab ${activeTab === 'chat'  ? 'cw-tab--active' : ''}`}
            onClick={() => setActiveTab('chat')}>Conversation</button>
          <button className={`cw-tab ${activeTab === 'diary' ? 'cw-tab--active' : ''}`}
            onClick={() => setActiveTab('diary')}>
            Diary {diaryEntries.length > 0 && <span className="cw-tab-count">{diaryEntries.length}</span>}
          </button>
        </nav>

        {activeTab === 'chat' && (
          <div className="cw-chat-panel">
            <div className="cw-messages">
              {isLoadingHistory ? (
                <div className="cw-empty-state"><p>Loading your session…</p></div>
              ) : messages.length === 0 ? (
                <div className="cw-empty-state">
                  <p>Hey {name}. This is your space. Start wherever feels right.</p>
                </div>
              ) : null}

              {messages.map((msg, idx) => (
                <div key={idx} className={`cw-message cw-message--${msg.role}`}>
                  <div className="cw-bubble">{msg.content}</div>
                  {msg.role === 'assistant' && (
                    <button className="cw-tts-btn"
                      onClick={() => speakMessage(msg.content, selectedPersona)}
                      title="Listen (coming soon)" aria-label="Read aloud">🔊</button>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="cw-message cw-message--assistant">
                  <div className="cw-bubble cw-bubble--loading">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="cw-input-area">
              <div className="cw-input-row">
                {micSupported && (
                  <button className={`cw-mic-btn ${isListening ? 'cw-mic-btn--active' : ''}`}
                    onClick={handleMicClick} aria-label={isListening ? 'Stop' : 'Speak'}>
                    {isListening ? '⏹' : '🎙'}
                  </button>
                )}
                <textarea ref={textareaRef} value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={isListening ? 'Listening…' : 'Type or speak your message…'}
                  className={`cw-textarea ${isListening ? 'cw-textarea--listening' : ''}`}
                  rows={1} />
                <button onClick={sendMessage} disabled={isLoading || !inputText.trim()}
                  className="cw-send-btn" aria-label="Send">↑</button>
              </div>
              <button onClick={saveToDiary}
                disabled={messages.length === 0 || saveStatus === 'saving'}
                className={`cw-save-btn ${saveStatus === 'saved' ? 'cw-save-btn--success' : ''} ${saveStatus === 'error' ? 'cw-save-btn--error' : ''}`}>
                {saveStatus === 'saving' && 'Saving…'}
                {saveStatus === 'saved'  && '✓ Saved to Diary'}
                {saveStatus === 'error'  && 'Save failed — try again'}
                {!saveStatus             && '💾 Save to Diary'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'diary' && (
          <div className="cw-diary-panel">
            {diaryEntries.length === 0 ? (
              <div className="cw-empty-state">
                <p>Your diary entries will appear here after you save a conversation.</p>
              </div>
            ) : (
              <div className="cw-diary-list">
                {diaryEntries.map((entry, idx) => {
                  const meta = PERSONA_META[entry.persona] || PERSONA_META['gentle-guide'];
                  return (
                    <div key={idx} className="cw-diary-entry"
                      style={{ background: meta.gradient, borderLeftColor: meta.color }}>
                      <div className="cw-diary-meta">
                        <span className="cw-diary-date">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                        <span className="cw-diary-persona"
                          style={{ color: meta.color, background: `${meta.color}18` }}>
                          {meta.label}
                        </span>
                      </div>
                      <div className="cw-diary-section">
                        <p className="cw-diary-label">Narrative</p>
                        <p className="cw-diary-text">{entry.narrative}</p>
                      </div>
                      <div className="cw-diary-section">
                        <p className="cw-diary-label">Reflection</p>
                        <p className="cw-diary-text">{entry.microCommitment}</p>
                      </div>
                      <div className="cw-diary-wordmark">
                        <span className="cw-diary-wm-n">narrative</span>
                        <span className="cw-diary-wm-f">First</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
