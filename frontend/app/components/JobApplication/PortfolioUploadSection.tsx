'use client';

import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function PortfolioUploadSection() {
  const [useSavedDocument, setUseSavedDocument] = useState(false);

  return (
    <div className="space-y-4 bg-white text-black rounded-lg p-6">
      <h3 className="text-lg font-semibold text-black">Resume and Supporting Documents</h3>
      <div className="flex gap-3">
        <button
          onClick={() => setUseSavedDocument(false)}
          className={`rounded-full px-4 py-1 text-sm border ${
            !useSavedDocument ? 'border-purple-500 text-purple-500' : 'border-gray-400 text-black'
          }`}
        >
          Upload Resume
        </button>
        
        <button
          onClick={() => setUseSavedDocument(false)}
          className={`rounded-full px-4 py-1 text-sm border ${
            !useSavedDocument ? 'border-purple-500 text-purple-500' : 'border-gray-400 text-black'
          }`}
        >
          Upload Portfolio or Supporting Files
        </button>

        <button
          onClick={() => setUseSavedDocument(true)}
          className={`rounded-full px-4 py-1 text-sm border ${
            useSavedDocument ? 'border-purple-500 text-purple-500' : 'border-gray-400 text-black'
          }`}
        >
          Use Saved Document
        </button>
      </div>

      {!useSavedDocument ? (
        <div>
          <div className="border-dashed border-2 border-gray-400 rounded-lg p-8 text-center mt-4">
            <UploadCloud className="mx-auto mb-2 text-purple-600" size={32} />
            <p>
              Drag & drop files or{' '}
              <span className="text-blue-600 underline cursor-pointer">Browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </div>

          <button className="bg-purple-600 text-white rounded-full px-6 py-2 mt-4 hover:bg-purple-700">
            Upload Your Files
          </button>
        </div>
      ) : (
        <div className="mt-4 border p-6 rounded-lg bg-gray-50 text-center">
          {/* Placeholder for saved documents UI */}
          <p className="text-gray-700 mb-2">Select one of your saved documents:</p>
          {/* Replace below with your actual saved docs list/component */}
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-sm">
            <li>SavedDocument1.pdf</li>
            <li>ProjectPortfolio.docx</li>
            <li>DesignMockup.png</li>
          </ul>
          <button className="bg-purple-600 text-white rounded-full px-6 py-2 mt-4 hover:bg-purple-700">
            Use Selected Document
          </button>
        </div>
      )}
    </div>
  );
}
