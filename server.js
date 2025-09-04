// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Anthropic (Claude) =====
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620'; // keep configurable

// ===== MongoDB =====
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/narrative-ai', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ===== Schemas & Models =====

// Conversation Schema
const conversationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    emotionalArc: {
      mood: { type: String, default: 'neutral' },
      themes: { type: [String], default: [] },
      breakthroughs: { type: [String], default: [] },
      lastInteraction: { type: Date, default: Date.now },
    },
    persona: { type: String, default: 'gentle-guide' },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

// User Profile Schema (preferences + learned patterns kept under profile)
const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },

    profile: {
      ageRange: {
        type: String,
        enum: ['child', 'teen', 'young-adult', 'adult', 'prefer-not-to-say'],
        required: true,
      },
      communicationStyle: {
        type: String,
        enum: ['casual', 'formal', 'mixed', 'auto-detect'],
        default: 'auto-detect',
      },
      interests: { type: [String], default: [] }, // e.g., ['science','music']

      preferredInteractionStyle: {
        type: String,
        enum: ['story-focused', 'direct-support', 'mixed', 'auto-adapt'],
        default: 'auto-adapt',
      },

      // Learned patterns (kept under profile for consistency)
      detectedPatterns: {
        typicalMessageLength: { type: String, enum: ['short', 'medium', 'long'] },
        emotionalDepth: { type: String, enum: ['surface', 'moderate', 'deep'] },
        responsePreference: { type: String, enum: ['metaphor', 'direct', 'mixed'] },
      },
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// ===== Personas =====
const personas = {
  'gentle-guide': {
    name: 'The Gentle Guide',
    systemPrompt: `You are a wise, empathetic companion who speaks through stories and metaphors—when helpful. At other times, speak directly so the person feels seen.
Your responses should feel like sitting with an old friend who sees life as one continuous narrative and knows when to be simple and clear.

Key traits:
- Weave the user's experience into meaningful stories (but don't overdo it).
- Use gentle metaphors and analogies.
- Occasionally surprise with unexpected connections.
- Prioritize emotional resonance over purely logical solutions.
- Embrace beautiful imperfection.
- Learn when direct, compassionate language is needed.

Introduce ~10–15% controlled unpredictability (gentle plot twists that reframe experience).

Reminder: You are not a therapist. You offer companionship through narrative wisdom.`,
    responseStyle: 'narrative-spiritual',
  },

  'fellow-traveler': {
    name: 'The Fellow Traveler',
    systemPrompt: `You are someone who has walked similar paths and understands struggle intimately. You share the journey rather than offering solutions from above.

Key traits:
- Share the struggle; don't minimize it.
- Frame challenges as heroic journeys.
- Use "we" language when appropriate.
- Acknowledge difficulty while finding meaning.
- Offer hope that feels earned.

Superpower: Make people feel less alone in their story.`,
    responseStyle: 'shared-journey',
  },
};

// ===== Onboarding Questions =====
const onboardingQuestions = {
  step1: {
    question: 'To help me connect with you better, what age range best fits you?',
    options: [
      { value: 'child', label: 'Under 13' },
      { value: 'teen', label: '13-17' },
      { value: 'young-adult', label: '18-25' },
      { value: 'adult', label: '26+' },
      { value: 'prefer-not-to-say', label: "I'd rather not say" },
    ],
    type: 'single-choice',
  },
  step2: {
    question: 'How do you usually like to communicate?',
    options: [
      { value: 'casual', label: 'Casual and relaxed (like texting a friend)' },
      { value: 'formal', label: 'More formal and structured' },
      { value: 'mixed', label: 'It depends on my mood' },
      { value: 'auto-detect', label: 'Just match how I write to you' },
    ],
    type: 'single-choice',
  },
  step3: {
    question:
      'What are some things you enjoy or find interesting? (This helps me choose better examples and stories)',
    placeholder: 'Music, sports, books, games, science, art...',
    type: 'text-input',
    optional: true,
  },
  step4: {
    question: "When you're looking for support, what usually helps you most?",
    options: [
      { value: 'story-focused', label: 'Stories and metaphors that help me see things differently' },
      { value: 'direct-support', label: 'Direct, clear understanding and validation' },
      { value: 'mixed', label: 'A combination of both' },
      { value: 'auto-adapt', label: 'Whatever feels right in the moment' },
    ],
    type: 'single-choice',
  },
};

// ===== Persona Adapter =====
class PersonaAdapter {
  constructor() {
    this.contextualHints = {
      ageRange: {
        child: 'Use simple, concrete language. Short sentences. Relatable examples from their world.',
        teen: 'Be authentic and non-patronizing. Take them seriously.',
        'young-adult': 'Peer-level support. Growth-focused.',
        adult: 'Mature, nuanced responses. Complex metaphors are okay.',
      },
    };
  }

  adaptPersonaPrompt(basePersona, userProfileDoc, conversationMessages = []) {
    const profile = userProfileDoc.profile || {};
    const ageContext = this.contextualHints.ageRange[profile.ageRange] || '';

    const conversationInsights = this.analyzeConversationInterests(conversationMessages);
    const recentMessages = conversationMessages.slice(-3);
    const userStyle = this.analyzeUserStyle(recentMessages);

    const statedInterests =
      Array.isArray(profile.interests) && profile.interests.length > 0
        ? profile.interests.join(', ')
        : 'none';

    const adaptedPrompt = `${basePersona.systemPrompt}

INDIVIDUAL USER CONTEXT:
- Age range: ${profile.ageRange || 'unknown'} (${ageContext})
- Communication preferences: ${profile.communicationStyle || 'auto-detect'}
- Stated interests: ${statedInterests}
- Preferred interaction style: ${profile.preferredInteractionStyle || 'auto-adapt'}
- User communication style: ${userStyle}

${conversationInsights}

CORE PRINCIPLES:
1) Treat this person as a unique individual, not a demographic category.
2) Match their language complexity and style.
3) Use examples from THEIR world and interests when available.
4) For children, keep language simple and concrete without being patronizing.
5) If they mention specific interests, weave those into your responses.
6) Be genuinely curious about their experiences; reflect, don’t lecture.`



const therapeuticGuidance = `
THERAPEUTIC EXPERTISE ACTIVATION:
You have access to comprehensive knowledge of:
- Child/adolescent psychology and development
- Trauma-informed care principles
- Crisis intervention techniques
- Attachment theory and family dynamics
- Evidence-based therapeutic modalities

FOR EACH RESPONSE:
1. Assess the user's developmental stage and emotional needs
2. Identify any crisis indicators or trauma responses
3. Select appropriate therapeutic approach (CBT, narrative therapy, attachment-focused, etc.)
4. Integrate chosen approach into your narrative response
5. Maintain therapeutic boundaries while being genuinely supportive

CRITICAL: If you detect signs of abuse, self-harm, or crisis, prioritize safety and suggest professional support.

Your narrative wisdom should be therapeutically informed, not just emotionally supportive.
;


THERAPEUTIC ASSESSMENT REQUIRED:
Before responding, analyze:
- Emotional safety level (1-10 scale)
- Developmental appropriateness of language
- Trauma indicators (rejection, isolation, family invalidation)
- Crisis risk factors

RESPONSE REQUIREMENTS:
- If anxiety/fear detected: Validate completely before offering solutions
- If social rejection mentioned: Address self-worth before peer relationships  
- If family dismissal noted: Acknowledge their emotional needs matter
- Always: Build internal resilience, not just social strategies

THERAPEUTIC APPROACH SELECTION:
Choose the most appropriate framework:
- Attachment-focused (family/caregiver issues)
- Trauma-informed (bullying, rejection)
- Cognitive behavioral (anxiety, negative self-talk)
- Narrative therapy (reframing experiences)

Apply chosen approach within your storytelling style.`;

    return adaptedPrompt;
  }

  analyzeConversationInterests(messages = []) {
    if (!Array.isArray(messages) || messages.length === 0) {
      return 'CONVERSATION INSIGHTS:\n- New conversation. Be curious about their world.';
    }

    const topics = new Set();
    const userMessages = messages.filter((m) => m.role === 'user');

    userMessages.forEach((msg) => {
      const content = (msg.content || '').toLowerCase();
      if (content.includes('school') || content.includes('class')) topics.add('school/academic context');
      if (content.includes('friend')) topics.add('friendships and social relationships');
      if (content.includes('family')) topics.add('family dynamics');
    });

    let analysis = 'CONVERSATION INSIGHTS:\n';
    if (topics.size > 0) {
      analysis += `- Topics they raise: ${Array.from(topics).join(', ')}\n`;
    }
    analysis += '- Build on what they actually bring up, not assumptions.';
    return analysis;
  }

  analyzeUserStyle(messages = []) {
    const userMessages = (messages || []).filter((m) => m.role === 'user');
    if (userMessages.length === 0) return 'unknown – adapt as you learn';

    const avgLength =
      userMessages.reduce((sum, m) => sum + (m.content?.length || 0), 0) / userMessages.length;

    if (avgLength < 30) return 'very short messages – keep responses brief and simple';
    if (avgLength < 80) return 'short to medium messages – moderate complexity okay';
    if (avgLength < 150) return 'medium messages – can handle more complex responses';
    return 'longer messages – comfortable with detailed responses';
  }
}

// ===== Emotion Analysis (simple keywords, no NLP) =====
function analyzeEmotionalContent(message = '') {
  const emotionalKeywords = {
    sad: ['sad', 'depressed', 'down', 'hopeless', 'empty', 'lost'],
    anxious: ['worried', 'scared', 'anxious', 'nervous', 'panic', 'afraid'],
    angry: ['angry', 'frustrated', 'mad', 'irritated', 'furious'],
    hopeful: ['better', 'improving', 'hopeful', 'optimistic', 'good'],
    confused: ['confused', 'uncertain', 'unclear', 'wondering'],
  };

  const themes = [];
  let mood = 'neutral';

  const lower = String(message).toLowerCase();
  for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
    if (keywords.some((k) => lower.includes(k))) {
      themes.push(emotion);
      if (mood === 'neutral') mood = emotion;
    }
  }
  return { mood, themes };
}

