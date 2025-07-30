'use client';

import React from 'react';

interface Props {
  tab: 'resume' | 'portfolio' | 'saved';
}

const questionsMap: Record<string, string[]> = {
  resume: [
    'What experience do you have with e-commerce websites?',
    'How many years of experience do you have in e-commerce design?',
    'What is your availability to start?',
  ],
  portfolio: [
    'A clear, concise title that describes your service (max 70 characters)',
    'Why are you interested in this role?',
    'Do you have experience in designing E-commerce platforms?',
    'What is your availability to start?',
  ],
  saved: [
    'Explain what you offer, your process, and why clients should choose you (min 120 characters)',
  ],
};

export default function ScreeningQuestions({ tab }: Props) {
  const questions = questionsMap[tab] || [];

  return (
    <div className="space-y-6">
      <h3 className="text-md font-semibold text-white">Screening Questions</h3>
      {questions.map((q, idx) => (
        <div key={idx}>
          <p className="mb-1 text-sm text-white">{q}</p>
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
