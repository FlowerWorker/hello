'use client';

import React from 'react';

const questions = [
  "What experience do you have with e-commerce websites?",
  "Have you worked with responsive design for mobile devices?",
  "Can you provide examples of your previous work in UI/UX design?",
];

export default function ScreeningQuestions() {
  return (
    <div className="space-y-6">
      <h3 className="text-md font-semibold">Screening Questions</h3>
      {questions.map((q, idx) => (
        <div key={idx}>
          <p className="mb-1 text-sm">{q}</p>
          <textarea
            className="w-full p-3 text-black rounded-lg resize-none"
            rows={3}
            placeholder="Your answer..."
          />
        </div>
      ))}
    </div>
  );
}
