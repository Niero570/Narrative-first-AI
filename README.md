# NarrativeFirst AI - Therapeutic AI Companion

> **Healing through stories, not clinical responses.**

A narrative-first AI companion designed for vulnerable populations (neurodivergent individuals, trauma survivors, anxiety/depression) that uses storytelling and metaphor instead of generic therapeutic responses.

---

## 🎯 **The Problem**

- 85% of therapy chatbots use templated, generic responses
- Average engagement: 2-3 minutes (users feel unheard)
- No personalization beyond basic demographics
- 350K therapist shortage in the US with 76% increase in mental health needs since 2020

## 💡 **Our Solution**

**NarrativeFirst AI** doesn't just validate feelings—it transforms them into meaningful narratives that help users see their experiences differently.

### **Example:**
- **Generic AI:** "I understand you feel invisible."
- **NarrativeFirst:** *Tells story about Japanese kintsugi pottery—how broken pieces become more beautiful when mended with gold.*

---

## ✨ **Key Features**

### **1. Therapeutic Personas**
- **Gentle Guide:** Wise companion who speaks through stories and metaphors
- **Fellow Traveler:** Someone who has walked similar paths and shares the journey
- **Wise-Old Fool:** A witty, sarcastic compainion who's lived long enough to have seen it all
-                     and gives a raw unfiltered perspective of life's challenges through anccedotes
-                     and story (coming soon, for mature users only!)

### **2. Individual Adaptation System**
- Age-appropriate language (child, teen, young adult, adult)
- Communication style matching (casual, formal, auto-detect)
- Interest-based examples (uses what users actually care about)
- Conversation pattern learning (message length, emotional depth, response preferences)

### **3. Crisis-Competent Safety**
- Built-in crisis detection protocols
- Validation-first approach for overwhelming emotions
- Micro-task breakdown for paralysis moments
- Clear boundaries about AI limitations

### **4. Emotional Arc Tracking**
- Conversation memory across sessions
- Theme identification and breakthrough moments
- Mood progression over time
- MongoDB-backed persistence

### **5. Voice-to-Text Journaling**
- "Crystallized narrative" generation from diary entries
- Micro-commitments for actionable next steps
- Speech-to-text integration for accessibility

---

## 🏗️ **Technical Architecture**

### **Backend**
- **Framework:** Express.js with ES6 modules
- **AI:** Anthropic Claude API (Sonnet 3.5)
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** User profiling system with onboarding flow

### **Frontend**
- **Framework:** React with hooks
- **Styling:** Custom gradient UI with accessible design
- **Features:** Real-time chat, voice input, persona selection

### **Key Systems**
- Persona adaptation engine
- Emotional content analysis
- Conversation context management
- Therapeutic prompt engineering

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js v16+
- MongoDB Atlas account
- Anthropic API key

### **Installation**
```bash
# Clone repository
git clone https://github.com/Niero570/Narrative-first-AI.git
cd Narrative-first-AI

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Configure environment
cp .env.example .env
# Edit .env with your credentials:
# - ANTHROPIC_API_KEY
# - MONGODB_URI
# - PORT=3001
```

### **Running Locally**
```bash
# Terminal 1: Start backend
node server.js

# Terminal 2: Start frontend
cd client
npm start
```

Backend runs on `http://localhost:3001`  
Frontend runs on `http://localhost:8080`

---

## 📊 **Market Opportunity**

- **Global Market:** $5.6B (2023) → $26B projected (2030)
- **Growth Rate:** 26.8% CAGR
- **AI Therapy Segment:** 31% annual growth
- **Target Demographics:** 15% of children are neurodivergent, 32% of teens have anxiety disorders

### **Competitive Advantages**
- **Therapeutic-grade narrative intelligence** (vs. generic CBT responses)
- **Vulnerable population focus** (vs. general wellness)
- **Individual adaptation** (vs. one-size-fits-all)
- **Crisis-competent safety** (clinical-grade protocols)

---

## 🎯 **Current Status**

**✅ Completed:**
- Backend API with Claude integration
- MongoDB conversation & user profile schemas
- Two therapeutic personas with adaptive prompting
- Crisis detection & response protocols
- Onboarding system with preference collection
- Voice-to-text diary prototype

**🚧 In Progress:**
- Frontend-backend API integration
- Mobile-first PWA design
- User testing with target demographics

**📋 Roadmap:**
- Clinical validation testing (50 beta users)
- Therapist partnership program
- FDA Breakthrough Device pathway
- iOS/Android app deployment

---

## 🤝 **Contributing**

This project is currently in private beta. If you're interested in:
- **Clinical validation** (licensed therapists)
- **Beta testing** (neurodivergent individuals, parents, mental health advocates)
- **Technical contributions** (React, AI/ML, mental health tech)

Please reach out via [GitHub Issues](https://github.com/Niero570/Narrative-first-AI/issues).

---

## 📄 **License**

[Choose: MIT / Proprietary / TBD]

---

## 🙏 **Acknowledgments**

Built with:
- [Anthropic Claude API](https://www.anthropic.com/) - Therapeutic AI foundation
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Conversation persistence
- [Express.js](https://expressjs.com/) - Backend framework

Inspired by narrative therapy principles.

---

## 📧 **Contact**

**Project Lead:** [Jamel Swanson]  
**Email:** [bushidocoder0@gmail.com]  
**GitHub:** [@Niero570](https://github.com/Niero570)

---

## 💰 **Investment Opportunity**

NarrativeFirst AI is seeking pre-seed funding to complete clinical validation and deploy to app stores. 

**Projected Revenue (Conservative):**
- Year 1: $300K (1,000 users @ $19-39/month)
- Year 2: $1.2M (3,000 users + B2B partnerships)
- Year 3: $3.5M (8,000 users + therapy practice integrations)

**Contact for pitch deck and market analysis.**

---

*"Making emotional support accessible, personalized, and genuinely different."*
```

---


# Anthropic API Configuration
ANTHROPIC_API_KEY=sk-ant-your-key-here
ANTHROPIC_MODEL=claude-3-5-sonnet-20240620

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/narrative-ai

# Server Configuration
PORT=3001
