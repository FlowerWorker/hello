'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  activeTab: 'resume' | 'portfolio' | 'saved';
  setActiveTab: (tab: 'resume' | 'portfolio' | 'saved') => void;
}

export default function PortfolioUploadSection({ activeTab, setActiveTab }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const savedDocuments = ['Resume.pdf', 'Portfolio.docx', 'CoverLetter.txt'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadedFiles(Array.from(e.dataTransfer.files));
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 bg-white text-black rounded-lg p-6">
      <h3 className="text-lg font-semibold text-black">Resume and Supporting Documents</h3>

      {/* Tab Buttons */}
      <div className="flex gap-3">
        {(['resume', 'portfolio', 'saved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
            className={`rounded-full px-4 py-1 text-sm border ${
              activeTab === tab ? 'border-purple-500 text-purple-500' : 'border-gray-400 text-black'
            }`}
          >
            {tab === 'resume'
              ? 'Upload Resume'
              : tab === 'portfolio'
              ? 'Upload Portfolio or Supporting Files'
              : 'Use Saved Document'}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      {activeTab !== 'saved' ? (
        <div>
          {/* Hidden File Input */}
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-dashed border-2 border-gray-400 rounded-lg p-8 text-center mt-4"
          >
            <UploadCloud className="mx-auto mb-2 text-purple-600" size={32} />
            <p>
              Drag & drop files or{' '}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={handleBrowseClick}
              >
                Browse
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </div>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-black">
              {uploadedFiles.map((file, idx) => (
                <li key={idx}>📎 {file.name}</li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="bg-purple-600 text-white rounded-full px-6 py-2 mt-4 hover:bg-purple-700"
            onClick={() => alert('Uploading not implemented yet.')}
          >
            Upload Your Files
          </button>
        </div>
      ) : (
        // Saved Documents Dropdown
        <div className="space-y-2 mt-4">
          <label htmlFor="savedDocument" className="text-sm font-medium text-white">
            Select a saved document
          </label>
          <select
            id="savedDocument"
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
            className="w-full border border-gray-300 text-sm text-black rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select a saved document</option>
            {savedDocuments.map((doc, index) => (
              <option key={index} value={doc}>
                {doc}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT (Max 10MB)
          </p>
        </div>
      )}
    </div>
  );
}
