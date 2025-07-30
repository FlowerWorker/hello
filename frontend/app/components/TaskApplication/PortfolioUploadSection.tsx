'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

export default function PortfolioUploadSection() {
  const [useSavedDocument, setUseSavedDocument] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const savedDocuments = [
    'SavedDocument1.pdf',
    'ProjectPortfolio.docx',
    'DesignMockup.png',
  ];

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Saved document handlers
  const toggleDoc = (doc: string) => {
    setSelectedDocs(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4 bg-white text-black rounded-lg p-6">
      <h3 className="text-lg font-semibold text-black">Portfolio or Relevant Work (Optional)</h3>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setUseSavedDocument(false)}
          className={`rounded-full px-4 py-1 text-sm border ${
            !useSavedDocument ? 'border-purple-500 text-purple-500' : 'border-gray-400 text-black'
          }`}
        >
          Upload Files
        </button>
        <button
          type="button"
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
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-dashed border-2 border-gray-400 rounded-lg p-8 text-center mt-4 cursor-pointer"
            onClick={handleBrowseClick}
          >
            <UploadCloud className="mx-auto mb-2 text-purple-600" size={32} />
            <p>
              Drag & drop files or{' '}
              <span className="text-blue-600 underline cursor-pointer">Browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </div>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFiles.length > 0 && (
            <div className="text-sm mt-2">
              📄 Selected:
              <ul className="list-disc list-inside">
                {selectedFiles.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            className="bg-purple-600 text-white rounded-full px-6 py-2 mt-4 hover:bg-purple-700"
          >
            Upload Your Files
          </button>
        </div>
      ) : (
        <div className="relative mt-4" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-left text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {selectedDocs.length === 0
              ? 'Select saved documents'
              : `${selectedDocs.length} document${selectedDocs.length > 1 ? 's' : ''} selected`}
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto border border-gray-300 rounded-md bg-white shadow-lg">
              {savedDocuments.map(doc => (
                <label
                  key={doc}
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-100"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedDocs.includes(doc)}
                    onChange={() => toggleDoc(doc)}
                  />
                  {doc}
                </label>
              ))}
            </div>
          )}

          {selectedDocs.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedDocs.join(', ')}
            </p>
          )}

          <p className="text-xs text-gray-400 mt-1">
            Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT (Max 10MB)
          </p>
        </div>
      )}
    </div>
  );
}
