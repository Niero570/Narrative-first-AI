import React, { useState, useEffect } from 'react';

function ChatWindow() {
  const [userId, setUserId] = useState(null);
  const [tempName, setTempName] = useState('');
  // Rest of your component with userId
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('gentle-guide');
  const [diaryEntries, setDiaryEntries] = useState([]);


if (!userId) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#7EDECF',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1>Welcome to NarrativeAI</h1>
        <p style={{ marginTop: '20px', color: '#666' }}>
          To begin, create a temporary session name:
        </p>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          placeholder="Enter any name (e.g. Sarah, Test1)"
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px'
          }}
        />
        <button
          onClick={() => {
            if (tempName.trim()) {
              setUserId('session-' + tempName.trim());
            }
          }}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            background: '#4A9B8E',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Start Session
        </button>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
          This is a test version. Your session will be temporary.
        </p>
      </div>
    </div>
  );
}


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
          userId: userId
        })
      });
  
      const data = await response.json();
      
      // Add AI response to chat
      const aiMessage = { role: 'assistant', content: data.response || data.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToDiary = async () => {
    console.log('🔵 Save to Diary clicked');
    console.log('🔵 Messages:', messages);
    
    try {
      // Get the last 10 messages from the conversation
      const conversationText = messages
        .slice(-10)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n');
      
      console.log('🔵 Conversation text:', conversationText);
    
      // Call your crystallize endpoint
      const response = await fetch('http://localhost:3001/api/crystallize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: conversationText })
      });
      
      console.log('🔵 Response status:', response.status);
    
      const data = await response.json();
      
      console.log('🔵 Data received:', data);
      
      // Add to diary entries
      setDiaryEntries(prev => {
        const newEntries = [...prev, {
          narrative: data.narrative,
          microCommitment: data.microCommitment,
          timestamp: new Date().toISOString()
        }];
        console.log('🔵 New diary entries:', newEntries);
        return newEntries;
      });
      
    } catch (error) {
      console.error('🔴 Error saving to diary:', error);
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
        onClick={saveToDiary}
      >
        💾 Save to Diary
      </button>

      {/* Diary Entries Display */}
{diaryEntries.length > 0 && (
  <div style={{ 
    marginTop: '30px', 
    padding: '20px', 
    background: '#f5f5f5',
    borderRadius: '8px',
    maxHeight: '400px',  // ADD THIS
    overflowY: 'scroll'
  }}>
    <h3>Diary Entries</h3>
    {diaryEntries.map((entry, idx) => (
      <div key={idx} style={{
        marginBottom: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '5px',
        borderLeft: '4px solid #4A9B8E',
       
      }}>
        <p style={{ fontSize: '12px', color: '#666' }}>
          {new Date(entry.timestamp).toLocaleString()}
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>Narrative:</strong> {entry.narrative}
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>Reflection:</strong> {entry.microCommitment}
        </p>
      </div>
    ))}
  </div>
)}
    </div>

    
  );
}

export default ChatWindow;