import React, { useState, useEffect } from 'react';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('gentle-guide');

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Call your backend API
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputText,
          persona: selectedPersona,
          userId: 'demo-user'
        })
      });

      const data = await response.json();
      
      // Add AI response to chat
      const aiMessage = { role: 'assistant', content: data.message || data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Chat with Your AI Confidant</h2>
      
      {/* Persona selector */}
      <select 
        value={selectedPersona} 
        onChange={(e) => setSelectedPersona(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px' }}
      >
        <option value="gentle-guide">Gentle Guide</option>
        <option value="fellow-traveler">Fellow Traveler</option>
      </select>

      {/* Messages */}
      <div style={{ 
        height: '400px', 
        overflowY: 'scroll', 
        border: '1px solid #ccc', 
        padding: '10px',
        marginBottom: '20px',
        background: '#f9f9f9'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.role === 'user' ? 'right' : 'left',
            margin: '10px 0'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '10px',
              borderRadius: '10px',
              background: msg.role === 'user' ? '#4A9B8E' : '#e0e0e0',
              color: msg.role === 'user' ? 'white' : 'black',
              maxWidth: '70%'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div style={{ textAlign: 'left', fontStyle: 'italic' }}>Thinking...</div>}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button 
          onClick={sendMessage}
          disabled={isLoading}
          style={{ 
            padding: '10px 20px', 
            background: '#4A9B8E', 
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>

      {/* Save to Diary button */}
      <button 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#6B8E9B',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%'
        }}
        onClick={() => alert('This will open the diary! Coming soon...')}
      >
        💾 Save to Diary
      </button>
    </div>
  );
}

export default ChatWindow;