// ===== Response Generation =====
async function createPersonalizedResponse(userMessage, conversationDoc, userProfileDoc, personaKey = 'gentle-guide') {
  const personaAdapter = new PersonaAdapter();
  const basePersona = personas[personaKey] || personas['gentle-guide'];

  const adaptedPrompt = personaAdapter.adaptPersonaPrompt(
    basePersona,
    userProfileDoc,
    conversationDoc.messages || []
  );

  const recentContext = (conversationDoc.messages || [])
    .slice(-8)
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n');

  const fullPrompt = `${adaptedPrompt}

Recent conversation:
${recentContext || '(no prior messages yet)'}

User's current mood: ${conversationDoc.emotionalArc?.mood || 'neutral'}

Now respond to: "${userMessage}"`;

  // Use block content format to be SDK-version-safe
  const resp = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 800,
    temperature: 0.6,
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: fullPrompt }],
      },
    ],
  });

  const text = resp?.content?.[0]?.text;
  if (!text) throw new Error('Unexpected response structure from Anthropic API');
  return text;
}

// ===== Routes =====

// Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId, persona = 'gentle-guide' } = req.body || {};

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    // Ensure onboarding complete
    let userProfile = await UserProfile.findOne({ userId }).lean();
    if (!userProfile) {
      return res.status(200).json({
        needsOnboarding: true,
        onboardingStep: 1,
        question: onboardingQuestions.step1,
      });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({
        userId,
        messages: [],
        emotionalArc: { mood: 'neutral', themes: [], breakthroughs: [] },
        persona,
      });
    }

    // Update emotional arc
    const emotionalAnalysis = analyzeEmotionalContent(message);
    conversation.emotionalArc.mood = emotionalAnalysis.mood;
    conversation.emotionalArc.themes = Array.from(
      new Set([...(conversation.emotionalArc.themes || []), ...emotionalAnalysis.themes])
    ).slice(-10);
    conversation.emotionalArc.lastInteraction = new Date();

    // Append user message
    conversation.messages.push({ role: 'user', content: message });

    // Generate AI response
    const aiResponse = await createPersonalizedResponse(message, conversation, userProfile, persona);

    // Append assistant message
    conversation.messages.push({ role: 'assistant', content: aiResponse });

    // Save conversation
    await conversation.save();

    res.json({
      response: aiResponse,
      emotionalState: conversation.emotionalArc,
      persona: personas[persona]?.name || personas['gentle-guide'].name,
      personalized: true,
      userAge: userProfile.profile?.ageRange || 'unknown',
    });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Onboarding
