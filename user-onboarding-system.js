import mongoose from 'mongoose';

// Compact UserProfile schema for shared onboarding/profile storage
const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    profile: {
      ageRange: {
        type: String,
        enum: ['child', 'teen', 'young-adult', 'adult', 'prefer-not-to-say'],
        required: false,
      },
      communicationStyle: {
        type: String,
        enum: ['casual', 'formal', 'mixed', 'auto-detect'],
        default: 'auto-detect',
      },
      interests: { type: [String], default: [] },
      preferredInteractionStyle: {
        type: String,
        enum: ['story-focused', 'direct-support', 'mixed', 'auto-adapt'],
        default: 'auto-adapt',
      },
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

// Onboarding question set (shared with client)
const onboardingQuestions = {
  step1: {
    question: "To help me connect with you better, what age range feels right for you?",
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

// PersonaAdapter: builds adaptive prompts and analyzes simple conversation signals
class PersonaAdapter {
  constructor() {
    this.contextualHints = {
      ageRange: {
        child: 'May appreciate wonder and discovery, but treat as capable individual',
        teen: 'Values authenticity, autonomy, and being taken seriously',
        'young-adult': 'Navigating independence and identity formation',
        adult: 'Dealing with complex life responsibilities and relationships',
      },
    };
  }

  adaptPersonaPrompt(basePersona, userProfile = {}, conversationHistory = []) {
    const profile = userProfile.profile || {};
    const ageContext = this.contextualHints.ageRange[profile.ageRange] || '';
    const statedInterests = Array.isArray(profile.interests) && profile.interests.length > 0 ? profile.interests.join(', ') : 'to be discovered through conversation';

    const recentMessages = (conversationHistory || []).slice(-3);
    const avgLength = this.analyzeMessageLength(recentMessages);
    const casualityLevel = this.analyzeCasualness(recentMessages);

    const adaptedPrompt = `${basePersona.systemPrompt}

INDIVIDUAL USER CONTEXT:
- Age range: ${profile.ageRange || 'unknown'} (${ageContext})
- Communication preference: ${profile.communicationStyle || 'auto-detect'}
- Stated interests: ${statedInterests}
- Interaction style: ${profile.preferredInteractionStyle || 'auto-adapt'}

CONVERSATION-DRIVEN INSIGHTS:
- Recent message length: ${avgLength}
- Tone: ${casualityLevel}

CORE PRINCIPLES:
1. Treat this person as a unique individual.
2. Match their language and examples to what they share.

RESPONSE GUIDELINES:
- If they mention interests, weave them into metaphors.
- Match sophistication to the user's language.
- Prioritize authentic connection.
`;

    return adaptedPrompt;
  }

  analyzeMessageLength(messages = []) {
    if (!messages || messages.length === 0) return 'medium';
    const avgLength = messages.reduce((s, m) => s + (m.content?.length || 0), 0) / messages.length;
    if (avgLength < 50) return 'short';
    if (avgLength < 150) return 'medium';
    return 'long';
  }

  analyzeCasualness(messages = []) {
    if (!messages || messages.length === 0) return 'moderate';
    const casualMarkers = ['lol', 'omg', 'tbh', 'ngl', 'fr', 'btw', '!!', '???'];
    const formalMarkers = ['however', 'therefore', 'furthermore', 'consequently'];
    let casualScore = 0;
    let formalScore = 0;
    messages.forEach((msg) => {
      const content = (msg.content || '').toLowerCase();
      casualMarkers.forEach((m) => { if (content.includes(m)) casualScore++; });
      formalMarkers.forEach((m) => { if (content.includes(m)) formalScore++; });
    });
    if (casualScore > formalScore) return 'casual';
    if (formalScore > casualScore) return 'formal';
    return 'moderate';
  }

  // Lightweight update hook - does not perform DB writes here.
  derivePatternFromInteraction(newMessage, aiResponse) {
    const messageLength = newMessage.length < 50 ? 'short' : newMessage.length < 150 ? 'medium' : 'long';
    return { typicalMessageLength: messageLength };
  }
}

export { UserProfile, PersonaAdapter, onboardingQuestions };