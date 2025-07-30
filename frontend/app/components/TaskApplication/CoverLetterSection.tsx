'use client';

import React, { useState } from 'react';

export default function CoverLetterSection() {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!coverLetter.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/improve-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: coverLetter,
          tone: 'professional',
          task: 'Fix grammar and improve clarity',
        }),
      });

      const data = await res.json();
      setCoverLetter(data.improvedText || coverLetter);
    } catch (err) {
      console.error('AI improvement failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Tell the client why you are the best fit for this project</h3>
      <label className="block space-y-2">
        <p className="text-sm font-medium">Cover Letter</p>
        <textarea
          className="w-full p-3 text-black rounded-lg resize-none"
          rows={5}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Introduce yourself and explain why you’re the right person for this job..."
        />
      </label>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Explain what you offer, your process, and why clients should choose you (min 120 characters)
        </p>

        <button
          type="button"
          onClick={handleImprove}
          disabled={loading || coverLetter.length < 20}
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Improving...' : 'Fix Grammar with AI'}
        </button>
      </div>
    </div>
  );
}
