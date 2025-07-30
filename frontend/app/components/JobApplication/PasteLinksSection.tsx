'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function PasteLinksSection() {
  const [links, setLinks] = useState<string[]>(['']);

  const updateLink = (index: number, value: string) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  const addLink = () => {
    setLinks([...links, '']);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 bg-white text-black p-6 rounded-lg">
      <h3 className="text-md font-semibold">Paste Links (Optional)</h3>
      {links.map((link, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            value={link}
            onChange={(e) => updateLink(idx, e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
            placeholder="Paste your link here..."
          />
          <button type="button" onClick={() => removeLink(idx)} className="text-red-500 hover:text-red-700">
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addLink}
        className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
      >
        <Plus size={14} /> Add Link
      </button>
    </div>
  );
}
