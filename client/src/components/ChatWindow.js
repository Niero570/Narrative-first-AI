import API_URL from '../config';
import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognitionService from '../services/SpeechRecognitionService';
import './ChatWindow.css';

const speechService = new SpeechRecognitionService();

function ChatWindow() {
  const [userId, setUserId] = useState(null);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [welcomeError, setWelcomeError] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('gentle-guide');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [saveStatus, setSaveStatus] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [micSupported] = useState(() => !!speechService.recognition);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!speechService.recognition) return;

    speechService.onResult((transcript) => {
      setIsListening(false);
      setInputText(prev => prev ? prev + ' ' + transcript : transcript);
      textareaRef.current?.focus();
    });

    speechService.onError(() => {
      setIsListening(false);
    });
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening();
    }
  };

  const handleBeginSession = () => {
    if (!tempName.trim()) {
      setWelcomeError('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!tempEmail.trim() || !emailRegex.test(tempEmail)) {
      setWelcomeError('Please enter a valid email address.');
      return;
    }
    setUserId('session-' + tempName.trim());
  };

  if (!userId) {
    return (
      <div className="cw-welcome-screen">
        <div className="cw-welcome-card">
          <div className="cw-logo-mark">✦</div>
          <h1 className="cw-welcome-title">
            <span className="cw-name-narrative">narrative</span>
            <span className="cw-name-first">First</span>
          </h1>
          <p className="cw-welcome-subtitle">
            A space to think out loud, reflect, and find your way through.
          </p>
          <input
            type="text"
            value={tempName}
            onChange={(e) => { setTempName(e.target.value); setWelcomeError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleBeginSession()}
            placeholder="Your name"
            className="cw-welcome-input"
            autoFocus
          />
          <input
            type="email"
            value={tempEmail}
            onChange={(e) => { setTempEmail(e.target.value); setWelcomeError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleBeginSession()}
            placeholder="Your email"
            className="cw-welcome-input"
          />
          {welcomeError && <p className="cw-welcome-error">{welcomeError}</p>}
          <button onClick={handleBeginSession} className="cw-welcome-btn">
            Begin Session
          </button>
          <p className="cw-welcome-note">Beta version · Your session is private</p>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText, persona: selectedPersona, userId })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToDiary = async () => {
    if (messages.length === 0) return;
    setSaveStatus('saving');

    try {
      const conversationText = messages
        .slice(-10)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n');

      const response = await fetch(`${API_URL}/api/crystallize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: conversationText })
      });
      const data = await response.json();

      setDiaryEntries(prev => [{
        narrative: data.narrative,
        microCommitment: data.microCommitment,
        timestamp: new Date().toISOString(),
        persona: selectedPersona,
      }, ...prev]);

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error saving to diary:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const personaLabels = {
    'gentle-guide': 'Gentle Guide',
    'fellow-traveler': 'Fellow Traveler',
    'wise-old-fool': 'Wise Old Fool',
  };

  const personas = [
    { value: 'gentle-guide', label: 'Gentle Guide' },
    { value: 'fellow-traveler', label: 'Fellow Traveler' },
    { value: 'wise-old-fool', label: 'Wise Old Fool' },
  ];

  return (
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
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value)}
            className="cw-persona-select"
          >
            {personas.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="cw-persona-badge">
        Speaking with: <strong>{personaLabels[selectedPersona]}</strong>
        {selectedPersona === 'wise-old-fool' && <span className="cw-badge-tag">New</span>}
      </div>

      <nav className="cw-tabs">
        <button
          className={`cw-tab ${activeTab === 'chat' ? 'cw-tab--active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Conversation
        </button>
        <button
          className={`cw-tab ${activeTab === 'diary' ? 'cw-tab--active' : ''}`}
          onClick={() => setActiveTab('diary')}
        >
          Diary {diaryEntries.length > 0 && <span className="cw-tab-count">{diaryEntries.length}</span>}
        </button>
      </nav>

      {activeTab === 'chat' && (
        <div className="cw-chat-panel">
          <div className="cw-messages">
            {messages.length === 0 && (
              <div className="cw-empty-state">
                <p>This is your space. Start wherever feels right.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`cw-message cw-message--${msg.role}`}>
                <div className="cw-bubble">{msg.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="cw-message cw-message--assistant">
                <div className="cw-bubble cw-bubble--loading">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="cw-input-area">
            <div className="cw-input-row">
              {micSupported && (
                <button
                  onClick={handleMicClick}
                  className={`cw-mic-btn ${isListening ? 'cw-mic-btn--active' : ''}`}
                  aria-label={isListening ? 'Stop listening' : 'Speak your message'}
                  title={isListening ? 'Tap to stop' : 'Tap to speak'}
                >
                  {isListening ? '⏹' : '🎙'}
                </button>
              )}
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={isListening ? 'Listening...' : 'Type or speak your message...'}
                className={`cw-textarea ${isListening ? 'cw-textarea--listening' : ''}`}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
                className="cw-send-btn"
                aria-label="Send"
              >
                ↑
              </button>
            </div>
            <button
              onClick={saveToDiary}
              disabled={messages.length === 0 || saveStatus === 'saving'}
              className={`cw-save-btn ${saveStatus === 'saved' ? 'cw-save-btn--success' : ''} ${saveStatus === 'error' ? 'cw-save-btn--error' : ''}`}
            >
              {saveStatus === 'saving' && 'Saving...'}
              {saveStatus === 'saved' && '✓ Saved to Diary'}
              {saveStatus === 'error' && 'Save failed — try again'}
              {!saveStatus && '💾 Save to Diary'}
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
              {diaryEntries.map((entry, idx) => (
                <div key={idx} className="cw-diary-entry">
                  <div className="cw-diary-meta">
                    <span className="cw-diary-date">{new Date(entry.timestamp).toLocaleString()}</span>
                    <span className="cw-diary-persona">{personaLabels[entry.persona] || entry.persona}</span>
                  </div>
                  <div className="cw-diary-section">
                    <p className="cw-diary-label">Narrative</p>
                    <p className="cw-diary-text">{entry.narrative}</p>
                  </div>
                  <div className="cw-diary-section">
                    <p className="cw-diary-label">Reflection</p>
                    <p className="cw-diary-text">{entry.microCommitment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
