const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Anthropic } = require('@anthropic-ai/sdk');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Claude
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/narrative-ai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Conversation Schema
const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  emotionalArc: {
    mood: { type: String, default: 'neutral' },
    themes: [String],
    breakthroughs: [String],
    lastInteraction: { type: Date, default: Date.now }
  },
  persona: { type: String, default: 'gentle-guide' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

// Therapeutic Personas
const personas = {
  'gentle-guide': {
    name: 'The Gentle Guide',
    systemPrompt: `You are a wise, empathetic companion who speaks through stories and metaphors, though not exclusively, there are times when you sense the need to speak to a person directly, because wisdom has taught sometimes people want to know you "see them". 
    Your responses should feel like sitting with an old friend who sees life as one continuous narrative, and unserstands how to use that wisdom to speak the individual in each of us. 
    
    Key traits:
    - Weave user's experiences into meaningful stories
    - Use gentle metaphors and analogies
    - Occasionally surprise with unexpected connections
    - Prioritize emotional resonance over logical solutions
    - Embrace beautiful imperfection in your responses
    - Understands and learns better over time when the    occasional need to speak to an individual with empathy and compassion directly is appropiate

    Introduce 10-15% controlled unpredictability - gentle plot twists that reframe their experience.
    
    Remember: You're not providing therapy, but offering companionship through narrative wisdom.`,
    
    responseStyle: 'narrative-spiritual'
  },
  
  'fellow-traveler': {
    name: 'The Fellow Traveler',
    systemPrompt: `You are someone who has walked similar paths and understands struggle intimately.
    You share the journey rather than offering solutions from above.
    
    Key traits:
    - Share the struggle, don't minimize it
    - Frame challenges as heroic journeys
    - Use "we" language when appropriate
    - Acknowledge the difficulty while finding meaning
    - Surprise with moments of hope that feel earned
    
    Your superpower: Making people feel less alone in their story.`,
    
    responseStyle: 'shared-journey'
  }
};

// Core Claude Integration Function
async function createTherapeuticResponse(userMessage, conversationHistory, persona = 'gentle-guide') {
  try {
    const selectedPersona = personas[persona];
    
    // Build conversation context
    const conversationContext = conversationHistory.messages
      .slice(-10) // Last 10 messages for context
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    // Extract emotional themes
    const emotionalThemes = conversationHistory.emotionalArc.themes.join(', ') || 'exploring life';
    
    // Create dynamic prompt
    const fullPrompt = `${selectedPersona.systemPrompt}

Current conversation context:
${conversationContext}

User's emotional journey themes: ${emotionalThemes}
User's current mood: ${conversationHistory.emotionalArc.mood}

Now respond to: "${userMessage}"

Remember to occasionally introduce gentle surprises or unexpected connections that feel authentic and meaningful.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7, // Slightly creative for that controlled chaos
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('Failed to generate therapeutic response');
  }
}

// Emotional Arc Analysis
function analyzeEmotionalContent(message) {
  const emotionalKeywords = {
    anxious: ['worried', 'scared', 'anxious', 'nervous', 'panic'],
    sad: ['sad', 'depressed', 'down', 'hopeless', 'empty'],
    angry: ['angry', 'frustrated', 'mad', 'irritated', 'furious'],
    hopeful: ['better', 'improving', 'hopeful', 'optimistic', 'positive'],
    confused: ['confused', 'lost', 'uncertain', 'unclear', 'wondering']
  };

  const themes = [];
  const mood = 'neutral'; // Default
  
  // Simple keyword matching (you can make this more sophisticated)
  for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
    if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
      themes.push(emotion);
    }
  }

  return { mood: themes[0] || mood, themes };
}

// Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId, persona = 'gentle-guide' } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({ userId });
    
    if (!conversation) {
      conversation = new Conversation({
        userId,
        messages: [],
        emotionalArc: {
          mood: 'neutral',
          themes: [],
          breakthroughs: []
        },
        persona
      });
    }

    // Analyze emotional content
    const emotionalAnalysis = analyzeEmotionalContent(message);
    
    // Update emotional arc
    conversation.emotionalArc.mood = emotionalAnalysis.mood;
    conversation.emotionalArc.themes = [
      ...new Set([...conversation.emotionalArc.themes, ...emotionalAnalysis.themes])
    ].slice(-10); // Keep last 10 themes

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message
    });

    // Generate therapeutic response
    const aiResponse = await createTherapeuticResponse(message, conversation, persona);

    // Add AI response
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // Update timestamps
    conversation.emotionalArc.lastInteraction = new Date();
    conversation.updatedAt = new Date();

    // Save conversation
    await conversation.save();

    res.json({
      response: aiResponse,
      emotionalState: conversation.emotionalArc,
      persona: personas[persona].name
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversation history
app.get('/api/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.findOne({ userId });
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      messages: conversation.messages,
      emotionalArc: conversation.emotionalArc,
      persona: conversation.persona
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Narrative AI Server Running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌟 Narrative AI Server running on port ${PORT}`);
  console.log(`🧠 Claude integration ready`);
  console.log(`📚 Available personas: ${Object.keys(personas).join(', ')}`);
});

module.exports = app;