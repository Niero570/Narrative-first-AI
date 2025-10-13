import React from 'react';
import Typewriter from 'typewriter-effect';

const CrystallizedNarrative = ({ text }) => {
  return (
    <div className="narrative-content">
      <Typewriter
        options={{
          strings: [text],
          autoStart: true,
          loop: false,
          delay: 50, // Speed of typing
          deleteSpeed: 0,
        }}
      />
    </div>
  );
};

export default CrystallizedNarrative;