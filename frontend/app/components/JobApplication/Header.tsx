'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Header() {
  return (
    <div className="space-y-2">
      <button className="flex items-center text-white hover:underline">
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>
      <h1 className="text-2xl font-semibold">Apply: Website Redesign for E-commerce Platform</h1>
      <h2 className="text-lg font-light">Submit Your Proposal</h2>
    </div>
  );
}
