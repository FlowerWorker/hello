'use client';

import React from 'react';

export default function CoverLetterSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Tell the client why you are the best fit for this project</h3>
      <label className="block space-y-2">
        <p className="text-sm font-medium">Cover Letter</p>
        <textarea
          className="w-full p-3 text-black rounded-lg resize-none"
          rows={5}
          placeholder="Introduce yourself and explain why you’re the right person for this job..."
        />
      </label>
      <p className="text-xs text-gray-400">
        Explain what you offer, your process, and why clients should choose you (min 120 characters)
      </p>
    </div>
  );
}
