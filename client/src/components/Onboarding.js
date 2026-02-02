import API_URL from '../config';
import React, { useState, useEffect } from 'react';

const Onboarding = ({ onComplete }) => {
  const [questions, setQuestions] = useState({});
  const [currentStep, setCurrentStep] = useState('step1');
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the useEffect hook to fetch questions from the backend when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/onboarding-questions`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = (questionId, answer) => {
    const nextStepKey = `step${parseInt(questionId.slice(4)) + 1}`;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (questions[nextStepKey]) {
      setCurrentStep(nextStepKey);
    } else {
      // Last step, submit all answers
      handleSubmit(answers);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    // A temporary/mock User ID is needed for the database structure you set up.
    // In a real app, this would come from user authentication.
    const mockUserId = 'temp-onboarding-user-123'; 
    let step = 1;
    
    try {
      // Loop through the collected answers and send them to the backend API one-by-one
      for (const questionKey in finalAnswers) {
        // The answer value from the front-end state
        const responseValue = finalAnswers[questionKey];
        
        const response = await fetch(`${API_URL}/api/onboarding-questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: mockUserId,
            step: step, 
            response: responseValue 
          }),
        });

        const data = await response.json();
        if (!response.ok || data.error) {
            // Throw an error if the API submission failed
            throw new Error(data.error || `Submission failed at step ${step}`);
        }
        
        // Increment the step for the next iteration
        step++;
      }
      
      // If all steps submitted successfully, call onComplete to switch the UI
      console.log('Onboarding complete and profile saved to database.');
      // This is the function that switches the App component from Onboarding to MainUI
      onComplete();

    } catch (err) {
      console.error('Onboarding Submission Error:', err.message);
      alert('Could not complete onboarding. Please check the server console.');
    }
  };

  
  const renderQuestion = (questionKey) => {
    const questionData = questions[questionKey];
    if (!questionData) return null;

    switch (questionData.type) {
      case 'single-choice':
        return (
          <div key={questionKey}>
            <p>{questionData.question}</p>
            {questionData.options.map((option) => (
              <button key={option.value} onClick={() => handleNext(questionKey, option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        );
      case 'text-input':
        return (
          <div key={questionKey}>
            <p>{questionData.question}</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const textAnswer = e.target.elements[0].value;
              handleNext(questionKey, textAnswer);
            }}>
              <input type="text" placeholder={questionData.placeholder} required={!questionData.optional} />
              <button type="submit">Next</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className="onboarding-container">Loading questions...</div>;
  }
  if (error) {
    return <div className="onboarding-container">Error loading questions: {error}</div>;
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h2>Welcome to Your Talking Diary</h2>
        <p>Before we begin, a little about you so I can be a better listener.</p>
        {renderQuestion(currentStep)}
      </div>
    </div>
  );
};

export default Onboarding;