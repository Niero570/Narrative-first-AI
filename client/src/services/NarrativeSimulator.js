// NarrativeSimulator.js - Now handles communication with the Express API endpoint (/api/crystallize)
class NarrativeSimulator {
  // This is the core method that communicates with your Express server
  static async generateNarrativeAndCommitment(userEntry) {
      
      // 1. Send the user's transcript to the backend API
      const response = await fetch('/api/crystallize', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // NOTE: We will need a way to pass the user ID from the onboarding later
              // 'X-User-ID': 'temp-onboarding-user-123' 
          },
          body: JSON.stringify({ 
              text: userEntry,
              // Include other context if needed, e.g., user profile, session ID
          }),
      });

      if (!response.ok) {
          throw new Error(`API Error: ${response.status} - Could not generate narrative.`);
      }

      const data = await response.json();
      
      // 2. The backend is expected to return the final narrative in the 'narrative' field
      const apiNarrative = data.narrative || "The core narrative could not be identified.";

      // 3. Temporarily use a client-side helper to generate the commitment question
      // In the final version, the AI will generate this, and we will update the backend.
      const microCommitment = data.microCommitment || "What is one thing you can do now?";

      return {
          crystallizedNarrative: apiNarrative,
          microCommitment: microCommitment
      };
  }

  
 
}

export default NarrativeSimulator;