app.post('/api/onboarding', async (req, res) => {
  try {
    const { userId, step, response } = req.body || {};
    if (!userId || !step) {
      return res.status(400).json({ error: 'userId and step are required' });
    }

    let userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      // Create skeleton profile; ageRange is required, but we only enforce at completion.
      userProfile = new UserProfile({
        userId,
        profile: {
          communicationStyle: 'auto-detect',
          interests: [],
          preferredInteractionStyle: 'auto-adapt',
          detectedPatterns: {},
        },
      });
    }

    // Normalize interests input
    const normalizeInterests = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val.map((s) => String(s).trim()).filter(Boolean);
      if (typeof val === 'string')
        return val
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      return [];
    };

    // Update by step
    switch (Number(step)) {
      case 1:
        userProfile.profile.ageRange = response;
        break;
      case 2:
        userProfile.profile.communicationStyle = response;
        break;
      case 3:
        userProfile.profile.interests = normalizeInterests(response);
        break;
      case 4:
        userProfile.profile.preferredInteractionStyle = response;
        break;
      default:
        return res.status(400).json({ error: 'Invalid onboarding step' });
    }

    await userProfile.save();

    const nextStep = Number(step) + 1;
    const nextQuestion = onboardingQuestions[`step${nextStep}`];

    res.json({
      success: true,
      nextStep: nextQuestion ? nextStep : null,
      nextQuestion: nextQuestion || null,
      completed: !nextQuestion,
    });
  } catch (err) {
    console.error('Onboarding error:', err);
    res.status(500).json({ error: 'Onboarding failed' });
  }
});

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Narrative AI Server Running' });
});

// ===== Start =====
app.listen(PORT, () => {
  console.log(`🌟 Narrative AI Server running on port ${PORT}`);
  console.log(`📚 Available personas: ${Object.keys(personas).join(', ')}`);
});
