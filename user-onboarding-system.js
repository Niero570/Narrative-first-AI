// User Onboarding Schema
const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  profile: {
    ageRange: { 
      type: String, 
      enum: ['child', 'teen', 'young-adult', 'adult', 'prefer-not-to-say'],
      required: true 
    },
    communicationStyle: {
      type: String,
      enum: ['casual', 'formal', 'mixed', 'auto-detect'],
      default: 'auto-detect'
    },
    culturalBackground: {
      type: String,
      default: 'not-specified'
    },
    interests: [String], // Array of interests/hobbies
    preferredInteractionStyle: {
      type: String,
      enum: ['story-focused', 'direct-support', 'mixed', 'auto-adapt'],
      default: 'auto-adapt'
    }
  },
  detectedPatterns: {
    // AI learns user's patterns over time
    typicalMessageLength: { type: String, enum: ['short', 'medium', 'long'] },
    emotionalDepth: { type: String, enum: ['surface', 'moderate', 'deep'] },
    responsePreference: { type: String, enum: ['metaphor', 'direct', 'mixed'] }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Onboarding Questions Flow
const onboardingQuestions = {
  step1: {
    question: "To help me connect with you better, what age range feels right for you?",
    options: [
      { value: 'child', label: 'Under 13' },
      { value: 'teen', label: '13-17' },
      { value: 'young-adult', label: '18-25' },
      { value: 'adult', label: '26+' },
      { value: 'prefer-not-to-say', label: 'I\'d rather not say' }
    ],
    type: 'single-choice'
  },
  
  step2: {
    question: "How do you usually like to communicate?",
    options: [
      { value: 'casual', label: 'Casual and relaxed (like texting a friend)' },
      { value: 'formal', label: 'More formal and structured' },
      { value: 'mixed', label: 'It depends on my mood' },
      { value: 'auto-detect', label: 'Just match how I write to you' }
    ],
    type: 'single-choice'
  },
  
  step3: {
    question: "What are some things you enjoy or find interesting? (This helps me choose better examples and stories)",
    placeholder: "Music, sports, books, games, science, art...",
    type: 'text-input',
    optional: true
  },
  
  step4: {
    question: "When you're looking for support, what usually helps you most?",
    options: [
      { value: 'story-focused', label: 'Stories and metaphors that help me see things differently' },
      { value: 'direct-support', label: 'Direct, clear understanding and validation' },
      { value: 'mixed', label: 'A combination of both' },
      { value: 'auto-adapt', label: 'Whatever feels right in the moment' }
    ],
    type: 'single-choice'
  }
};

// Enhanced Persona Adaptation System
class PersonaAdapter {
  constructor() {
    // Flexible reference suggestions, not rigid rules
    this.contextualHints = {
      ageRange: {
        child: 'May appreciate wonder and discovery, but treat as capable individual',
        teen: 'Values authenticity, autonomy, and being taken seriously',
        'young-adult': 'Navigating independence and identity formation',
        adult: 'Dealing with complex life responsibilities and relationships'
      },
      communicationGuidelines: {
        respectful: 'Always treat user as intelligent individual regardless of age',
        adaptive: 'Let conversation content guide reference choices',
        authentic: 'Avoid forced age-appropriate language - be genuine',
        responsive: 'Pay attention to what resonates and adapt accordingly'
      }
    };
  }

  adaptPersonaPrompt(basePersona, userProfile, conversationHistory = []) {
    const profile = userProfile.profile;
    const detected = userProfile.detectedPatterns;
    
    // Get contextual hints (not rigid rules)
    const ageContext = this.contextualHints.ageRange[profile.ageRange] || '';
    
    // Analyze conversation for emerging interests/references
    const conversationContext = this.analyzeConversationInterests(conversationHistory);
    
    // Detect user's communication patterns from recent messages
    const recentMessages = conversationHistory.slice(-3);
    const avgLength = this.analyzeMessageLength(recentMessages);
    const casualityLevel = this.analyzeCasualness(recentMessages);
    
    // Build adaptive prompt that emphasizes individual responsiveness
    let adaptedPrompt = `${basePersona.systemPrompt}

INDIVIDUAL USER CONTEXT:
- Age range: ${profile.ageRange} (${ageContext})
- Communication preference: ${profile.communicationStyle}
- Stated interests: ${profile.interests.join(', ') || 'to be discovered through conversation'}
- Interaction style: ${profile.preferredInteractionStyle}

CONVERSATION-DRIVEN INSIGHTS:
${conversationContext}

COMMUNICATION ADAPTATION:
- Match user's message style: ${avgLength} length, ${casualityLevel} tone
- Current patterns: ${detected.typicalMessageLength || 'learning'} messages, ${detected.emotionalDepth || 'discovering'} engagement

CORE PRINCIPLES:
1. Treat this person as a unique individual, not a demographic category
2. Let THEIR interests and responses guide your reference choices
3. Pay attention to what resonates - an 11-year-old might love Einstein if they're into science
4. Avoid patronizing language regardless of age
5. Be genuinely curious about THEIR world and experiences
6. Adapt your examples based on what they share, not assumptions

RESPONSE GUIDELINES:
- If they mention specific interests, weave those into your metaphors
- If they use sophisticated language, match that sophistication
- If they reference pop culture, consider using relatable examples
- Always prioritize authentic connection over demographic "appropriateness"

Remember: You're speaking to an individual person, not an age category.`;

    return adaptedPrompt;
  }

  analyzeMessageLength(messages) {
    if (messages.length === 0) return 'medium';
    
    const avgLength = messages.reduce((sum, msg) => sum + msg.content.length, 0) / messages.length;
    
    if (avgLength < 50) return 'short';
    if (avgLength < 150) return 'medium';
    return 'long';
  }

  analyzeCasualness(messages) {
    if (messages.length === 0) return 'moderate';
    
    const casualMarkers = ['lol', 'omg', 'tbh', 'ngl', 'fr', 'btw', '!!', '???'];
    const formalMarkers = ['however', 'therefore', 'furthermore', 'consequently'];
    
    let casualScore = 0;
    let formalScore = 0;
    
    messages.forEach(msg => {
      const content = msg.content.toLowerCase();
      casualMarkers.forEach(marker => {
        if (content.includes(marker)) casualScore++;
      });
      formalMarkers.forEach(marker => {
        if (content.includes(marker)) formalScore++;
      });
    });
    
    if (casualScore > formalScore) return 'casual';
    if (formalScore > casualScore) return 'formal';
    return 'moderate';
  }

  updateUserPatterns(userId, newMessage, aiResponse) {
    // Machine learning opportunity: analyze what responses work best
    // for this user and update their detected patterns
    
    const messageLength = newMessage.length < 50 ? 'short' : 
                         newMessage.length < 150 ? 'medium' : 'long';
    
    // Update user's detected patterns in database
    UserProfile.updateOne(
      { userId },
      { 
        $set: { 
          'detectedPatterns.typicalMessageLength': messageLength,
          updatedAt: new Date()
        }
      }
    );
  }
}

// Onboarding API Routes
app.post('/api/onboarding', async (req, res) => {
  try {
    const { userId, step, response } = req.body;
    
    let userProfile = await UserProfile.findOne({ userId });
    
    if (!userProfile) {
      userProfile = new UserProfile({
        userId,
        profile: {}
      });
    }
    
    // Update profile based on onboarding step
    switch (step) {
      case 1:
        userProfile.profile.ageRange = response;
        break;
      case 2:
        userProfile.profile.communicationStyle = response;
        break;
      case 3:
        userProfile.profile.interests = response.split(',').map(i => i.trim()).filter(i => i);
        break;
      case 4:
        userProfile.profile.preferredInteractionStyle = response;
        break;
    }
    
    userProfile.updatedAt = new Date();
    await userProfile.save();
    
    // If onboarding complete, return next question or completion
    const nextStep = step + 1;
    const nextQuestion = onboardingQuestions[`step${nextStep}`];
    
    res.json({
      success: true,
      nextStep: nextQuestion ? nextStep : null,
      nextQuestion: nextQuestion || null,
      completed: !nextQuestion
    });
    
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Onboarding failed' });
  }
});

// Enhanced Chat Endpoint with Persona Adaptation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId, persona = 'gentle-guide' } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    // Get user profile for personalization
    let userProfile = await UserProfile.findOne({ userId });
    
    if (!userProfile) {
      // If no profile exists, redirect to onboarding
      return res.status(200).json({
        needsOnboarding: true,
        onboardingStep: 1,
        question: onboardingQuestions.step1
      });
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
    ].slice(-10);

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message
    });

    // Adapt persona based on user profile
    const personaAdapter = new PersonaAdapter();
    const adaptedPrompt = personaAdapter.adaptPersonaPrompt(
      personas[persona], 
      userProfile, 
      conversation.messages
    );

    // Generate personalized therapeutic response
    const aiResponse = await createPersonalizedResponse(
      message, 
      conversation, 
      adaptedPrompt
    );

    // Add AI response
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // Update user patterns based on interaction
    personaAdapter.updateUserPatterns(userId, message, aiResponse);

    // Update timestamps
    conversation.emotionalArc.lastInteraction = new Date();
    conversation.updatedAt = new Date();

    // Save conversation
    await conversation.save();

    res.json({
      response: aiResponse,
      emotionalState: conversation.emotionalArc,
      persona: personas[persona].name,
      personalized: true
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Personalized Response Generation
async function createPersonalizedResponse(userMessage, conversationHistory, adaptedPrompt) {
  try {
    // Build conversation context
    const conversationContext = conversationHistory.messages
      .slice(-10)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    // Extract emotional themes
    const emotionalThemes = conversationHistory.emotionalArc.themes.join(', ') || 'exploring life';
    
    // Create personalized prompt
    const fullPrompt = `${adaptedPrompt}

Current conversation context:
${conversationContext}

User's emotional journey themes: ${emotionalThemes}
User's current mood: ${conversationHistory.emotionalArc.mood}

Now respond to: "${userMessage}"

Remember: Your response should feel authentic and natural for THIS specific user while maintaining therapeutic value.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Personalized response error:', error);
    throw new Error('Failed to generate personalized response');
  }
}

module.exports = { UserProfile, PersonaAdapter, onboardingQuestions };